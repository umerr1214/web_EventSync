## EventSync: Event Ticketing/Registration Management System

## About
EventSync is a centralized web-based event management and ticketing system designed for universities. It allows societies to create, manage, and promote events while enabling students to browse, register, and purchase tickets in one place. The platform streamlines event visibility, simplifies ticket management with real-time availability, and provides role-based access for students, organizers, and admins.

# Frontend Project Structure

This document outlines the file structure for the frontend application and how to run this project.

## Setup Instructions

1. Install dependencies:
npm install

2. Run the app:
npm run dev

## Tech Stack
- React
- Vite
- Tailwind CSS

## Directory Structure

```
src/
│
├── components/            # Reusable UI components
│   ├── Navbar.jsx
│   ├── EventCard.jsx
│   ├── TicketCard.jsx
│   └── Modal.jsx
│
├── pages/                 # All pages (grouped by role/feature)
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── student/
│   │   ├── Dashboard.jsx
│   │   ├── Events.jsx
│   │   ├── EventDetails.jsx
│   │   └── MyTickets.jsx
│   │
│   ├── society/
│   │   ├── Dashboard.jsx
│   │   ├── CreateEvent.jsx
│   │   ├── ManageEvents.jsx
│   │   └── ManageTickets.jsx
│   │
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   └── ManageUsers.jsx
│
├── services/              # API calls
│   ├── api.js
│   ├── authService.js
│   ├── eventService.js
│   └── ticketService.js
│
├── context/               # Auth context (for login + roles)
│   └── AuthContext.jsx
│
├── utils/                 # Helper functions
│   ├── formatDate.js
│   └── constants.js
│
├── App.jsx
├── main.jsx
└── index.css
```

## File Descriptions

### Components
- **Navbar.jsx**: Navigation bar component
- **EventCard.jsx**: Card component for displaying event information
- **TicketCard.jsx**: Card component for displaying ticket information
- **Modal.jsx**: Reusable modal component

### Pages

#### Auth
- **Login.jsx**: User login page
- **Register.jsx**: User registration page

#### Student
- **Dashboard.jsx**: Student dashboard page
- **Events.jsx**: Events listing page for students
- **EventDetails.jsx**: Detailed view of a specific event
- **MyTickets.jsx**: Student's purchased tickets page

#### Society
- **Dashboard.jsx**: Society dashboard page
- **CreateEvent.jsx**: Event creation page for societies
- **ManageEvents.jsx**: Event management page for societies
- **ManageTickets.jsx**: Ticket management page for societies

#### Admin
- **Dashboard.jsx**: Admin dashboard page
- **ManageUsers.jsx**: User management page for admins

### Services
- **api.js**: Base API configuration and utilities
- **authService.js**: Authentication-related API calls
- **eventService.js**: Event-related API calls
- **ticketService.js**: Ticket-related API calls

### Context
- **AuthContext.jsx**: Authentication context for managing user state and roles

### Utils
- **formatDate.js**: Date formatting utility functions
- **constants.js**: Application constants and configuration

### Root Files
- **App.jsx**: Main application component
- **main.jsx**: Application entry point
- **index.css**: Global styles
