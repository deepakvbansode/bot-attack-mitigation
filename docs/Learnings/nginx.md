# NGINX Quick Reference for Node.js Apps

## What is NGINX?

- High-performance, open-source web server and reverse proxy.
- Commonly used to serve static files, load balance, and secure web applications.
- Efficient at handling many concurrent connections.

## Running a Node.js App with NGINX

- Node.js apps typically run on ports like 3000 or 8080.
- NGINX acts as a reverse proxy, forwarding HTTP requests to your Node.js app.
- This setup improves security, performance, and scalability.

### Example: Basic Reverse Proxy

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Key NGINX Concepts & Directives

- **server**: Defines a virtual server block.
- **listen**: Port to listen on (e.g., 80 for HTTP, 443 for HTTPS).
- **server_name**: Domain name for the server block.
- **location**: Defines how to respond to requests for a given path.
- **proxy_pass**: Forwards requests to another server (e.g., Node.js app).
- **proxy_set_header**: Sets HTTP headers for proxied requests.
- **root**: Directory for static files.
- **index**: Default file to serve (e.g., index.html).

## Useful Commands

- Test config: `nginx -t`
- Reload config: `sudo systemctl reload nginx`
- Start/stop: `sudo systemctl start nginx`
- Stop: `sudo systemctl stop nginx`

---

**Tip:** Always restart or reload NGINX after changing its config files.
