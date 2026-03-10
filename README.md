\# Car Booking Platform (Uber-style MVP)



This is an internship project for a car booking platform similar to Uber.



\## Tech Stack



\### Frontend

\- Next.js

\- Tailwind CSS



\### Backend

\- NestJS

\- Prisma ORM

\- PostgreSQL

\- JWT Authentication



\## Features Implemented



\- User signup

\- User login

\- Password hashing with bcrypt

\- JWT authentication

\- Protected route: `/auth/me`

\- Rider can request a ride

\- Rider can view own rides

\- Driver can view rides

\- Driver can accept a ride

\- Driver can start a ride

\- Driver can complete a ride

\- Ride cancellation rules implemented



\## API Endpoints



\### Auth

\- `POST /auth/signup`

\- `POST /auth/login`

\- `GET /auth/me`



\### Rides

\- `POST /rides/request`

\- `GET /rides/my-rides`

\- `PATCH /rides/:id/accept`

\- `PATCH /rides/:id/start`

\- `PATCH /rides/:id/complete`

\- `PATCH /rides/:id/cancel`



\## Test Accounts



\### Rider

\- Email: ali@example.com

\- Password: 123456



\### Driver

\- Email: driver@example.com

\- Password: 123456



\## How to Run



\### Backend

```bash

cd backendnest

npm install

npm run start:dev

