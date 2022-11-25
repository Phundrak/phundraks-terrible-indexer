import { defineStore } from 'pinia';
import { Client, Account, type Models } from 'appwrite';

const client = new Client()
  .setEndpoint('https://appwrite.phundrak.com/v1')
  .setProject('637ebacf9bdcce6efe69');
const account = new Account(client);

export const useAppwriteStore = defineStore('appwrite', {
  state: () => {
    return {
      client: client,
      account: account,
      session: {} as Models.Session,
    };
  },
  actions: {
    authentificate(email: string, password: string) {
      const promise = this.account.createEmailSession(email, password);
      promise.then(
        (response) => (this.session = response),
        (error) => console.log(error)
      );
    },
    disconnect() {
      const promise = account.deleteSession(this.session.$id);
      promise.then(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    },
    disconnectAll() {
      const promise = account.deleteSessions();
      promise.then(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    },
    makeEmailRecovery(email: string, url: string) {
      const promise = account.createRecovery(email, url);
      promise.then(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    },
  },
});
