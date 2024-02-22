import { client } from "@/main";
import { postReq } from "./postReq";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch, watchEffect, onMounted, onUnmounted } from "vue";

export const redirect = ({ href }: { href: string }) => {
    window.location.href = href;
};

export default () => {
    const router = useRouter();
    const route = useRoute();

    return {
        route,
        router,
        client,
        onMounted,
        onUnmounted,
        ref,
        computed,
        watch,
        watchEffect,
        postReq,
        redirect,
    };
};
