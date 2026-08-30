# Wealth Traders backend

GitHub Pages can host the HTML/CSS/JS frontend, but it cannot run Node/Express or PostgreSQL. Deploy this `backend` directory to a server host that supports Node.js and PostgreSQL.

## Required environment variables
- `DATABASE_URL`
- `JWT_SECRET`
- `FRONTEND_ORIGIN`
- `NODE_ENV=production`

## Database
The server creates `users`, `investments`, and `vip_memberships` tables on startup.

Passwords are hashed with bcrypt and are never stored as plaintext. Use HTTPS in production.

## Frontend
After deployment, set the frontend `API_BASE` in `script.js` to the HTTPS URL of this backend.

For cross-site cookies, the backend uses an HttpOnly cookie and `SameSite=None` in production; your backend and frontend must both use HTTPS.
