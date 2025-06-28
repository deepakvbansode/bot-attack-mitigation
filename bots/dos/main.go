package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

const (
	targetURL     = "http://localhost:9000/login"
	requestsPerSec = 160
	durationSec   = 60 // Run for 60 seconds
)

func main() {
	fmt.Printf("Starting DDoS attack on %s\n", targetURL)
	fmt.Printf("Rate: %d requests per second\n", requestsPerSec)

	// Create a ticker for rate limiting
	ticker := time.NewTicker(time.Second / time.Duration(requestsPerSec))
	defer ticker.Stop()

	var wg sync.WaitGroup
	start := time.Now()

	// Counter for successful and failed requests
	var successCount, failCount int
	var countMutex sync.Mutex

	// Run for specified duration
	for time.Since(start).Seconds() < float64(durationSec) {
		<-ticker.C // Wait for ticker
		wg.Add(1)
		go func() {
			defer wg.Done()
			resp, err := http.Get(targetURL)
			
			countMutex.Lock()
			if err != nil {
				failCount++
				fmt.Printf("Request failed: %v\n", err)
			} else {
				successCount++
				resp.Body.Close()
			}
			countMutex.Unlock()
		}()
	}

	wg.Wait()
	duration := time.Since(start)

	fmt.Printf("\nAttack completed in %.2f seconds\n", duration.Seconds())
	fmt.Printf("Successful requests: %d\n", successCount)
	fmt.Printf("Failed requests: %d\n", failCount)
	fmt.Printf("Average RPS: %.2f\n", float64(successCount+failCount)/duration.Seconds())
}