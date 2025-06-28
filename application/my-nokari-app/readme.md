# My Nokari App

A demo application to showcase bot attack mitigation strategies for job listing and application platforms.

## Features, Attacks, and Mitigation Strategies

### 1. Login Page

- **Feature:** User authentication via email and password.
- **Possible Attacks:**
  - Credential stuffing (bots try many username/password combinations).
  - Brute-force login attempts.
- **Mitigation Strategies:**
  - Rate limiting login attempts per IP/user.
  - CAPTCHA after several failed attempts.
  - Account lockout or backoff on repeated failures.
  - Monitoring and alerting via Prometheus metrics.

### 2. /jobs Page

- **Feature:** Public job listings endpoint.
- **Possible Attacks:**
  - Automated scraping of job data by bots.
- **Mitigation Strategies:**
  - Rate limiting requests to the endpoint.
  - Require authentication for access.
  - Use bot detection (User-Agent, behavior analysis).
  - Add dynamic data or watermarking to listings.

### 3. /apply Endpoint

- **Feature:** Apply to a job posting.
- **Possible Attacks:**
  - Automated job application flooding (spam bots).
  - Fake or bulk applications.
- **Mitigation Strategies:**
  - CAPTCHA or challenge-response before accepting applications.
  - mTLS (mutual TLS) for sensitive endpoints.
  - Rate limiting and monitoring.
  - Email/phone verification for applicants.

### 4. Metrics Endpoint (/metrics)

- **Feature:** Prometheus metrics for monitoring.
- **Possible Attacks:**
  - Scraping or DDoS of metrics endpoint.
- **Mitigation Strategies:**
  - Restrict access to /metrics (e.g., allow only from internal network).
  - Add authentication or IP whitelisting.

## Project Structure

```
my-nokari-app/
  app.js
  controllers/
    authController.js
    jobController.js
  models/
    jobModel.js
  routes/
    authRoutes.js
    jobRoutes.js
  metrics/
    prometheus.js
  views/
    login.html
    dashboard.html
  readme.md
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the app:**

   ```bash
   node app.js
   ```

3. **Access the app:**

   - Open [http://localhost:3001](http://localhost:3001) in your browser.

4. **Prometheus metrics:**
   - Visit [http://localhost:3001/metrics](http://localhost:3001/metrics) to view metrics.

## Example Users

- `deepak.bansode@gruve.ai` / `gruve123`
- `test.user@gruve.ai` / `gruve123`

## Notes

- This app is for demonstration and educational purposes only.
- Authentication and security mechanisms are simplified for clarity.
- Planned enhancements: CAPTCHA, mTLS, and more advanced bot mitigation.
