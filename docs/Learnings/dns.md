# DNS & Custom Host File Reference

## What is DNS?

- DNS (Domain Name System) translates human-friendly domain names (like google.com) into IP addresses computers use to communicate.
- Acts like the "phonebook" of the internet.
- Every time you visit a website, your computer queries DNS servers to resolve the domain to an IP address.

## How DNS Works (Simplified)

1. You enter a domain in your browser.
2. Your computer checks its local cache and hosts file.
3. If not found, it queries a DNS resolver (usually your ISP or public DNS like 8.8.8.8).
4. The resolver finds the IP address and returns it to your computer.
5. Your browser connects to the website using the IP address.

## Overriding DNS with the Hosts File

- The hosts file lets you manually map domain names to IP addresses, bypassing DNS lookup for those domains.
- Useful for local development, testing, or blocking sites.

### Editing the Hosts File

#### On macOS & Linux

1. Open a terminal.
2. Edit the hosts file with a text editor (requires sudo):
   ```bash
   sudo nano /etc/hosts
   ```
3. Add a line in the format:
   ```
   127.0.0.1   mycustom.local
   192.168.1.100   test.example.com
   ```
4. Save and exit (Ctrl+O, Enter, Ctrl+X in nano).
5. Changes take effect immediately (you may need to clear browser cache).

---

**Tip:** Each entry should be on its own line. The hosts file is checked before DNS servers.
