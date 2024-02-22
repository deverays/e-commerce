<template>
    <appHeader />

    <div class="flex h-screen">
        <leftSide />
        <div class="transition-all flex justify-center w-full max-md:mt-24 md:mt-32">
            <h1 class="text-gray-100 font-poppins-small text-2xl">
                {{ $t("account.title", { name: client.isUser.name }) }}
            </h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import imports from "@/utils/imports";
import appHeader from "@/components/appHeader.vue";
import leftSide from "@/components/account/leftSide.vue";

const { client } = imports();
</script>
