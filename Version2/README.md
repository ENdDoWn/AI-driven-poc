# Website Operating Platform

Initial project structure for the Website-as-a-Service platform described in `doc/`.

## Structure

- `frontend/` — Next.js application
- `backend/` — Node.js API application
- `doc/` — logical design and analysis documents

The application modules and business logic are intentionally not implemented yet.

## Run locally

Install dependencies from the repository root:

```bash
npm install
```

Start the frontend from the repository root:

```bash
npm run dev
```

Start the backend in a second terminal when needed:

```bash
npm run dev:backend
```

The frontend dev server uses `frontend/.next-dev`, while production builds use `frontend/.next-build` so the two modes do not overwrite each other.
If an old dev server reports a missing module or manifest, stop it and restart with a clean cache:

```bash
rm -rf frontend/.next
npm run dev
```
