<template>
    <appHeader />

    <Form>
        <h1 class="text-gray-100 text-4xl font-kaisen opacity-90">
            {{ VITE_PROJECT_TITLE }}
        </h1>
        <p class="text-gray-100 text-sm font-poppins opacity-50 mb-4 z-10">
            {{ $t("register.description", { title: VITE_PROJECT_TITLE }) }}
        </p>

        <div :class="errorsClass"
            class="transition-all font-poppins-small text-gray-100 bg-kaisen-600 bg-opacity-50 px-8 py-2 rounded-md mb-4">
            {{ $t("register.errors.account") }}
        </div>

        <form class="max-md:mb-6 md:mb-8 z-10">
            <div class="mb-4">
                <span class="block mb-2 text-sm font-poppins-small text-gray-100 opacity-90">{{ $t("register.name")
                }}</span>
                <input v-model="name" type="text" :placeholder="VITE_PROJECT_TITLE"
                    class="transition-all bg-kaisen-100 max-sm:w-full max-md:w-72 md:w-96 py-1 px-1 rounded-lg text-gray-100 font-poppins-small pl-2" />
            </div>
            <div class="mb-4">
                <span class="block mb-2 text-sm font-poppins-small text-gray-100 opacity-90">{{ $t("register.surname")
                }}</span>
                <input v-model="surname" type="text" :placeholder="VITE_PROJECT_TITLE"
                    class="transition-all bg-kaisen-100 max-sm:w-full max-md:w-72 md:w-96 py-1 px-1 rounded-lg text-gray-100 font-poppins-small pl-2" />
            </div>
            <div class="mb-4">
                <span class="block mb-2 text-sm font-poppins-small text-gray-100 opacity-90">{{ $t("register.email")
                }}</span>
                <input v-model="email" type="email" placeholder="name@gmail.com"
                    class="transition-all bg-kaisen-100 max-sm:w-full max-md:w-72 md:w-96 py-1 px-1 rounded-lg text-gray-100 font-poppins-small pl-2" />
            </div>
            <div class="mb-4">
                <span class="block mb-2 text-sm font-poppins-small text-gray-100 opacity-90">{{ $t("register.password")
                }}</span>
                <input v-model="password" type="password" placeholder="••••••••"
                    class="transition-all bg-kaisen-100 max-sm:w-full max-md:w-72 md:w-96 py-1 px-1 rounded-lg text-gray-100 font-poppins-small pl-2" />
            </div>
        </form>

        <button @click="register" :disabled="!submit" :class="submitClass"
            class="transition-all text-gray-100 px-6 py-2 rounded-lg bg-opacity-60 hover:bg-opacity-50 mb-4 z-10">
            {{ $t("register.submit") }}
        </button>

        <button @click="
            router.push({
                path: '/account/login',
                query: {
                    redirectUrl: route.query.redirectUrl,
                },
            })
            " class="font-poppins-small text-gray-100 z-10">
            <span class="opacity-60">{{ $t("register.login").split("?")[0] }}?</span><span>{{
                $t("register.login").split("?")[1] }}</span>
        </button>
    </Form>
</template>

<script setup lang="ts">
import Form from "@/components/ui/form.vue";
import imports from "@/utils/imports";
import appHeader from "../../components/appHeader.vue";

const { VITE_PROJECT_TITLE } = import.meta.env;
const {
    ref,
    watchEffect,
    computed,
    client,
    redirect,
    route,
    router,
} = imports();

if (client.isLogin) router.push({ path: "/" });

const name = ref("");
const email = ref("");
const surname = ref("");
const password = ref("");
const submit = ref(false);

const errors = ref({
    account: false,
});

watchEffect(() => {
    if (name.value.length < 3 || name.value.length > 20)
        return (submit.value = false);
    if (surname.value.length < 3 || surname.value.length > 30)
        return (submit.value = false);
    if (
        !(email.value.includes("@") || email.value.includes(".com")) ||
        email.value.length > 60 ||
        email.value.length < 8
    )
        return (submit.value = false);
    if (password.value.length > 20 || password.value.length < 8)
        return (submit.value = false);

    if (errors.value.account) return;

    submit.value = true;
});

const register = async () => {
    if (!submit.value) return;

    const response = await client.register({
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value,
    });

    if (!response.success) {
        errors.value.account = true;

        const timeout = window.setTimeout(() => {
            errors.value.account = false;

            window.clearTimeout(timeout);
        }, 5000);
    } else
        router.push({
            path: "/account/login",
            query: {
                redirectUrl: route.query.redirectUrl,
            },
        });
};

const errorsClass = computed(() => ({
    hidden: !errors.value.account,
}));

const submitClass = computed(() => ({
    "bg-kaisen-100": !submit.value,
    "bg-kaisen-600": submit.value,
}));
</script>
