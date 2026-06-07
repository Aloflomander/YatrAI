# YatrAI — AI-Powered Travel Planner for India

> **YatrAI** is an intelligent travel planning platform built for Indian travelers. It uses Claude AI to generate detailed, budget-aware itineraries with IRCTC train routes, local accommodation, and INR pricing.

## Tech Stack

- **Frontend**: Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **Backend**: FastAPI + Uvicorn (Python 3.11)
- **AI Engine**: Claude Sonnet (Anthropic API)
- **Database**: PostgreSQL-ready (in-memory mock for now)
- **Deployment**: Docker Compose

## Quick Start

```bash
git clone https://github.com/your-username/yatrai.git
cd yatrai
cp backend/.env.example backend/.env
# Add your ANTHROPIC_API_KEY to backend/.env
docker compose up
```

Open [http://localhost:3000](http://localhost:3000)

### Local Development (without Docker)

```bash
# Terminal 1 — Frontend
npm install
npm run dev

# Terminal 2 — Backend
cd backend
pip install -r requirements.txt
cd ..
uvicorn backend.main:app --reload --port 8000
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | From [console.anthropic.com](https://console.anthropic.com) |
| `DATABASE_URL` | No | PostgreSQL connection string (future use) |
| `REDIS_URL` | No | Redis for Celery task queue (future use) |

> **Note**: If `ANTHROPIC_API_KEY` is not set, the app falls back to realistic mock itineraries — perfect for development and demos.

## Features

- 🤖 **AI Itinerary Generation** — Claude Sonnet crafts detailed day-by-day plans
- 🇮🇳 **India-Specific** — IRCTC trains, OYO/Zostel, dharamshalas, realistic INR pricing
- 🧭 **3-Step Trip Wizard** — Destination → Group → Budget & Style
- 🗺️ **Explore Destinations** — 12 curated destinations with category/type filters
- 📱 **Responsive Design** — Works beautifully on mobile, tablet, and desktop
- 🐳 **Docker Ready** — One command to spin up the entire stack

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/itinerary/generate` | Generate AI itinerary |
| `GET` | `/api/destinations` | List destinations (supports `?category=` and `?type=` filters) |
| `GET` | `/health` | Health check |

## Project Structure

```
yatrai/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── explore/            # Explore destinations
│   ├── plan/               # 3-step trip wizard
│   └── itinerary/result/   # AI-generated itinerary display
├── components/ui/          # Shared UI components (Navbar, Footer, WhatsAppFAB)
├── backend/                # FastAPI backend
│   ├── main.py             # App entry + CORS config
│   ├── routers/            # API route handlers
│   ├── services/           # Business logic (Claude AI, destinations)
│   └── models/             # Pydantic request/response schemas
├── docker-compose.yml
└── README.md
```

## License

MIT
