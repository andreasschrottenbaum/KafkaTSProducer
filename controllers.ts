import { producer } from "./kafkaProducer";

/**
 * @type {number} Tracking variable for user last names to ensure unique sequence.
 */
let counter = 0;

/**
 * Internal helper to dispatch messages to Kafka.
 * Handles connection lifecycle and value serialization.
 * @param {string} topic - The target Kafka topic.
 * @param {string} key - The message key for partitioning.
 * @param {any} value - The payload; objects will be automatically stringified.
 * @returns {Promise<void>}
 */
async function sendToKafka(topic: string, key: string, value: any) {
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      {
        key,
        value: typeof value === "string" ? value : JSON.stringify(value),
      },
    ],
  });
}

/**
 * HTTP Controller for handling manual plaintext messages.
 * Extracts data from FormData and routes it to the plaintext topic.
 * @param {Request} req - The incoming HTTP Request containing FormData.
 * @returns {Promise<Response>} JSON success response.
 */
export async function handlePlaintextMessage(req: Request) {
  const data = await req.formData();
  const key = data.get("key")?.toString() || "";
  const value = data.get("payload")?.toString() || "";

  await sendToKafka("plaintext-events", key, value);

  return Response.json({ success: true });
}

/**
 * HTTP Controller for generating automated JSON user events.
 * Creates a mock user object with a random birthdate and unique ID.
 * @returns {Promise<Response>} JSON success response.
 */
export async function handleJSONMessage() {
  const rndDateInt = Math.floor(Math.random() * new Date().getTime());

  const user = {
    id: crypto.randomUUID(),
    firstName: "Test Object",
    lastName: (++counter).toString(),
    birthDate: new Date(rndDateInt).toISOString().split("T")[0],
    trustLevel: Math.floor(Math.random() * 10),
    lastSeen: new Date().toISOString(),
  };

  await sendToKafka("user-events", "user", user);

  return Response.json({ success: true });
}
