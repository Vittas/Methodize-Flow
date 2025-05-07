package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"github.com/gin-gonic/gin"
)

type Card struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	Completed   bool   `json:"completed"`
}

var dataSet []Card
const dataFile = "data.json"

func main() {
	loadData(dataFile)
	printData()

	router := gin.Default()

	router.SetTrustedProxies([]string{"127.0.0.1"})
	router.Use(corsMiddleware())
	
	router.GET("/", homeHandler)
	router.GET("/CardsData", getCardsHandler)
	router.GET("/CardsData/get", getCardByIDHandler)
	router.POST("/CardsData/add", postCardHandler)
	router.PUT("/CardsData/update", updateHandler)
	router.DELETE("/CardsData/dell", deleteHandler)

	fmt.Println("\nServidor rodando em http://localhost:8080")
	router.Run(":8080")
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	}
}

func loadData(filename string) {
	file, err := os.ReadFile(filename)
	if err != nil {log.Fatal("Error to read file:", err)}
	if err := json.Unmarshal(file, &dataSet); err != nil {log.Fatal("Error to decode JSON:", err)}
}

func saveData() {
	file, err := json.MarshalIndent(dataSet, "", "  ")
	if err != nil {log.Fatal("Error to encoder JSON:", err)}
	if err := os.WriteFile(dataFile, file, 0644); err != nil {log.Fatal("Error to save file:", err)}
}

func printData() {
	fmt.Println("\nData Load:")
	for _, card := range dataSet {
		status := "To do"
		if card.Completed {status = "finished"}
		fmt.Printf("\nStatus : %s\nID : %d\nTítulo : %s\nDescrição : %s\nPrioridade : %s\n", status, card.Id, card.Title, card.Description, card.Priority,)
	}
}

func homeHandler(c *gin.Context) {
	c.String(http.StatusOK, "Methodize-Flow\nEndpoints:\n-GET : /CardsData\n-GET : /CardsData/get?id=1\n-POST : /CardsData/add\n-PUT : /CardsData/update?id=1\n-DELETE : /CardsData/dell?id=1")
}

func getCardsHandler(c *gin.Context) {
	c.JSON(http.StatusOK, dataSet)
}

func getCardByIDHandler(c *gin.Context) {
    idStr := c.Query("id")
    if idStr == "" {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Parameter 'id' is required",
        })
        return
    }
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid ID",
            "details": err.Error(),
        })
        return
    }
    for _, card := range dataSet {
        if card.Id == id {
            c.JSON(http.StatusOK, card)
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{
        "error": fmt.Sprintf("Card with ID %d not found", id),
    })
}

func postCardHandler(c *gin.Context) {
	var newCard Card
	if err := c.ShouldBindJSON(&newCard); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	newCard.Id = len(dataSet) + 1
	dataSet = append(dataSet, newCard)
	saveData()
	c.JSON(http.StatusCreated, newCard)
}

func updateHandler(c *gin.Context) {
    idStr := c.Query("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid ID",
            "details": err.Error(),
        })
        return
    }
    var updatedCard Card
    if err := c.ShouldBindJSON(&updatedCard); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid data",
            "details": err.Error(),
        })
        return
    }
    for i, card := range dataSet {
        if card.Id == id {
            updatedCard.Id = id
            dataSet[i] = updatedCard
            saveData()
            c.JSON(http.StatusOK, gin.H{
                "message": "Card updated successfully",
                "card": updatedCard,
            })
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{
        "error": fmt.Sprintf("Card with ID %d not found", id),
    })
}

func deleteHandler(c *gin.Context) {
    idStr := c.Query("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid ID",
            "details": err.Error(),
        })
        return
    }
    for i, card := range dataSet {
        if card.Id == id {
            dataSet = append(dataSet[:i], dataSet[i+1:]...)
            saveData()
            c.JSON(http.StatusOK, gin.H{
                "message": fmt.Sprintf("Card %d remove successfully", id),
            })
            return
        }
    }
    c.JSON(http.StatusNotFound, gin.H{
        "error": fmt.Sprintf("Card with ID %d not found", id),
    })
}