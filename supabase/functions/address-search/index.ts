import { corsHeaders } from '../_shared/cors.ts';

type NominatimSearchItem = {
  place_id?: number | string;
  display_name?: string;
  lat?: string | number;
  lon?: string | number;
  address?: {
    road?: string;
    suburb?: string;
    city_district?: string;
  };
};

const jsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...corsHeaders,
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

const readQuery = async (req: Request) => {
  const url = new URL(req.url);
  const queryFromSearchParams = url.searchParams.get('query') ?? '';

  if (queryFromSearchParams.trim()) {
    return queryFromSearchParams;
  }

  if (req.method !== 'POST') {
    return '';
  }

  try {
    const body = (await req.json()) as { query?: string } | null;
    return body?.query ?? '';
  } catch {
    return '';
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const query = await readQuery(req);

  if (!query.trim()) {
    return jsonResponse([]);
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=10&q=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent': 'idol-chat-address-search',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      return jsonResponse({ message: 'Failed to fetch address search results.' }, { status: 502 });
    }

    const raw = (await response.json()) as unknown;
    const normalized = Array.isArray(raw)
      ? raw.flatMap((item) => {
          const addressItem = item as NominatimSearchItem;
          const id = addressItem.place_id;
          const latitude =
            typeof addressItem.lat === 'string' || typeof addressItem.lat === 'number'
              ? Number(addressItem.lat)
              : undefined;
          const longitude =
            typeof addressItem.lon === 'string' || typeof addressItem.lon === 'number'
              ? Number(addressItem.lon)
              : undefined;

          if (!id || !addressItem.display_name || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return [];
          }

          return [
            {
              id: String(id),
              label: addressItem.display_name,
              roadAddress: addressItem.address?.road ?? undefined,
              jibunAddress: addressItem.address?.suburb ?? addressItem.address?.city_district ?? undefined,
              latitude,
              longitude,
            },
          ];
        })
      : [];

    return jsonResponse(normalized);
  } catch {
    return jsonResponse({ message: 'Failed to fetch address search results.' }, { status: 502 });
  }
});
