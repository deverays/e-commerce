<template>
  <RouterView v-if="isLoaded" />
  <loading v-else />
</template>

<script setup lang="ts">
import imports from "./utils/imports";
import Loading from "./components/shared/loading.vue";
import { RouterView } from "vue-router";

const { client, ref } = imports();
const isLoaded = ref(false);

const App = async () => {
  await client.user();
  isLoaded.value = true;
};

client.themeInstallation();
client.i18nextInstallation();

if (localStorage.token) App();
else isLoaded.value = true;
</script>
