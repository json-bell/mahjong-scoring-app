# Hosting

Hosted through Netlify with integrated CI/CD [here](https://mahjong-scoring.netlify.app/) - current status: [![Netlify Status](https://api.netlify.com/api/v1/badges/2af1895a-5e23-4f92-8fe5-5b6ef74cd9d4/deploy-status)](https://app.netlify.com/projects/mahjong-scoring/deploys)

The back-end Python API can be found at https://github.com/json-bell/mahjong-api

# Mahjong Tile SVGs

Sourced from https://commons.wikimedia.org/w/index.php?title=Category:SVG_Oblique_illustrations_of_Mahjong_tiles

# Spinning up locally:

`yarn dev` here

Then either:

- Option 1: spin up local API from the [back-end repo](https://github.com/json-bell/mahjong-api) (with `VITE_API_URL=http://localhost:8000`)
- Option 2: Modify .env.development to contain the production endpoint with `echo "VITE_API_URL=https://mahjong-api.onrender.com" > .env.development`

## Technologies used

- **Frontend:** React (v19) with TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS Modules
- **API:** Axios + OpenAPI-generated types (@hey-api/openapi-ts)
- **Quality & Automation:** ESLint, Husky, lint-staged
- **Deployment:** Netlify (hosting & CI/CD)
