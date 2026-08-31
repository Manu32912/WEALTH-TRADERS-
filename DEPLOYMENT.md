# Wealth Traders deployment

## GitHub Pages frontend
Upload the HTML files, `style.css`, `script.js` and `cwt-logo.jpg` to the repository root. GitHub Pages serves only the frontend.

## Backend
GitHub Pages cannot run Node.js or PostgreSQL. Deploy the `backend` folder to a Node.js host and create a PostgreSQL database. Run `schema.sql`, then set `DATABASE_URL`, `SESSION_SECRET`, `FRONTEND_ORIGIN` and `PORT`.

After deployment, set the HTTPS backend URL in `script.js` as `const API_BASE = "https://YOUR-BACKEND-DOMAIN";`.

## Registration
Phone numbers are international. The form accepts a country code such as +254, +44 or +1; it does not restrict users to the UK.

## Market ticker
The home page requests current BTC/USDT, ETH/USDT, BNB/USDT and SOL/USDT prices from Binance's public market endpoint and refreshes every 15 seconds. If the API is unavailable, the ticker reports that the market is unavailable.

## Payments
Investment and VIP selections route to the common payment page. The payment page displays the configured BEP-20 and TRC-20 addresses. A transfer is not automatically treated as verified or paid.
