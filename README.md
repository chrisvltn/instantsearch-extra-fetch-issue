# Instant search extra fetch issue reproduction

## Setup

```bash
pnpm install
```
## Issue reproduction

Run `pnpm dev` and go to your localhost `http://localhost:3000`

Open the browser's devtools and refresh the page.

Expected: No request to Algolia

Actual behavior: A request to Algolia is done, even though it was already server-side rendered

----------

Then, run `pnpm build && pnpm start` and go to your localhost `http://localhost:3000`

Here, no request to Algolia will be done on client-side.
