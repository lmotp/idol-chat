# Custom Address Search Design

**Goal:** Remove the Kakao map/local API dependency from address entry flows while keeping the "current location" button and preserving the existing signup/class creation UX.

**Scope:** Replace the current Kakao-powered location modal with a custom address search modal, keep geolocation-based "current location" behavior, and remove all Kakao REST API configuration, secrets, and workflow usage from the app.

**Architecture:** Introduce a small address-search UI layer that is fully owned by this repo. The UI will render its own input, result list, and selection state. A separate location helper will keep the current-location button behavior isolated from the address search UI. The address data source should be swappable through a small provider abstraction so the UI does not depend on one vendor.

**Tech Stack:** React 18, TypeScript, Vite, Zustand, Emotion, GitHub Pages, browser Geolocation API.

---

## Design

### 1. Address search modal

Create a new address search modal component that is responsible for:
- rendering a text input
- submitting search terms
- showing a list of matching addresses
- letting the user select one address
- clearing results on cancel/close

The modal should keep the app's existing visual language, but the layout and interaction should be custom, not a third-party popup UI.

### 2. Current location flow

Keep the current location button on signup and class creation screens.

When the user clicks the button:
- request browser geolocation permission
- read latitude/longitude
- resolve those coordinates into a human-readable address
- fill the address input with the resolved value

The geocoding implementation should live behind a small provider/helper so the UI can remain unchanged if the underlying address service changes later.

### 3. Shared entry points

Update both flows to use the same address layer:
- `SignUp`
- `MakeClass`
- any shared location modal entry point

The goal is for both screens to use the same modal and current-location helper, rather than carrying their own Kakao-specific logic.

---

## Data Flow

1. User opens the address modal from signup or class creation.
2. The modal accepts a search term and asks the provider for matching addresses.
3. The modal renders matching addresses in a scrollable list.
4. The user selects an address and it is written back to the parent form.
5. If the user clicks the current location button, geolocation resolves an address and writes it back to the same field.

---

## Error Handling

- If geolocation is denied, unavailable, or times out, keep the form usable and surface a user-facing message.
- If address search fails, show an empty/error state and keep the modal open.
- If selection fails or the provider returns no results, do not clear the current value unless the user explicitly cancels or selects another item.

---

## Configuration Cleanup

Remove the old Kakao-related client config and deployment wiring once the new address flow is in place:
- `VITE_KAKAO_REST_API`
- any remaining Kakao env references
- GitHub Pages secret injection for the Kakao key

If the new address provider needs its own config later, keep it in a dedicated env key and document it separately.

---

## Testing

Verify the following manually in the browser:
- signup page opens the custom address modal
- class creation page opens the same modal
- address search returns selectable results
- selected address fills the parent input
- current location button still fills the parent input
- cancelled modal does not change the current value

Also verify:
- `npx tsc --noEmit --pretty false`
- `npm run build`

