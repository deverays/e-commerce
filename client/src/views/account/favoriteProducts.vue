<template>
    <appHeader />

    <div class="transition-all flex h-screen">
        <leftSide />
        <div class="flex justify-center w-full max-lg:pt-32 lg:pt-40">Test</div>
    </div>
</template>

<script setup lang="ts">
import imports from "@/utils/imports";
import appHeader from "@/components/appHeader.vue";
import leftSide from "@/components/account/leftSide.vue";

const { client } = imports();
</script>
