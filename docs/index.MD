# Architecture

Bot is nothing but a script or program trying mis use the application. The bot could be as simple as curl command in infinite for loop or more sofisticated bots faking the browser finger prints and simulating the user like behavior.

## 🧱 1. Edge / Network Layer

| **Attack Type**              | **Description**                                          | **How It’s Performed**                                        |
| ---------------------------- | -------------------------------------------------------- | ------------------------------------------------------------- |
| Denial of Service (DoS/DDoS) | Overloads systems, making them unavailable to real users | Bots send massive traffic volumes to overwhelm servers        |
| Search Engine Crawling Abuse | Abuses crawling to extract data or overload resources    | Bots impersonate search engines to scrape or overload traffic |

---

## 🌐 2. Application Layer

| **Attack Type**       | **Description**                                   | **How It’s Performed**                            |
| --------------------- | ------------------------------------------------- | ------------------------------------------------- |
| Credential Stuffing   | Unauthorized access using leaked credentials      | Bots try username/password combos on login forms  |
| Brute Force Attack    | Cracks accounts by guessing passwords             | Bots systematically guess passwords               |
| Web Scraping          | Extracts data like content or pricing             | Bots crawl HTML pages and extract structured data |
| Scalping Bots         | Buy limited stock items faster than humans        | Bots monitor releases and automate purchases      |
| Inventory Hoarding    | Adds items to cart to create false scarcity       | Bots reserve items without checking out           |
| Fake Account Creation | Generates accounts for spam or abuse              | Bots submit signup forms repeatedly               |
| Spamming              | Posts junk/malicious content in forms or comments | Bots fill forms or comments with spammy content   |
| Price Scraping        | Extracts competitor pricing                       | Bots repeatedly request pricing pages             |

---

## 💳 3. Payment / Transaction Layer

| **Attack Type** | **Description**                  | **How It’s Performed**                                     |
| --------------- | -------------------------------- | ---------------------------------------------------------- |
| Carding         | Tests stolen credit card numbers | Bots make low-value transactions to check which cards work |

---

## 📊 4. Ad / Marketing Layer

| **Attack Type** | **Description**                      | **How It’s Performed**                         |
| --------------- | ------------------------------------ | ---------------------------------------------- |
| Click Fraud     | Steals ad budgets by faking clicks   | Bots simulate ad clicks to inflate ad spend    |
| Ad Fraud        | Fakes ad impressions or interactions | Bots refresh pages or simulate ad views/clicks |

# Following are the stragies to mitigate bot attack

Edge - Rate Limiting, IP block, user-agent filter

Gateway - API key auth, mTLS(optional)

App - CAPTCHA LOGIC, token based rate limiting
