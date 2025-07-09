# Prometheus Query Basics & Examples

## How Prometheus Stores Data

- Prometheus stores time-series data as metrics, each identified by a metric name and optional key-value pairs called labels.
- Example: `node_cpu_seconds_total{instance="192.168.1.10:9100", mode="idle"}`
- Each data point is a value with a timestamp.

## Prometheus Query Language (PromQL)

- PromQL is used to select and aggregate time-series data.
- Queries can filter by metric name and labels, and use functions for calculations.
- Basic query: `metric_name{label1="value1", label2="value2"}`
- Use operators and functions for math, aggregation, and rate calculations.

## Writing Queries: Fundamentals

- **Select a metric:** Start with the metric name (e.g., `node_memory_MemAvailable_bytes`).
- **Filter with labels:** Use curly braces to filter (e.g., `{instance="192.168.1.10:9100"}`).
- **Aggregate:** Use functions like `sum()`, `avg()`, `max()`, etc.
- **Calculate rates:** Use `rate()` or `irate()` for counters.

## Example Queries for VM Metrics (Node Exporter)

- **CPU Usage (per mode):**
  ```promql
  node_cpu_seconds_total{instance="<vm-ip>:9100"}
  ```
- **CPU Usage (total, all modes):**
  ```promql
  sum(rate(node_cpu_seconds_total{instance="<vm-ip>:9100"}[5m])) by (mode)
  ```
- **Memory Available (bytes):**
  ```promql
  node_memory_MemAvailable_bytes{instance="<vm-ip>:9100"}
  ```
- **Memory Usage (percent):**
  ```promql
  100 * (1 - node_memory_MemAvailable_bytes{instance="<vm-ip>:9100"} / node_memory_MemTotal_bytes{instance="<vm-ip>:9100"})
  ```
- **Disk Space Free (per mount):**
  ```promql
  node_filesystem_free_bytes{instance="<vm-ip>:9100", fstype!="tmpfs", fstype!="overlay"}
  ```
- **Disk Usage (percent, per mount):**
  ```promql
  100 * (1 - node_filesystem_free_bytes{instance="<vm-ip>:9100"} / node_filesystem_size_bytes{instance="<vm-ip>:9100"})
  ```
- **Network Traffic (bytes received per second):**
  ```promql
  rate(node_network_receive_bytes_total{instance="<vm-ip>:9100", device!="lo"}[5m])
  ```
- **Network Traffic (bytes transmitted per second):**
  ```promql
  rate(node_network_transmit_bytes_total{instance="<vm-ip>:9100", device!="lo"}[5m])
  ```

---

**Tip:** Replace `<vm-ip>` with your VM's IP address. Use the Prometheus UI or Grafana to test and visualize queries.
