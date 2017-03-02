package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	// Create the app router
	http.Handle("/", http.FileServer(http.Dir(os.Getenv("STATIC"))))
	http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), nil)
}
