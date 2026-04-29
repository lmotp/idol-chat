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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const queryFromSearchParams = url.searchParams.get('query') ?? '';
  const queryFromBody = queryFromSearchParams.trim()
    ? ''
    : req.method === 'POST'
      ? (((await req.json()) as { query?: string }).query ?? '')
      : '';
  const query = queryFromSearchParams || queryFromBody;

  if (!query.trim()) {
    return jsonResponse([]);
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=10&q=${encodeURIComponent(query)}`,
    {
      headers: {
        'User-Agent': 'idol-chat-address-search',
        Accept: 'application/json',
      },
    },
  );

  const raw = (await response.json()) as unknown;
  const normalized = Array.isArray(raw)
    ? raw.map((item) => {
        const addressItem = item as NominatimSearchItem;

        return {
          id: String(addressItem.place_id ?? ''),
          label: addressItem.display_name ?? '',
          roadAddress: addressItem.address?.road ?? undefined,
          jibunAddress: addressItem.address?.suburb ?? addressItem.address?.city_district ?? undefined,
          latitude:
            typeof addressItem.lat === 'string' || typeof addressItem.lat === 'number'
              ? Number(addressItem.lat)
              : undefined,
          longitude:
            typeof addressItem.lon === 'string' || typeof addressItem.lon === 'number'
              ? Number(addressItem.lon)
              : undefined,
        };
      })
    : [];

  return jsonResponse(normalized);
});
