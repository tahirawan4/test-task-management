// go-service/main.go
package main

import (
    "context"
    "database/sql"
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
    _ "github.com/jackc/pgx/v4/stdlib"
)

type Task struct {
    ID          int    `json:"id"`
    Title       string `json:"title"`
    Description string `json:"description"`
    Priority    string `json:"priority"`
    Status      string `json:"status"`
    Deadline    string `json:"deadline"`
}

var db *sql.DB

func main() {
    // Initialize PostgreSQL connection
    var err error
    db, err = sql.Open("pgx", "postgres://test:1234567a@localhost:5432/tasks")
    if err != nil {
        log.Fatalf("Error opening database: %q", err)
    }
    defer db.Close()

    router := gin.Default()

    // Route for creating a single task
    router.POST("/tasks", createTask)

    // Route for bulk task creation
    router.POST("/tasks/bulk", bulkCreateTasks)

    router.Run(":8081") // Go service runs on port 8081
}

// Handler for creating a single task
func createTask(c *gin.Context) {
    var task Task
    if err := c.ShouldBindJSON(&task); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    query := `INSERT INTO "Tasks" (title, description, priority, status, deadline)
              VALUES ($1, $2, $3, $4, $5) RETURNING id`
    err := db.QueryRowContext(context.Background(), query, task.Title, task.Description, task.Priority, task.Status, task.Deadline).Scan(&task.ID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, task)
}

// Handler for bulk task creation
func bulkCreateTasks(c *gin.Context) {
    var tasks []Task
    if err := c.ShouldBindJSON(&tasks); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    query := `INSERT INTO "Tasks" (title, description, priority, status, deadline)
              VALUES ($1, $2, $3, $4, $5) RETURNING id`

    for i := range tasks {
        err := db.QueryRowContext(context.Background(), query, tasks[i].Title, tasks[i].Description, tasks[i].Priority, tasks[i].Status, tasks[i].Deadline).Scan(&tasks[i].ID)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }

    c.JSON(http.StatusOK, tasks)
}
