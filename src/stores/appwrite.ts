import { defineStore } from "pinia";
import { Client } from "appwrite";

export const useCounterStore = defineStore({
  id: "appwrite",
  state: () => ({
    client: new Client()
      .setEndpoint("https://appwrite.phundrak.com/v1")
      .setProject("637ebacf9bdcce6efe69"),
  }),
});
