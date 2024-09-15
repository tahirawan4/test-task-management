# Task Management Microservice (Go)

## Description
This Go microservice is responsible for handling task creation and bulk task creation operations. It communicates directly with a PostgreSQL database to store task data. The microservice is optimized for performance and is designed to handle high-volume task creation requests, working alongside the Node.js backend.

## Setting Up the Project

### Requirements
- **Go** (v1.16 or later)
- **PostgreSQL** (running on `localhost:5432`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd task-backend/go-service
   ```

2. **Install the Go module dependencies**:
   ```bash
   go mod tidy
   ```

3. **Set up PostgreSQL**:
   - Create a PostgreSQL database called `taskdb`.
   - Ensure that PostgreSQL is running and accessible on `localhost:5432`.

## How to Start the Go Microservice

1. **Run the Go service**:
   ```bash
   go run main.go
   ```

2. The Go microservice will be running at `http://localhost:8081`.

## API Endpoints

- **POST /tasks**: Create a new task.
- **POST /tasks/bulk**: Create multiple tasks in bulk.
