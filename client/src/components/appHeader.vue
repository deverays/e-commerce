<template>
  <div class="fixed w-screen transition-all max-lg:py-7 z-50 lg:py-9 bg-kaisen-200">
    <div class="flex items-center">
      <div class="flex items-center space-x-2 absolute left-0 max-lg:pl-[5%] lg:pl-[10%]">
        <button @click="router.push({ path: '/' })"
          class="font-kaisen text-kaisen-600 opacity-70 max-sm:text-3xl max-lg:text-4xl lg:text-5xl">
          {{ VITE_PROJECT_TITLE }}
        </button>
      </div>

      <div class="absolute right-0 mt-1 max-lg:pr-[5%] lg:pr-[10%]">
        <div class="flex items-center space-x-4">
          <button class="transition-all hover:opacity-80">
            <svg class="text-gray-100 -mt-[5px]" stroke="currentColor" fill="currentColor" stroke-width="0"
              viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z">
              </path>
            </svg>
          </button>

          <button class="transition-all hover:opacity-80" @click="
            router.push({
              path: `/account${client.isLogin ? '' : `/login`}`,
              query: {
                redirectUrl: location.pathname,
              },
            })
            ">
            <svg class="-mt-[5px]" width="25px" height="25px" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                class="stroke-gray-100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <shoppingCart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imports from "@/utils/imports";
import shoppingCart from "./shared/shoppingCart.vue";

const { VITE_PROJECT_TITLE } = import.meta.env;
const { client, router, computed } = imports();

const location = computed(() => {
  return window.location;
});
</script>
