# User & Post Management - Backend API

A NestJS-based REST API for managing users and their posts with full CRUD operations.

## 🚀 Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **Express** - HTTP server (via NestJS)
- **ESLint** - Code quality and consistency

## 📋 Features

- **User Management API** - Complete CRUD operations for users
- **Post Management API** - Complete CRUD operations for posts
- **Relationship Support** - Posts linked to users via userId
- **CORS Enabled** - Frontend integration ready
- **Type Safety** - Full TypeScript implementation
- **Error Handling** - Proper HTTP status codes and error messages

## 🛠️ Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run start:dev
   ```

3. **Start production server:**
   ```bash
   npm run start:prod
   ```

4. **Run linting:**
   ```bash
   npm run lint
   ```

5. **Run tests:**
   ```bash
   npm run test
   ```

## 🌐 API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts
- `GET /posts` - Get all posts
- `GET /posts?userId=:id` - Get posts by user ID
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## 📊 Data Models

### User
```typescript
{
  id: number;
  name: string;
  username: string;
  email: string;
}
```

### Post
```typescript
{
  id: number;
  userId: number;
  title: string;
  body?: string;
}
```

## 🔗 Frontend Integration

- **Port:** 3000 (default)
- **CORS:** Enabled for `http://localhost:5173`
- **Content-Type:** `application/json`

## 📁 Project Structure

```
src/
├── dto/               # Data Transfer Objects
│   ├── create-user.dto.ts
│   ├── create-post.dto.ts
│   └── update-*.dto.ts
├── interfaces/        # TypeScript interfaces
│   ├── user.interface.ts
│   └── post.interface.ts
├── users/            # User module
│   ├── users.controller.ts
│   └── users.service.ts
├── posts/            # Post module
│   ├── posts.controller.ts
│   └── posts.service.ts
└── main.ts           # Application entry point
```

## 🎯 Assignment Compliance

✅ NestJS + TypeScript setup  
✅ Complete CRUD API endpoints for users and posts  
✅ Hardcoded initial data in service files  
✅ Frontend integration with CORS support  
✅ Separate ports (Backend: 3000, Frontend: 5173)  
✅ ESLint compliance (no linting errors)  
✅ Proper TypeScript types and interfaces  
✅ Error handling with HTTP status codes  
✅ User-Post relationship support  