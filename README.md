# Task Management System

## Description
This repository contains three separate projects for a task management system:

1. **Node.js Backend**: Provides a REST API for managing tasks with PostgreSQL and Redis for caching.
2. **React.js Frontend**: A user interface to interact with tasks via a dashboard.
3. **Go Microservice**: Handles task creation and bulk task creation, optimized for performance.

Each project has its own `README.md` file with detailed instructions.

---

## Setting Up Redis Locally

To set up Redis on your machine:

1. **Install Redis**:
   - macOS:
     ```bash
     brew install redis
     ```
   - Ubuntu:
     ```bash
     sudo apt-get install redis-server
     ```
   - Windows: Follow instructions [here](https://redis.io/download).

2. **Start Redis**:
   ```bash
   redis-server
   ```

3. **Check if Redis is running**:
   ```bash
   redis-cli ping
   ```
   If you see `PONG`, Redis is working.

---

## How to Run Each Project

### 1. **Node.js Backend**

- **Navigate to the backend directory**:
  ```bash
  cd task-backend
  ```

- **Install dependencies**:
  ```bash
  npm install
  ```

- **Start the backend**:
  ```bash
  node server.js
  ```

### 2. **React.js Frontend**

- **Navigate to the frontend directory**:
  ```bash
  cd task-dashboard
  ```

- **Install dependencies**:
  ```bash
  npm install
  ```

- **Start the frontend**:
  ```bash
  npm start
  ```

### 3. **Go Microservice**

- **Navigate to the Go service directory**:
  ```bash
  cd go-service
  ```

- **Install dependencies**:
  ```bash
  go mod tidy
  ```

- **Run the Go service**:
  ```bash
  go run main.go
  ```

---

Each project has its own `README.md` file with more detailed instructions.
