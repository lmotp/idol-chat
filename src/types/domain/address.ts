export interface AddressSuggestion {
  id: string;
  label: string;
  roadAddress?: string;
  jibunAddress?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressApi {
  search(query: string): Promise<AddressSuggestion[]>;
  reverse(latitude: number, longitude: number): Promise<string | null>;
}
