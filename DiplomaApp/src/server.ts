import * as dotenv from "dotenv";
import app from ".";
import { createConnection } from "./config/database";
import { TodoCompletedListener } from "./events/listener/todo.completed.listener";
import { natsWrapper } from "./nats.wrapper";

app.set("PORT", process.env.PORT || 3000);

dotenv.config();

async function start() {
  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID!,
    process.env.NATS_CLIENT_ID!,
    process.env.NATS_URL!
  );
  natsWrapper.client.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());

  new TodoCompletedListener(natsWrapper.client).listen();

  await createConnection("db.json");
}

app.listen(app.get("PORT"), () => {
  start();
  console.log(`Listening on port ${app.get("PORT")}`);
});
