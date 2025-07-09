# Helm Quick Reference & Cheat Sheet

## What is Helm?

- Helm is a package manager for Kubernetes.
- It helps you define, install, and upgrade complex Kubernetes applications using "charts" (pre-configured application resources).
- Simplifies deployment, versioning, and management of Kubernetes resources.

## Common Helm Commands

### Chart Management

- List installed charts:
  ```bash
  helm list
  ```
- Search for charts:
  ```bash
  helm search hub <keyword>
  helm search repo <keyword>
  ```
- Add a chart repository:
  ```bash
  helm repo add <repo-name> <repo-url>
  helm repo update
  ```

### Install, Upgrade, and Remove Packages

- Install a chart:
  ```bash
  helm install <release-name> <chart> [flags]
  ```
- Upgrade a release:
  ```bash
  helm upgrade <release-name> <chart> [flags]
  ```
- Uninstall (remove) a release:
  ```bash
  helm uninstall <release-name>
  ```

### Inspect & Manage Releases

- Get release status:
  ```bash
  helm status <release-name>
  ```
- Get release values:
  ```bash
  helm get values <release-name>
  ```
- Rollback to previous version:
  ```bash
  helm rollback <release-name> <revision>
  ```

---

**Tip:** Use `helm template` to render chart templates locally without installing.
