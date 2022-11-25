<template>
  <transition name="fade">
    <div class="backdrop" @click.self="closeModal" v-if="showModal">
      <form
        method="post"
        accept="utf-8"
        @submit.prevent="login"
        class="rounded flex-col"
      >
        <h2>User Authentification</h2>
        <div class="container flex-col">
          <div class="flex-col-reversed top-margin box-sizizg-border">
            <input
              name="uname"
              type="email"
              v-model="email"
              placeholder="Email"
              required
            />
            <label for="uname">Email</label>
          </div>
          <div class="flex-col-reversed top-margin box-sizizg-border">
            <input
              name="psw"
              type="password"
              placeholder="Password"
              v-model="password"
              required
            />
            <label for="psw">Password</label>
          </div>
          <button type="submit" class="top-margin">Login</button>
          <label>
            <input name="remember" type="checkbox" checked="true" /> Remember me
          </label>
        </div>
        <div class="container flex-row flex-stretch top-margin gap-1rem">
          <button
            class="cancelbtn flex-v-centered"
            type="button"
            @click="closeModal"
          >
            Cancel
          </button>
          <button class="flex-v-centered" type="button">
            Forgot password?
          </button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAppwriteStore } from '@/stores/appwrite';
const store = useAppwriteStore();

const email = ref('');
const password = ref('');

defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits(['closeModal']);

function closeModal() {
  emit('closeModal');
}

function login() {
  console.log(`Logging in with ${email.value} and ${password.value}`);
  store.authentificate(email.value, password.value);
}
</script>

<style lang="less" scoped>
@import '@/assets/global.less';
@import 'node_modules/nord/src/lesscss/nord';

.side-margin {
  /* margin: 0 1rem; */
  margin-left: 1rem;
  margin-right: 1rem;
}

.top-margin {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.breathe {
  padding: 1rem 1.3rem;
}

label,
h2 {
  .side-margin();
  .default-font();
  .theme(color, @nord3, @nord5);
}

h2 {
  text-align: center;
  font-size: 2em;
}

input[type='email'],
input[type='password'] {
  .rounded();
  .breathe();
  width: 100%;
  display: inline-block;
  border: 1px solid @nord2;
  box-sizing: border-box;
}

button {
  .rounded();
  .breathe();
  .theme(background-color, @nord4, @nord3);
  .theme(color, @nord3, @nord5);
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }
}

.cancelbtn {
  .breathe();
  background-color: @nord11 !important;
  color: @nord6 !important;
}

.container {
  padding: 1.3rem;
  .rounded();
}

form {
  .theme(background-color, @nord4, @nord2);
  .blur-background();
  padding: 2rem;
  margin: 4rem auto;
  max-width: 600px;
}

.hide-label-no-placeholder(@name) {
  each(@name, {
        input[name="@{value}"] {
            & + label[for="@{value}"] {
                opacity: 0;
                transition: opacity @transition-medium ease;
            }

            &:not(:placeholder-shown) + label[for="@{value}"] {
                opacity: 1;
                transition: opacity @transition-medium ease;
            }
        }
    });
}

@hide-label-names: 'uname', 'psw';
.hide-label-no-placeholder(@hide-label-names);
</style>
