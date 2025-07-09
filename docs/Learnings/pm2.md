# PM2 Quick Reference

## What is PM2?

- PM2 is a production process manager for Node.js applications.
- It keeps your apps alive forever, reloads them without downtime, and helps manage logs and monitoring.

## Problems PM2 Solves

- Node.js apps stop if the process crashes or the server restarts.
- Manual restarts are tedious and error-prone.
- Hard to manage multiple apps or monitor their health manually.

## How PM2 Solves Them

- Automatically restarts crashed apps.
- Supports zero-downtime reloads (graceful restarts).
- Provides process monitoring, log management, and clustering.
- Can run multiple apps and manage their lifecycle easily.

## Useful PM2 Commands

- Install: `npm install -g pm2`
- Start app: `pm2 start app.js`
- List processes: `pm2 list`
- Restart app: `pm2 restart app`
- Stop app: `pm2 stop app`
- Delete app: `pm2 delete app`
- Show logs: `pm2 logs`
- Monitor: `pm2 monit`
- Save process list: `pm2 save`
- Startup script (auto-start on boot): `pm2 startup`

---

**Tip:** Use `pm2 ecosystem` for advanced config and clustering.
