# Todo App - Angular + JSON Server

A full-featured CRUD Todo application built with Angular and JSON Server, featuring authentication, reactive forms, and complete task management.

## 🚀 Features

- **User Authentication**
  - Register with validation (name, email, password)
  - Login with email/password
  - Protected routes with Auth Guard
  - Session persistence with localStorage

- **Todo Management (CRUD)**
  - Create new todos with title, description, due date, and status
  - View all your todos in a beautiful card layout
  - Edit existing todos
  - Delete todos with confirmation
  - Automatic overdue detection

- **Form Validation**
  - Reactive forms throughout
  - Email validation
  - Password length requirements
  - Password confirmation matching
  - Due date validation (no past dates)
  - Minimum length validations

- **Modern UI/UX**
  - Gradient purple theme
  - Responsive design
  - Card-based layout
  - Status badges
  - Smooth animations
  - Mobile-friendly

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🛠️ Installation & Setup

### Project Structure
```
todo-app-complete/
├── backend/          # JSON Server
│   ├── db.json
│   └── package.json
└── frontend/         # Angular App
    ├── src/
    ├── angular.json
    ├── tsconfig.json
    └── package.json
```

### 1. Setup Backend (JSON Server)

Open **Terminal/Command Prompt #1**:

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start JSON Server (runs on port 3000)
npm start
```

Keep this terminal running! JSON Server will be available at `http://localhost:3000`

### 2. Setup Frontend (Angular)

Open **Terminal/Command Prompt #2** (new window):

```bash
# Navigate to frontend folder
cd frontend

# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli

# Install project dependencies
npm install

# Start Angular development server (runs on port 4200)
ng serve
```

Keep this terminal running too! Angular app will be available at `http://localhost:4200`

### 3. Open the App

Open your browser and go to: **http://localhost:4200**

## 🎯 Usage

### 1. Register a New User

1. Open `http://localhost:4200`
2. Click "Register here"
3. Fill in:
   - Name (min 3 characters)
   - Email (valid email format)
   - Password (min 6 characters)
   - Confirm Password (must match)
4. Click "Register"

### 2. Login

1. Go to login page
2. Enter your email and password
3. Click "Login"

### 3. Manage Todos

Once logged in:

- **Add Todo**: Click "+ Add New Todo" button
  - Enter title (min 3 characters)
  - Enter description (min 10 characters)
  - Select due date (today or future)
  - Choose status (Pending/In Progress/Completed)
  
- **View Todos**: All your todos displayed as cards
  - See title, description, due date
  - Status badge with color coding
  - Overdue warning for past due dates

- **Edit Todo**: Click the ✏️ edit icon on any todo card

- **Delete Todo**: Click the 🗑️ delete icon (with confirmation)

- **Logout**: Click "Logout" in the navbar

## 🔧 API Endpoints

JSON Server provides these endpoints at `http://localhost:3000`:

- `GET /users` - Get all users
- `POST /users` - Register new user
- `GET /users?email={email}&password={password}` - Login
- `GET /todos` - Get all todos
- `GET /todos?userId={userId}` - Get todos for specific user
- `GET /todos/{id}` - Get single todo
- `POST /todos` - Create new todo
- `PUT /todos/{id}` - Update todo
- `DELETE /todos/{id}` - Delete todo

## 🎨 Tech Stack

- **Frontend**: Angular 17, TypeScript, Reactive Forms
- **Backend**: JSON Server (REST API)
- **Styling**: CSS3 with gradients and animations
- **State Management**: Services + localStorage

## 🔐 Validation Rules

### Register Form
- **Name**: Required, minimum 3 characters
- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters
- **Confirm Password**: Required, must match password

### Login Form
- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters

### Todo Form
- **Title**: Required, minimum 3 characters
- **Description**: Required, minimum 10 characters
- **Due Date**: Required, must be today or future date
- **Status**: Required (pending/in-progress/completed)

## 🐛 Troubleshooting

**JSON Server not starting?**
- Make sure you're in the `backend` folder
- Check if port 3000 is not in use
- Try: `npx json-server --watch db.json --port 3000`

**Angular app not starting?**
- Make sure you're in the `frontend` folder
- Run `npm install` to ensure all dependencies are installed
- Try clearing cache: `npm cache clean --force` then `npm install`

**CORS errors?**
- JSON Server enables CORS by default
- Ensure backend is running on port 3000
- Ensure frontend is calling `http://localhost:3000`

**Can't login after registration?**
- Check browser console for errors
- Verify JSON Server is running
- Check `backend/db.json` to see if user was created

**Port already in use?**
- Backend (3000): Stop other apps using port 3000
- Frontend (4200): Use `ng serve --port 4201` for different port

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Quick Start Commands

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install -g @angular/cli
npm install
ng serve
```

Then open: **http://localhost:4200**

## 📝 Notes

- This is a development setup using JSON Server (not for production)
- Passwords are stored in plain text in db.json (use proper encryption in production)
- For production, replace JSON Server with a real backend (Node.js, .NET, etc.)
- Both servers must be running simultaneously for the app to work

## 🎓 Learning Points

This project demonstrates:
- ✅ Angular Reactive Forms with validation
- ✅ HTTP Client for API calls
- ✅ Service-based architecture
- ✅ Route guards for authentication
- ✅ Component communication
- ✅ CRUD operations
- ✅ REST API integration
- ✅ LocalStorage for session management
- ✅ Responsive CSS design

---

Enjoy managing your daily tasks! 📝✨
