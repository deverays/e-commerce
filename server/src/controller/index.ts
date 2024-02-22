export type Router = import("express").Router;

import { user_get, login_get, register_get } from "./routes/user";

export default (router: Router) => {
    router.get("/user", user_get);
    router.get("/login", login_get);
    router.get("/register", register_get);

    router.get("*", (req, res) =>
        res.status(404).json({ success: false, message: "API endpoint not found" })
    );
};
