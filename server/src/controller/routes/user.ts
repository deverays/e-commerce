import type { Response, Request } from "express";

import { userAuthModel } from "../../models/userAuth";
import { generateAccessToken, verifyAccessToken } from "../auth/access";

/**
 *
 * @param req
 * @param res
 */
const user_get = async (req: Request, res: Response) => {
    if (!req.query)
        return res.json({
            success: false,
            message: "Query is not found",
            code: 506,
        });

    const { token } = req.query as { token: string };
    if (!token) return res.json({ success: false });

    const data = verifyAccessToken(token);

    if (!data)
        return res.json({
            success: false,
            message: "Data is not found",
            code: 506,
        });

    res.json({ success: true, data, code: 201 });
};

/**
 *
 * @param req
 * @param res
 */
const login_get = async (req: Request, res: Response) => {
    if (!req.query)
        return res.json({
            success: false,
            message: "Query is not found",
            code: 506,
        });

    const { email, password } = req.query as { email: string; password: string };
    if (!(email || password)) return res.json({ success: false });

    const userAuth = await userAuthModel.findOne({ email }).catch((err) => err);
    if (!userAuth)
        return res.json({
            success: false,
            message: "User is not found",
            code: 506,
        });

    if (userAuth.password !== password)
        return res.json({ success: false, message: "Invalid password", code: 400 });

    res.json({ success: true, userAuth, code: 201 });
};

/**
 *
 * @param req
 * @param res
 */
const register_get = async (req: Request, res: Response) => {
    if (!req.query)
        return res.json({
            success: false,
            message: "Query is not found",
            code: 506,
        });

    const { name, surname, email, password } = req.query as {
        name: string;
        surname: string;
        email: string;
        password: string;
    };
    if (!(name || surname || email || password))
        return res.json({ success: false });

    const userAuth = await userAuthModel.findOne({ email }).catch((err) => err);
    if (userAuth)
        return res.json({
            success: false,
            message: "User is found",
            code: 404,
        });

    const token = generateAccessToken({
        name,
        surname,
        email,
        password,
    });

    await userAuthModel
        .findOneAndUpdate(
            { token },
            { $set: { name, surname, email, password } },
            { upsert: true }
        )
        .catch((err) => err);

    res.json({ success: true, userAuth, code: 201 });
};

export { user_get, login_get, register_get };
