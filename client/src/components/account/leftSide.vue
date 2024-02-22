<template>
    <!--Computer Menu-->
    <div
        class="max-lg:hidden bg-kaisen-200 w-[400px] h-screen pt-32 bg-opacity-80 shadow-3xl shadow-kaisen-200 flex justify-center rounded-r-2xl">
        <section>
            <div class="space-y-2 mb-4">
                <label class="text-gray-100 font-poppins-small text-xl">
                    {{ client.isUser.name }} {{ client.isUser.surname }}
                </label>
                <button @click="logout"
                    class="transition-all flex space-x-2 items-center text-kaisen-600 opacity-70 hover:opacity-100">
                    <span class="transition-all flex"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                            viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                                d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z">
                            </path>
                        </svg></span>
                    <span class="font-poppins-small text-md text-gray-100">{{
                        $t("accountLeftSide.logout")
                    }}</span>
                </button>
            </div>

            <div class="space-y-2 mb-2">
                <label for="account" class="font-poppins-small text-xl text-gray-100 opacity-90 flex pt-6">{{
                    $t("accountLeftSide.titles.account") }}</label>

                <hr class="opacity-20 rounded-full" />

                <button :class="{
                    'opacity-60 hover:opacity-100': location.pathname !== '/account',
                    'opacity-100 hover:opacity-80': location.pathname == '/account',
                }" @click="redirect({ path: '/account' })"
                    class="flex transition-all font-poppins-small text-gray-100 text-md">
                    {{ $t("accountLeftSide.items.account") }}
                </button>
                <button :class="{
                    'opacity-60 hover:opacity-100':
                        location.pathname !== '/account/addresses',
                    'opacity-100 hover:opacity-80':
                        location.pathname == '/account/addresses',
                }" @click="redirect({ path: '/account/addresses' })"
                    class="flex transition-all font-poppins-small text-gray-100 text-md">
                    {{ $t("accountLeftSide.items.myAddresses") }}
                </button>
                <button :class="{
                    'opacity-60 hover:opacity-100':
                        location.pathname !== '/account/favorite-products',
                    'opacity-100 hover:opacity-80':
                        location.pathname == '/account/favorite-products',
                }" @click="redirect({ path: '/account/favorite-products' })"
                    class="flex transition-all font-poppins-small text-gray-100 text-md">
                    {{ $t("accountLeftSide.items.favoriteProducts") }}
                </button>
            </div>

            <div class="space-y-2">
                <label for="account" class="font-poppins-small text-xl text-gray-100 opacity-90 flex pt-6">{{
                    $t("accountLeftSide.titles.orders") }}</label>

                <hr class="opacity-20 rounded-full" />

                <button :class="{
                    'opacity-60 hover:opacity-100':
                        location.pathname !== '/account/orders',
                    'opacity-100 hover:opacity-80':
                        location.pathname == '/account/orders',
                }" @click="redirect({ path: '/account/orders' })"
                    class="flex transition-all font-poppins-small text-gray-100 text-md">
                    {{ $t("accountLeftSide.items.orders") }}
                </button>
            </div>
        </section>
    </div>

    <!--Mobile Button-->
    <button @click="open" id="mobileMenuButton"
        class="lg:hidden absolute mt-[70px] ml-4 hover:opacity-80 rounded-md bg-kaisen-200 text-gray-100">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
        </svg>
    </button>
    <!--Mobile Menu-->
    <sidebar :is-open="isOpen" :direction="'left'" id="mobileMenu" :class="'lg:hidden backdrop-blur-sm bg-opacity-80 z-20 pl-[5%] pr-[5%] max-md:pt-[70px] md:flex md:justify-center'
        ">
        <div class="space-y-2 mb-4">
            <label class="text-gray-100 font-poppins-small text-2xl">
                {{ client.isUser.name }} {{ client.isUser.surname }}
            </label>
            <button @click="logout"
                class="transition-all flex space-x-2 items-center text-kaisen-600 opacity-70 hover:opacity-100">
                <span class="transition-all flex"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                        viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z">
                        </path>
                    </svg></span>
                <span class="font-poppins-small text-lg text-gray-100">{{
                    $t("accountLeftSide.logout")
                }}</span>
            </button>
        </div>

        <div class="space-y-2 mb-2">
            <label for="account" class="font-poppins-small text-2xl text-gray-100 opacity-90 flex pt-6">{{
                $t("accountLeftSide.titles.account") }}</label>

            <hr class="opacity-20 rounded-full" />

            <button :class="{
                'opacity-60 hover:opacity-100': location.pathname !== '/account',
                'opacity-100 hover:opacity-80': location.pathname == '/account',
            }" @click="redirect({ path: '/account' })"
                class="flex transition-all font-poppins-small text-gray-100 text-lg">
                {{ $t("accountLeftSide.items.account") }}
            </button>
            <button :class="{
                'opacity-60 hover:opacity-100':
                    location.pathname !== '/account/addresses',
                'opacity-100 hover:opacity-80':
                    location.pathname == '/account/addresses',
            }" @click="redirect({ path: '/account/addresses' })"
                class="flex transition-all font-poppins-small text-gray-100 text-lg">
                {{ $t("accountLeftSide.items.myAddresses") }}
            </button>
            <button :class="{
                'opacity-60 hover:opacity-100':
                    location.pathname !== '/account/favorite-products',
                'opacity-100 hover:opacity-80':
                    location.pathname == '/account/favorite-products',
            }" @click="redirect({ path: '/account/favorite-products' })"
                class="flex transition-all font-poppins-small text-gray-100 text-lg">
                {{ $t("accountLeftSide.items.favoriteProducts") }}
            </button>
        </div>

        <div class="space-y-2">
            <label for="account" class="font-poppins-small text-2xl text-gray-100 opacity-90 flex pt-6">{{
                $t("accountLeftSide.titles.orders") }}</label>

            <hr class="opacity-20 rounded-full" />

            <button :class="{
                'opacity-60 hover:opacity-100':
                    location.pathname !== '/account/orders',
                'opacity-100 hover:opacity-80':
                    location.pathname == '/account/orders',
            }" @click="redirect({ path: '/account/orders' })"
                class="flex transition-all font-poppins-small text-gray-100 text-lg">
                {{ $t("accountLeftSide.items.orders") }}
            </button>
        </div>
    </sidebar>
</template>

<script setup lang="ts">
import imports from "@/utils/imports";
import sidebar from "../ui/sidebar.vue";

const { client, computed, ref, router } = imports();

const isOpen = ref(false);

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
};

const open = () => {
    if (document.body.classList.contains("overflow-hidden"))
        document.body.classList.remove("overflow-hidden");
    else document.body.classList.add("overflow-hidden");

    isOpen.value = !isOpen.value;
};

const redirect = ({ path }: { path: string }) => {
    if (document.body.classList.contains("overflow-hidden"))
        document.body.classList.remove("overflow-hidden");
    else document.body.classList.add("overflow-hidden");

    isOpen.value = !isOpen.value;
    router.push({ path });
};

document.addEventListener("click", function (event) {
    const target = event.target as HTMLElement;
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuButton = document.getElementById("mobileMenuButton");

    if (
        !(mobileMenu?.contains(target) || mobileMenuButton?.contains(target)) &&
        isOpen.value
    ) {
        document.body.classList.remove("overflow-hidden");

        return (isOpen.value = false);
    }
});

const location = computed(() => {
    return window.location;
});
</script>
