# UFW Firewall Command Cheat Sheet

UFW (Uncomplicated Firewall) is a user-friendly command-line tool for managing a Linux system's firewall. It provides a simple way to create an IPv4 or IPv6 host-based firewall, making it easier to allow or block network traffic. UFW is designed to be straightforward for beginners, while still offering powerful features for advanced users. It works by configuring iptables rules under the hood, abstracting away the complexity and allowing you to manage firewall rules with easy-to-remember commands. UFW is commonly used to secure servers by restricting access to only necessary ports and services.

A quick reference for managing your firewall with UFW (Uncomplicated Firewall) on Linux systems. All commands require `sudo` unless otherwise noted.

---

## 1. Show Firewall Status & Rules

```bash
sudo ufw status verbose
```

Shows all current rules, open ports, and policy.

**Example Output:**

```
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
3000/tcp                   ALLOW       Anywhere
```

---

## 2. Check if UFW is Enabled

```bash
sudo ufw status
```

If it says `inactive`, enable it:

```bash
sudo ufw enable
```

---

## 3. List All Rules in Numbered Format

```bash
sudo ufw status numbered
```

Useful for deleting rules by number.

---

# Opening & Allowing Traffic

## 4. Allow Specific Port

```bash
sudo ufw allow 3000         # TCP by default
sudo ufw allow 8080/tcp
sudo ufw allow 53/udp
```

## 5. Allow from Specific IP

```bash
sudo ufw allow from 192.168.1.100
sudo ufw allow from 192.168.1.100 to any port 22
```

---

# Blocking & Denying Traffic

## 6. Block an IP Address

```bash
sudo ufw deny from 203.0.113.25
```

## 7. Deny Incoming on a Port

```bash
sudo ufw deny 80/tcp
```

---

# Removing Rules

## 8. Delete by Exact Rule

```bash
sudo ufw delete allow 3000
sudo ufw delete deny from 203.0.113.25
```

## 9. Delete by Rule Number

First, list rules:

```bash
sudo ufw status numbered
```

Then delete by number:

```bash
sudo ufw delete 2
```

---

# Advanced

## 10. Default Policies

Set default deny (incoming) and allow (outgoing):

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

## 11. Reset All Firewall Rules

**Caution:** This wipes all rules!

```bash
sudo ufw reset
```

## 12. Turn UFW On or Off

```bash
sudo ufw enable
sudo ufw disable
```

---

# Tips

- Use `sudo ufw app list` to see available application profiles.
- Use `sudo ufw reload` to reload rules after manual config changes.
- Use `sudo ufw logging on` or `off` to enable/disable logging.
- For IPv6, ensure `IPV6=yes` in `/etc/default/ufw`.
- Check logs: `/var/log/ufw.log`.

---

**For more details, see the [UFW manual](https://manpages.ubuntu.com/manpages/latest/en/man8/ufw.8.html).**
