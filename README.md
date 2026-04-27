# KafkaTSProducer

A lightweight TypeScript producer for Apache Kafka, powered by **Bun** and **kafkajs**. This project provides a simple web interface and API to push both raw strings and structured JSON events (User objects) into a Kafka topic.

## Overview

This producer is designed to work in tandem with the [KafkaJavaConsumer](https://github.com/andreasschrottenbaum/KafkaJavaConsumer). It demonstrates how to send messages to Kafka using modern JavaScript/TypeScript tools and serves as a data source for testing consumer resiliency and business logic.

## Features

- **High Performance**: Built on Bun's fast runtime.
- **REST API**: Simple endpoints to trigger Kafka messages.
- **JSON Event Generation**: Automatically generates randomized `User` objects (matching the Java Record structure).
- **Static Frontend**: Includes a basic UI to send messages directly from the browser.

## Prerequisites

- **Bun** installed (`curl -fsSL https://bun.sh/install | bash`).
- **Apache Kafka** instance running and accessible.

## Configuration

The producer needs to know the location of your Kafka broker. Update the connection settings in `kafkaProducer.ts` (or the respective initialization file):

```typescript
const kafka = new Kafka({
  clientId: "bun-producer",
  brokers: ["YOUR_KAFKA_IP:9092"],
});
```

## Project Structure

```
├── static
│   └── index.html        // Frontend for manual testing
├── index.ts              // Main entry point (Bun server & routes)
├── kafkaProducer.ts      // KafkaJS client configuration
├── package.json
└── tsconfig.json
```

## API Endpoints

- `POST /api/newMessage`: Sends a custom string payload to a specified topic.
- `GET /api/sendJSON`: Generates a randomized User object (ID, names, birthDate, trustLevel, lastSeen) and sends it to the test-events topic.

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
   curl http://localhost:3000/api/sendJSON
   ```

## License

MIT
