
# Task Management Backend (Node.js)

## Description
This project is a Node.js backend application that provides a REST API for managing tasks. It supports CRUD (Create, Read, Update, Delete) operations for tasks, which are stored in a PostgreSQL database. To optimize performance, Redis is used to cache task data, reducing the need to repeatedly query the database. The cache is invalidated whenever tasks are created, updated, or deleted, ensuring data consistency.

This backend serves as the core task management system and communicates with both the PostgreSQL database and Redis cache.

## Setting Up the Project

### Requirements
- **Node.js** (v12 or later)
- **PostgreSQL** (running on `localhost:5432`)
- **Redis** (running on `localhost:6379`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd task-backend/node-api
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Set up PostgreSQL**:
   - Create a PostgreSQL database called `taskdb`.
   - Make sure PostgreSQL is running and accessible.

4. **Set up Redis**:
   - Start the Redis server using the following command:
     ```bash
     redis-server
     ```

5. **Create a `.env` file**:
   - Create a `.env` file in the project root directory with the following content:
     ```bash
     DB_USER=postgres
     DB_PASSWORD=yourpassword
     DB_NAME=taskdb
     REDIS_URL=redis://localhost:6379
     ```

## How to Start the Server

1. **Start the PostgreSQL server** (if not already running).

2. **Start the Redis server**:
   ```bash
   redis-server
   ```

3. **Start the Node.js server**:
   ```bash
   node server.js
   ```

4. The Node.js server will be running at `http://localhost:3000`.
