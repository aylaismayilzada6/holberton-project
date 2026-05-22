# SkillShare Platform

A skill-sharing platform where people connect, learn, and teach skills through scheduled sessions. Built with a Spring Boot backend and Next.js frontend.

## Features

- **Authentication** – JWT-based login with BCrypt-hashed passwords
- **User Profiles** – Skills you offer and skills you want to learn, plus bio and location
- **Session Scheduling** – Book in-person or virtual sessions with flexible duration
- **Virtual Meetings** – Attach any meeting link (Zoom, Jitsi, etc.) to virtual sessions
- **Rating & Reviews** – Rate sessions and leave feedback for other users
- **Messaging** – Direct messages between users
- **Responsive UI** – Mobile-friendly interface built with Tailwind CSS

## Tech Stack

### Backend
- **Spring Boot** – REST API framework
- **Spring Security + JWT (JJWT)** – Token-based auth
- **H2** – In-memory database for development
- **Lombok** – Boilerplate reduction
- **Maven** – Build tool

### Frontend
- **Next.js** – React framework with App Router
- **TypeScript** – Type-safe JavaScript
- **Tailwind CSS** – Utility-first styling
- **Radix UI** – Accessible component primitives
- **date-fns** – Date utilities

## Quick Start

### Prerequisites
- Java 8+ (the `pom.xml` targets Java 8; newer JDKs work too)
- Node.js 18+
- Maven 3.8+
- pnpm or npm

### Backend

From the project root:

```bash
./run-backend.sh
```

Or run Maven directly:

```bash
mvn spring-boot:run
```

The API will start on `http://localhost:8080`.

- H2 console: `http://localhost:8080/h2-console`
- Database is in-memory by default (resets on restart)

### Frontend

```bash
./run-frontend.sh
```

Or:

```bash
pnpm install
pnpm dev
```

The frontend runs on `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Log in
- `GET /api/auth/check-username` – Check if a username is available

### Users
- `GET /api/users` – List all users
- `GET /api/users/{id}` – Get a user by ID
- `PUT /api/users/{id}` – Update a user profile

### Sessions
- `POST /api/sessions` – Create a session
- `GET /api/sessions` – List all sessions
- `GET /api/sessions/{id}` – Get a session
- `PUT /api/sessions/{id}/status` – Update session status

### Session Requests
- `POST /api/session-requests` – Create a session request
- `POST /api/session-requests/{id}/approve` – Approve a request
- `POST /api/session-requests/{id}/reject` – Reject a request
- `POST /api/session-requests/{id}/cancel` – Cancel a request

### Skills
- `GET /api/skills` – List skills
- `POST /api/skills` – Create a skill

## Project Structure

```
skill-sharing-platform/
├── src/main/java/com/skillsharing/     # Spring Boot backend
│   ├── config/                         # Configuration classes
│   ├── controller/                     # REST controllers
│   ├── dto/                            # Request/response DTOs
│   ├── model/                          # Domain models
│   ├── repository/                     # In-memory repositories
│   ├── security/                       # JWT + Spring Security
│   └── service/                        # Business logic
├── src/main/resources/                 # application.properties
├── app/                                # Next.js frontend
│   ├── auth/                           # Login & register pages
│   ├── dashboard/                      # Dashboard pages
│   └── landing/                        # Landing page
└── components/                         # Reusable React components
```

## Building for Production

```bash
# Backend (creates target/skill-sharing-platform-1.0.0.jar)
mvn clean package

# Frontend
pnpm build
```

Run the backend jar:

```bash
java -jar target/skill-sharing-platform-1.0.0.jar
```

Run the frontend in production mode:

```bash
pnpm start
```

## Troubleshooting

**Port 8080 already in use**

```bash
lsof -ti:8080 | xargs kill -9
```

Or change the port in `src/main/resources/application.properties`:

```properties
server.port=8081
```

**`Permission denied` running the helper scripts**

```bash
chmod +x run-backend.sh run-frontend.sh
```

## License

MIT
