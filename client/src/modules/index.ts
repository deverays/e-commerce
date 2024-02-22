import axios from "axios";
import { type i18n } from "i18next";
import * as tr from "../locales/tr.json"

class Client {
    token: string;

    isLogin: boolean;
    isAdmin: boolean;

    body: string;
    i18next: i18n;

    cart: {
        products: Array<any>
    }

    isUser: { name: string, surname: string, email: string, password: string, telephone: string }

    /**
     * 
     * @param param0 
     */
    constructor({ token, i18next, body }: { token: string, i18next: i18n, body: string }) {
        this.token = token;

        this.isLogin = false;
        this.isAdmin = false;

        this.body = body
        this.i18next = i18next

        this.cart = {
            products: []
        }

        this.isUser = { name: "", surname: "", email: "", password: "", telephone: "" }
    }

    /**
     * 
     * @param param0 
     */
    changeLanguage({ recent }: { recent: keyof { en: string; tr: string, de: string, fr: string } }) {
        this.i18next.changeLanguage(recent);
        localStorage.setItem("lng", recent);
    }

    changeTheme() {
        if (document.documentElement.classList.contains("dark"))
            localStorage.setItem("theme", "light"),
                document.documentElement.classList.remove("dark");
        else
            localStorage.setItem("theme", "dark"),
                document.documentElement.classList.add("dark");
    }

    /**
     * 
     * @param param0 
     */
    changeTitle({ name }: { name: string }) {
        const title = this.i18next.t(`titles.${name}`);

        if (name) document.title += ` ・ ${title ? title : "Error"}`;
    }

    async i18nextInstallation() {
        if (!(localStorage.lng || ["tr"].includes(localStorage.lng))) {
            localStorage.setItem("lng", "tr");
            this.i18next.changeLanguage("tr");
        }

        await this.i18next.init({
            lng: localStorage.lng,
            interpolation: {
                escapeValue: false,
            },
            fallbackLng: false,
            resources: {
                tr: { translation: tr },
            },
        })
    }

    themeInstallation() {
        if (!(localStorage.theme || ["dark", "light"].includes(localStorage.theme))) localStorage.setItem("theme", "dark"), document.body.classList.add("dark")

        for (const item of this.body.split(" ")) {
            document.body.classList.add(item)
        }

        if (localStorage.theme == "dark")
            document.documentElement.classList.add("dark")
        else
            document.documentElement.classList.remove("dark")
    }

    /**
     * 
     * @param param0 
     */
    async login({ email, password }: { email: string, password: string }) {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/login?email=${email}&password=${password}`)

        return response.data
    }

    /**
     * 
     * @param param0 
     */
    async register({ name, surname, email, password }: { name: string, surname: string, email: string, password: string }) {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/register?name=${name}&surname=${surname}&email=${email}&password=${password}`)

        return response.data
    }

    async user() {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user?token=${this.token}`)

        response.data.success ? (this.isLogin = true, this.isUser = response.data.data) : this.isLogin = false
    }
}

export { Client };
