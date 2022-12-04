import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://appwrite.phundrak.com/v1")
  .setProject("637ebacf9bdcce6efe69");
const account = new Account(client);

export { client, account };
