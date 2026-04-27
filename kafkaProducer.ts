import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  brokers: ["172.28.166.143:9092"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

export { producer };
