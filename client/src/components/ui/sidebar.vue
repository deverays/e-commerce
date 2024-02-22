<template>
    <div :id="direction" :class="sidebarClasses"
        class="shadow-lg shadow-kaisen-200 fixed top-0 h-screen max-md:w-screen md:w-[400px] bg-kaisen-200 transition-all overflow-x-hidden flex flex-col justify-start">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import imports from "@/utils/imports";

const { computed } = imports();

const props = defineProps({
    direction: String,
    isOpen: Boolean,
});

const sidebarClasses = computed(() => ({
    "opacity-100 pointer-events-auto": props.isOpen,
    "opacity-0 pointer-events-none": !props.isOpen,
    "-translate-x-20": props.direction === "left" && !props.isOpen,
    "translate-x-20": props.direction === "right" && !props.isOpen,
    "left-0 md:rounded-r-2xl": props.direction === "left",
    "right-0 md:rounded-l-2xl": props.direction === "right",
}));
</script>
