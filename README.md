# Features
 * Core Features
 * Login Page (Mocked authentication with token-based access)

# Dashboard
* Server-side rendered using getServerSideProps
* Paginated listing table (with ID, title, description, status)
* Actions: Approve, Reject, Edit

# Edit Listing
* Modal form with pre-filled data
* Submits updated info via PUT API

# Auth & Routing
* Token stored in localStorage
* Dashboard is protected — auto-redirect to /login if not authenticated

# Backend (Simulated)
* Next.js API routes (pages/api/)
* Listings stored in in-memory or SQLite
* Actions update listing status with response

