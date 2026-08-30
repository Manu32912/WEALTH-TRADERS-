# Deployment

## Frontend (GitHub Pages)
Upload the HTML files, `style.css`, `script.js`, and `cwt-logo.jpg` to the repository root. Keep GitHub Pages enabled.

## Backend authentication/database
GitHub Pages cannot run the server-side authentication API or PostgreSQL database. Deploy the `backend` folder to a Node.js host and attach a PostgreSQL database.

After deployment, edit `script.js`:
`const API_BASE = "https://YOUR-BACKEND-DOMAIN.example.com";`

Then commit the updated script.js to GitHub.

## Payment
The payment page routes investment and VIP selections to one common page and identifies TRC20/BEP20. It intentionally does not auto-mark a payment as verified. An administrator should independently verify transfers before changing VIP status.
