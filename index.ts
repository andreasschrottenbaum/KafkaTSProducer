import { producer } from "./kafkaProducer";

let counter = 0;

const server = Bun.serve({
  routes: {
    "/": Bun.file("./static/index.html"),

    "/api/newMessage": async (req) => {
      await producer.connect();

      const data = await req.formData();

      const topic = data.get("topic")?.toString() || "";
      const key = data.get("key")?.toString() || "";
      const value = data.get("payload")?.toString() || "";

      await producer.send({ topic, messages: [{ key, value }] });

      return Response.redirect("/");
    },
    "/api/sendJSON": async () => {
      const rndDateInt = Math.floor(Math.random() * new Date().getTime());
      const rndDate = new Date(rndDateInt);

      counter++;

      const user = {
        id: crypto.randomUUID(),
        firstName: "Test Object",
        lastName: counter.toString(),
        birthDate: rndDate.toISOString().split("T")[0],
        trustLevel: Math.floor(Math.random() * 10),
        lastSeen: new Date().toISOString(),
      };

      await producer.connect();
      await producer.send({
        topic: "test-events",
        messages: [{ key: "user", value: JSON.stringify(user) }],
      });

      return new Response("ok");
    },
  },

  fetch(req) {
    if (req.url.includes("/static/")) {
      const filenameArr = req.url.split("/static/");

      return new Response(Bun.file("./static/" + filenameArr[1]));
    }

    return new Response("Not Found!");
  },
});

console.log(`Server running at http://${server.hostname}:${server.port}`);
