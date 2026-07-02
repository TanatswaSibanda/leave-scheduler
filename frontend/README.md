# Leave Scheduler App

# Overview

This is a simple internal HR tool that allows a manager to view and manage team leave requests. The system supports submitting leave requests, approving or rejecting them and enforcing business rules such as team capacity limits and overlapping leave prevention.



## Tech Stack

* Backend: Node.js + Express
* Database: SQLite
* Frontend: React (Vite)
* API Communication: REST



## Features

* View all employees
* Submit leave requests
* View pending/approved/rejected leave requests
* Approve or reject leave requests (manager action)
* Business rules enforced:

  * No overlapping approved leave for the same employee
  * No more than 30% of a team can be on leave at the same time



# Project Structure


backend/
  database/
  server.js
  setupDatabase.js

frontend/
  src/
    App.jsx




## How to Run the Project

# 1. Backend


cd backend
npm install
node server.js


Backend runs on:


http://localhost:2000


# 2. Frontend


cd frontend
npm install
npm run dev


Frontend runs on:


http://localhost:5173


# API Endpoints

*Employees*


GET /employees


*Leave Requests*


GET /leave-requests
POST /leave-requests
PATCH /leave-requests/:id/approve
PATCH /leave-requests/:id/reject


# Business Rules

* Only one approved leave per employee can overlap in the same period
* No more than 30% of a team may be on leave at the same time (rounded down)
* Pending requests do not affect constraints until approved


## Notes

* Public holidays are stored in the database but do not affect leave approval logic in this implementation.
* Weekends are not treated as working days in rule evaluation.
* The project prioritises functionality over UI design.

# Author

Built as part of a technical assessment for a Team Leave Scheduler system.
