# KafkaTSProducer

A lightweight TypeScript producer for Apache Kafka, powered by **Bun** and **kafkajs**. This project provides a simple web interface and API to push both raw strings and structured JSON events (User objects) into a Kafka topic.

## Overview

This producer is designed to work in tandem with the [KafkaJavaConsumer](https://github.com/andreasschrottenbaum/KafkaJavaConsumer). It demonstrates how to send messages to Kafka using modern JavaScript/TypeScript tools and serves as a data source for testing consumer resiliency and business logic.

## Features

- **High Performance**: Built on Bun's fast runtime.
- **REST API**: Simple endpoints to trigger Kafka messages via `fetch`.
- **JSON Event Generation**: Automatically generates randomized `User` objects (matching the Java Record structure).
- **Static Frontend**: Includes a clean UI with `<fieldset>` groupings to send messages without page reloads.

## Prerequisites

- **Bun** installed (`curl -fsSL https://bun.sh/install | bash`).
- **Apache Kafka** instance running and accessible.

## Configuration

The producer needs to know the location of your Kafka broker. Update the connection settings in `kafkaProducer.ts`:

```typescript
const kafka = new Kafka({
  brokers: ["YOUR_KAFKA_IP:9092"],
});
```

## Project Structure

```
├── static/
│   ├── index.html       // Frontend UI
│   ├── style.css        // Clean CSS Grid layout
│   └── client.js        // Frontend logic (AJAX/Fetch)
├── index.ts             // Main entry point & Native Bun Router
├── controllers.ts       // HTTP Request Handling & Business Logic
├── kafkaProducer.ts     // KafkaJS client configuration
├── package.json
└── tsconfig.json
```

## API Endpoints

- `POST /api/newMessage`: Sends a custom string payload (FormData) to the `plaintext-events` topic.
- `GET /api/sendJSON`: Generates a randomized User object and sends it to the `user-events` topic.

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```
2. Start the producer:
   ```bash
   bun run index.ts
   ```
3. Access the UI at `http://localhost:3000` or trigger a JSON event via:
   ```bash
   curl -X POST http://localhost:3000/api/sendJSON
   ```

## License

MIT
