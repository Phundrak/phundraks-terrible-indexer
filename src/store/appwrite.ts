import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { Client, Account, type Models } from "appwrite";
import { useRouter } from "vue-router";

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

  const endpoint = ref({} as string);

  const router = useRouter();

  if (localStorage.getItem("session")) {
    session.value = JSON.parse(localStorage.getItem("session") || "");
  }
  if (localStorage.getItem("endpoint")) {
    endpoint.value = JSON.parse(localStorage.getItem("endpoint") || "");
  }

  watch(
    session,
    (sessionVal) => {
      localStorage.setItem("session", JSON.stringify(sessionVal));
    },
    { deep: true }
  );

  watch(
    endpoint,
    (endpointVal) => {
      localStorage.setItem("endpoint", JSON.stringify(endpointVal));
    },
    { deep: true }
  );

  const setEndpoint = (newEndpoint: string) => {
    console.log(`Setting endpoint to ${newEndpoint}`);
    endpoint.value = newEndpoint.endsWith("/")
      ? newEndpoint.substring(0, newEndpoint.length - 1)
      : newEndpoint;
    console.log(`Set to ${endpoint.value}`);
  };

  const connected = computed(() => session.value.$id);

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
            console.debug(`Logout: Server answered: ${response}`);
            session.value = {} as Models.Session;
            console.info("Logout: Logged out!");
            console.debug(session.value);
            router.push({ path: "/" });
          },
          (e) => console.debug("Error logging out:", e)
        );
      },
      (e) => console.debug("Error logging out:", e)
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
    endpoint,
    setEndpoint,
    connected,
    logout,
    login,
  };
});
