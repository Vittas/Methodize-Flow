package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
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

	http.HandleFunc("/CardsData", cardsHandler)
	http.HandleFunc("/CardsData/update", updateHandler)
	http.HandleFunc("/CardsData/dell", deleteHandler)
	http.HandleFunc("/", homeHandler)

	fmt.Println("\nServidor rodando em http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
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

func homeHandler(w http.ResponseWriter, r *http.Request) {fmt.Fprintf(w, "Methodize-Flow\nEndpoints:\n-GET/POST : /CardsData\n-PUT : /CardsData/update?id=1\n-DELETE : /CardsData/dell?id=1")}

func cardsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {
	case "GET":
		json.NewEncoder(w).Encode(dataSet)
	case "POST":
		var newCard Card
		if err := json.NewDecoder(r.Body).Decode(&newCard); err != nil {
			http.Error(w, "JSON inválido", http.StatusBadRequest)
			return
		}
		newCard.Id = len(dataSet) + 1
		dataSet = append(dataSet, newCard)
		saveData()
		json.NewEncoder(w).Encode(newCard)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func updateHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != "PUT" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Id invalid", http.StatusBadRequest)
		return
	}

	var updatedCard Card
	if err := json.NewDecoder(r.Body).Decode(&updatedCard); err != nil {
		http.Error(w, "JSON invalid", http.StatusBadRequest)
		return
	}
	for i, card := range dataSet {
		if card.Id == id {
			updatedCard.Id = id
			dataSet[i] = updatedCard
			saveData()
			json.NewEncoder(w).Encode(updatedCard)
			return
		}
	}
	http.Error(w, "Card not found", http.StatusNotFound)
}

func deleteHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != "DELETE" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Id invalid", http.StatusBadRequest)
		return
	}
	for i, card := range dataSet {
		if card.Id == id {
			dataSet = append(dataSet[:i], dataSet[i+1:]...)
			saveData()
			w.WriteHeader(http.StatusOK)
			fmt.Fprintf(w, `{"message": "Card %d delet"}`, id)
			return
		}
	}
	http.Error(w, "Card not found", http.StatusNotFound)
}