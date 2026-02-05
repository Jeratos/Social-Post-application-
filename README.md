# Social Post Application

A full-stack social media application that allows users to create posts, upload images, like, and comment on posts.

## 🚀 Tech Stack

### Frontend

- **React** (with TypeScript)
- **Vite** - Build tool
- **React Bootstrap** - UI Framework
- **React Router DOM** - Routing
- **React Toastify** - Notifications

### Backend

- **Node.js** & **Express** - Server runtime and framework
- **MongoDB** & **Mongoose** - Database
- **JWT** (JSON Web Tokens) - Authentication
- **AWS S3** - Image Storage
- **Multer** - File uploads

## 🛠️ Prerequisites

Before running the application, ensure you have:

- [Node.js](https://nodejs.org/) installed
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- An [AWS S3](https://aws.amazon.com/s3/) bucket for image storage

## ⚙️ Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
```

> **Note:** The frontend currently connects to the backend at `http://localhost:5000` (ensure your backend is running on this port).

## 📦 Installation & Running

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   nodemon server.js
   # or
   node server.js
   ```
   The backend server will start at `http://localhost:5000`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run at the URL shown in the terminal (usually `http://localhost:5173`).

## 📂 Project Structure

```
/
├── backend/         # Express server, API routes, Database models
└── frontend/        # React application source code
```

## ✨ Features

- **User Authentication**: Secure login and signup.
- **Create Posts**: Users can create posts with text and images.
- **Feed**: View posts from all users.
- **Interactions**: Like and comment on posts.
- **My Posts**: Filter to see only your own posts.
