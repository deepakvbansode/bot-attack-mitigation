# Monitoring a VM with Prometheus & Grafana on Kubernetes

## Goal

- Collect, store, and visualize metrics from a VM using Prometheus and Grafana running on a Kubernetes cluster.

## Problem

- Need to monitor VM resource usage (CPU, memory, disk, etc.)
- Want to use centralized monitoring tools (Prometheus & Grafana) deployed on Kubernetes, but collect metrics from external VMs.

## Solution

- Install **Node Exporter** on the VM to expose metrics.
- Deploy **Prometheus** and **Grafana** on the Kubernetes cluster.
- Configure Prometheus (on K8s) to scrape metrics from the VM's Node Exporter.
- Visualize VM metrics in Grafana (on K8s).

---

## Role of Each Component

- **Node Exporter (on VM):** Exposes hardware and OS metrics at `http://<vm-ip>:9100/metrics`.
- **Prometheus (on K8s):** Scrapes metrics from the VM and stores them.
- **Grafana (on K8s):** Connects to Prometheus and visualizes the VM metrics.

---

## Step-by-Step Setup Guide

### 1. Install Node Exporter on the VM

1. SSH into your VM.
2. Download and extract Node Exporter:

   ```bash
   wget https://github.com/prometheus/node_exporter/releases/latest/download/node_exporter-*.linux-amd64.tar.gz
   tar xvfz node_exporter-*.linux-amd64.tar.gz
   cd node_exporter-*
   ```

3. (Recommended) Run Node Exporter as a systemd service:

   - Create a systemd service file:
     ```bash
     sudo nano /etc/systemd/system/node_exporter.service
     ```
   - Paste the following content (update the path if needed):

     ```ini
     [Unit]
     Description=Prometheus Node Exporter
     After=network.target

     [Service]
     User=nobody
     ExecStart=/full/path/to/node_exporter

     [Install]
     WantedBy=default.target
     ```

   - Reload systemd and start the service:
     ```bash
     sudo systemctl daemon-reload
     sudo systemctl start node_exporter
     sudo systemctl enable node_exporter
     sudo systemctl status node_exporter
     ```

4. Ensure port 9100 is open on the VM firewall (e.g., with UFW):

   ```bash
   sudo ufw allow 9100/tcp
   ```

### 2. Deploy Prometheus on Kubernetes

1. Add the Helm repo and install Prometheus:

   ```bash
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update
   helm install prometheus prometheus-community/prometheus
   ```

2. Access Prometheus UI (port-forward):

   ```bash
   kubectl port-forward svc/prometheus-server 9090:80
   ```

### 3. Configure Prometheus to Scrape the VM

1. Edit the Prometheus config (ConfigMap or values.yaml if using Helm):

   ```yaml
   scrape_configs:
     - job_name: "node-exporter-vm"
       static_configs:
         - targets: ["<vm-ip>:9100"]
   ```

2. Apply the config and reload/restart Prometheus pod.

### 4. Deploy Grafana on Kubernetes

1. Add the Helm repo and install Grafana:

   ```bash
   helm repo add grafana https://grafana.github.io/helm-charts
   helm repo update
   helm install grafana grafana/grafana
   ```

2. Access Grafana UI (port-forward):

   ```bash
   kubectl port-forward svc/grafana 3000:80
   ```

3. Default login: `admin/admin`, change pwd `admin123`
4. Add Prometheus as a data source in Grafana.
5. Import a Node Exporter dashboard from Grafana.com for easy VM monitoring.
6. Dashboard ID: 1860

---

## How to Find and Edit `values.yaml` for Prometheus Helm Chart

1. **Get the default `values.yaml`:**

   - Run the following command to download the default values file for the Prometheus Helm chart:
     ```bash
     helm show values prometheus-community/prometheus > prometheus-values.yaml
     ```

2. **Edit the `values.yaml`:**

   - Open the downloaded file in your favorite editor:
     ```bash
     nano prometheus-values.yaml
     # or
     vim prometheus-values.yaml
     ```
   - Make your changes (e.g., add scrape configs, change service type, enable persistence, etc.).

3. **Install Prometheus with your custom values:**

   - Use the `-f` flag to specify your edited file:
     ```bash
     helm install prometheus prometheus-community/prometheus -f prometheus-values.yaml
     ```

4. **Upgrade an existing release with new values:**

   - If Prometheus is already installed, apply changes with:
     ```bash
     helm upgrade prometheus prometheus-community/prometheus -f prometheus-values.yaml
     ```

5. **Where to edit scrape configs:**
   - In `prometheus-values.yaml`, look for the `additionalScrapeConfigs` section to add custom scrape jobs (like for your VM's Node Exporter).

---

**Tip:** Always keep a backup of your custom `values.yaml` for future upgrades or troubleshooting.

**Tip:** You can monitor multiple VMs by adding more IPs to the `targets` list in Prometheus config.
