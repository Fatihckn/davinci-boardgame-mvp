# User & Post Management - Frontend

A modern React + TypeScript application for managing users and their posts with full CRUD operations.

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **ESLint** - Code quality and consistency

## 📋 Features

- **Homepage** - Navigation to Users and Posts sections
- **User Management** - View, create, edit, and delete users
- **Post Management** - View, create, edit, and delete posts
- **Relationship Display** - Shows user names in posts via userId
- **Responsive Design** - Clean and user-friendly interface
- **Real-time Updates** - Instant data synchronization with backend

## 🛠️ Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run linting:**
   ```bash
   npm run lint
   ```

## 🌐 Usage

- **Homepage** (`/`) - Main navigation page
- **Users** (`/users`) - Manage user accounts
- **Posts** (`/posts`) - Manage user posts

## 🔗 Backend Integration

This frontend connects to a NestJS backend running on `http://localhost:3000`. Make sure the backend is running before using the application.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Homepage.tsx    # Main navigation
│   ├── UserList.tsx    # User management
│   └── PostList.tsx    # Post management
├── services/           # API service layer
│   └── api.ts         # HTTP client configuration
├── types/             # TypeScript type definitions
│   └── index.ts       # User and Post interfaces
└── App.tsx            # Main application component
```

## 🎯 Assignment Compliance

✅ React + TypeScript + Vite setup  
✅ Homepage with Users/Posts navigation  
✅ User List: id, name, username, email  
✅ Post List: userId, id, title  
✅ Full CRUD operations for both entities  
✅ User-Post relationship display  
✅ Clean UI/UX with responsive design  
✅ ESLint compliance (no linting errors)  
✅ Backend integration with Axios  