import { corsHeaders } from '../_shared/cors.ts';

type NominatimReverseResponse = {
  display_name?: string;
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

  let latitude: number | undefined;
  let longitude: number | undefined;

  try {
    const body = (await req.json()) as {
      latitude?: number;
      longitude?: number;
    } | null;

    latitude = body?.latitude;
    longitude = body?.longitude;
  } catch {
    return jsonResponse({ address: null }, { status: 400 });
  }

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return jsonResponse({ address: null }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          'User-Agent': 'idol-chat-address-search',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      return jsonResponse({ address: null }, { status: 502 });
    }

    const raw = (await response.json()) as NominatimReverseResponse;
    const address = raw?.display_name ?? null;

    return jsonResponse({ address });
  } catch {
    return jsonResponse({ address: null }, { status: 502 });
  }
});
