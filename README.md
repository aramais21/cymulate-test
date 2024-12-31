# Cymulate Test Task

This Nx workspace contains three applications:

- Two **NestJS** backend services: `phishing-simulation` and `phishing-attempt-manager`.
- One **Vite React** frontend application: `frontend`.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Applications Overview](#applications-overview)
4. [Running the Applications](#running-the-applications)
5. [Environment Files](#environment-files)
6. [Nx Commands](#nx-commands)
7. [Useful Links](#useful-links)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [Yarn](https://yarnpkg.com/) (version 1.22 or later)
- [Nx CLI](https://nx.dev/) (optional, for better development experience)

### Install Dependencies

After cloning the repository, run the following command to install all dependencies:

```bash
yarn install
```

---

## Project Structure

The repository is organized as follows:

```
/apps
  /phishing-simulation       # NestJS backend service for phishing simulations
  /phishing-attempt-manager  # NestJS backend service for managing phishing attempts
  /frontend                  # Vite React frontend application
/packages
  /backend
    /common                  # Shared libraries and utilities used across apps
/tools                       # Custom scripts or tools for the monorepo
nx.json                      # Nx workspace configuration
workspace.json               # Project-specific configuration
```

---

## Applications Overview

### Phishing Simulation

- **Type**: NestJS Backend
- **Purpose**: Simulates phishing scenarios for testing and training purposes.
- **Location**: `apps/phishing-simulation`

### Phishing Attempt Manager

- **Type**: NestJS Backend
- **Purpose**: Manages and tracks phishing attempts, including results and metrics.
- **Location**: `apps/phishing-attempt-manager`

### Frontend

- **Type**: Vite React Frontend
- **Purpose**: Provides a web interface for visualizing phishing data and managing configurations.
- **Location**: `apps/frontend`

---

## Running the Applications

### Using Nx CLI

You can serve each app individually using Nx commands:

#### Serve `phishing-simulation` (NestJS backend):

```bash
yarn nx serve phishing-simulation
```

#### Serve `phishing-attempt-manager` (NestJS backend):

```bash
yarn nx serve phishing-attempt-manager
```

#### Serve `frontend` (Vite React frontend):

```bash
yarn nx serve frontend
```

### Running All Applications Together

To serve all applications simultaneously, use:

```bash
yarn nx run-many --target=serve --all
```

---

## Environment Files

Each project within the monorepo has its own `.env.example` file that contains a template for the required environment variables. To set up the environment variables for each application:

1. Navigate to the respective project folder (e.g., `apps/phishing-simulation`, `apps/phishing-attempt-manager`, or `apps/frontend`).
2. Duplicate the `.env.example` file and rename it to `.env`.
3. Update the values in the `.env` file as needed for your local or production environment.

Ensure that the correct environment variables are configured before running or deploying the applications.

---

## Nx Commands

Nx provides a set of powerful commands for managing the monorepo:

### Build Applications

```bash
yarn nx build <app-name>
```

### Lint Applications

```bash
yarn nx lint <app-name>
```

### Run Tests

```bash
yarn nx test <app-name>
```

### Affected Commands

For optimized builds and tests:

```bash
yarn nx affected:build
yarn nx affected:test
yarn nx affected:lint
```

---

## Useful Links

- **Nx Documentation**: [https://nx.dev](https://nx.dev)\
  Comprehensive guide for managing monorepos and using Nx CLI efficiently.

- **Nodemailer Gmail Setup Documentation**: [https://nodemailer.com/usage/using-gmail/](https://nodemailer.com/usage/using-gmail/)\
  Step-by-step instructions to configure Gmail for sending emails via Nodemailer.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

