<template>
    <appHeader />

    <Form>
        <h1 class="text-gray-100 text-4xl font-kaisen opacity-90">
            {{ VITE_PROJECT_TITLE }}
        </h1>
        <p class="text-gray-100 text-sm font-poppins opacity-50 mb-4 z-10">
            {{ $t("login.description", { title: VITE_PROJECT_TITLE }) }}
        </p>

        <div :class="errorsClass"
            class="transition-all font-poppins-small text-gray-100 bg-kaisen-600 bg-opacity-50 px-8 py-2 rounded-md mb-4">
            {{ $t(`login.errors.${errors.account ? "account" : "password"}`) }}
        </div>

        <form class="max-md:mb-6 md:mb-8 z-10">
            <div class="mb-4">
                <span class="block mb-2 text-sm font-poppins-small text-gray-100 opacity-90">{{ $t("login.email") }}</span>
                <input v-model="email" type="email" placeholder="name@gmail.com"
                    class="transition-all bg-kaisen-100 max-sm:w-full max-md:w-72 md:w-96 py-1 px-1 rounded-lg text-gray-100 font-poppins-small pl-2" />
            </div>
            <div>
                <span class="block mb-2 text-sm font-poppins-small text-gray-100 opacity-90">{{ $t("login.password")
                }}</span>
                <input v-model="password" type="password" placeholder="••••••••"
                    class="transition-all bg-kaisen-100 max-sm:w-full max-md:w-72 md:w-96 py-1 px-1 rounded-lg text-gray-100 font-poppins-small pl-2" />
            </div>
        </form>

        <button @click="login" :disabled="!submit" :class="submitClass"
            class="transition-all text-gray-100 px-6 py-2 rounded-lg bg-opacity-60 hover:bg-opacity-50 mb-4 z-10">
            {{ $t("login.submit") }}
        </button>

        <button @click="
            router.push({
                path: '/account/register',
                query: {
                    redirectUrl: route.query.redirectUrl,
                },
            })
            " class="font-poppins-small text-gray-100 z-10">
            <span class="opacity-60">{{ $t("login.register").split("?")[0] }}?</span><span>{{
                $t("login.register").split("?")[1] }}</span>
        </button>
    </Form>
</template>

<script setup lang="ts">
import Form from "@/components/ui/form.vue";
import imports from "@/utils/imports";
import appHeader from "../../components/appHeader.vue";

const { VITE_PROJECT_TITLE } = import.meta.env;
const { ref, watchEffect, computed, client, route, router } = imports();

if (client.isLogin) router.push({ path: "/" });

const email = ref("");
const password = ref("");
const submit = ref(false);

const errors = ref({
    account: false,
    password: false,
});

watchEffect(() => {
    if (
        !(email.value.includes("@") || email.value.includes(".com")) ||
        email.value.length > 60 ||
        email.value.length < 8
    )
        return (submit.value = false);
    if (password.value.length > 20 || password.value.length < 8)
        return (submit.value = false);

    if (errors.value.account || errors.value.password) return;

    submit.value = true;
});

const login = async () => {
    if (!submit.value) return;

    const response = await client.login({
        email: email.value,
        password: password.value,
    });

    if (!response.success) {
        submit.value = false;

        response.code == 506
            ? ((errors.value.account = true), (errors.value.password = false))
            : ((errors.value.account = false), (errors.value.password = true));

        const timeout = window.setTimeout(() => {
            (errors.value.account = false), (errors.value.password = false);

            window.clearTimeout(timeout);
        }, 5000);
    } else {
        localStorage.setItem("token", response.userAuth.token);
        window.location.href = route.query.redirectUrl
            ? (route.query.redirectUrl as string)
            : "/";
    }
};

const errorsClass = computed(() => ({
    hidden: !(errors.value.account || errors.value.password),
}));

const submitClass = computed(() => ({
    "bg-kaisen-100": !submit.value,
    "bg-kaisen-600": submit.value,
}));
</script>
