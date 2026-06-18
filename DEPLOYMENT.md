# Docker Deployment Guide

## Prerequisites

- Docker Desktop installed
- Docker Compose installed

## Project Structure

invoice-generator/
├── frontend/
├── backend/
├── mysql-init/
│ └── init.sql
└── docker-compose.yml

## Start Application

```bash
docker compose up -d
```

## Stop Application

```bash
docker compose down
```

## Remove Containers and Volumes

```bash
docker compose down -v
```

## View Running Containers

```bash
docker ps
```

## View Backend Logs

```bash
docker logs -f invoice_backend
```

## View MySQL Logs

```bash
docker logs -f invoice_mysql
```

## Database Access

```bash
docker exec -it invoice_mysql mysql -u root -p123456789 invoice_db
```

## Features

- React Frontend
- Node.js + Express Backend
- MySQL Database
- Docker Compose Deployment
- Automatic Table Creation using init.sql
- Persistent Database Storage using Docker Volumes
