import * as dotenv from "dotenv";
import app from ".";
import { createConnection } from "./config/database";
import { natsWrapper } from "./nats.wrapper";

app.set("PORT", process.env.PORT || 5000);

dotenv.config();

async function start() {
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );

    // natsWrapper.client.on("close", () => {
    //   console.log("NATS connection closed");
    //   process.exit();
    // });
    // process.on("SIGINT", () => natsWrapper.client.close());
    // process.on("SIGTERM", () => natsWrapper.client.close());

    await createConnection("db.json");
  } catch (error) {
    console.log(error);
  }
}

app.listen(app.get("PORT"), () => {
  start();
  console.log(`Listening on port ${app.get("PORT")}`);
});
