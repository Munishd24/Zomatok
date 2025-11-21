# Zomatok | Food Reels - MERN Application with DevOps Integration

![Status](https://img.shields.io/badge/Status-Work_in_Progress-yellow)

**Zomatok** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to mimic food reel platforms. This project serves as a comprehensive playground for implementing and demonstrating an end-to-end DevOps pipeline, featuring CI/CD, containerization, orchestration, and Infrastructure as Code (IaC).

> **Note:** This project is currently **Work in Progress**. Features and infrastructure components are being implemented incrementally.

## 🚀 Project Overview

The primary goal of this project is to bridge the gap between full-stack development and modern DevOps practices. It integrates a robust CI/CD workflow to automate the journey from code commit to production deployment.

### Key DevOps Features (Implemented & In-Progress)
*   **CI/CD Pipelines**: Automated build, test, and deployment workflows using **GitHub Actions**.
*   **Containerization**: Application services (Frontend & Backend) are containerized using **Docker**.
*   **Orchestration**: Deployment and management of containers on a **Kubernetes** cluster.
*   **Infrastructure as Code (IaC)**: Cloud infrastructure provisioning using **Terraform**.
*   **GitOps**: Continuous deployment managed by **Argo CD** for maintaining cluster state.

## 🛠️ Tech Stack

### Application
*   **Frontend**: React (Vite), Axios, React Router
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB
*   **Authentication**: JWT, Bcryptjs

### DevOps & Infrastructure
*   **Version Control**: Git & GitHub
*   **CI/CD**: GitHub Actions
*   **Containerization**: Docker & Docker Compose
*   **Orchestration**: Kubernetes (K8s)
*   **IaC**: Terraform
*   **GitOps**: Argo CD

## 📂 Directory Structure

```bash
Food-reels/
├── backend/            # Node.js/Express Backend
├── frontend/           # React/Vite Frontend
├── docker-compose.yml  # Local development setup
└── README.md           # Project Documentation
```

## 🏃‍♂️ Getting Started (Local Development)

To run the application locally using Docker Compose:

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Food-reels
    ```

2.  **Environment Setup**
    *   Ensure you have `docker` and `docker-compose` installed.
    *   Create a `.env` file in `backend/` if required (refer to `backend/package.json` or source code for required variables like `MONGO_URI`).

3.  **Run with Docker Compose**
    ```bash
    docker-compose up --build
    ```

    This will start:
    *   **Frontend**: Accessible at `http://localhost:5173`
    *   **Backend**: Accessible at `http://localhost:3000`
    *   **MongoDB**: Running on port `27017`

## 🚧 Roadmap

- [x] Basic MERN Application Setup
- [x] Docker & Docker Compose Configuration
- [ ] GitHub Actions CI Pipeline (Build & Test)
- [ ] Kubernetes Manifests & Deployment
- [ ] Terraform Scripts for Cloud Provisioning
- [ ] Argo CD Integration for GitOps
- [ ] Monitoring & Logging (Prometheus/Grafana)

## 🤝 Contributing

As this is a learning project, suggestions and contributions are welcome! Please feel free to submit a Pull Request or open an issue.
>>>>>>> 5eae663 (Added readme file)
