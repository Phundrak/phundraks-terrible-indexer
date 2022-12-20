import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { Client, Account, type Models } from "appwrite";
let client = new Client()
  .setEndpoint("https://appwrite.phundrak.com/v1")
  .setProject("637ebacf9bdcce6efe69");
let account = new Account(client);

export const useAppwrite = defineStore("appwrite", () => {
  const appwrite = ref({
    client: client,
    account: account,
  });

  const session = ref({} as Models.Session);

  const status = ref({
    loading: false,
    error: {} as any,
  });

  if (localStorage.getItem("session")) {
    session.value = JSON.parse(localStorage.getItem("session") || "");
  }

  const connected = computed(() => session.value.$id);

  watch(
    session,
    (sessionVal) => {
      localStorage.setItem("session", JSON.stringify(sessionVal));
    },
    { deep: true }
  );

  const logout = async () => {
    status.value.loading = true;
    const promiseSession = appwrite.value.account.getSession("current");
    promiseSession.then(
      (response) => {
        console.log(`Deleting session ${response.$id}`);
        const promiseDeleteSession = appwrite.value.account.deleteSession(
          response.$id
        );
        promiseDeleteSession.then(
          (response) => {
            console.log(`Logout: Server answered: ${response}`);
            session.value = {} as Models.Session;
            console.info("Logout: Logged out!");
            console.log(session.value);
          },
          (e) => console.log("Logout:", e)
        );
      },
      (e) => console.log("Logout:", e)
    );
  };

  const login = async (email: string, password: string) => {
    status.value.loading = true;
    const promise = appwrite.value.account.createEmailSession(email, password);
    promise.then(
      (response) => {
        status.value.loading = false;
        session.value = response;
        console.info("Logged in!");
        console.log(session.value);
      },
      (e) => {
        status.value.loading = false;
        console.info("Error");
        status.value.error = e;
        console.log(status.value.error);
      }
    );
  };

  return {
    appwrite,
    session,
    status,
    connected,
    logout,
    login,
  };
});
