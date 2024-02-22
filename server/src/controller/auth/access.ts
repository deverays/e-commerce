import jwt from "jsonwebtoken";

import Config from "../../interfaces/config";
const config: Config = require("../../../config.json");

/**
 * @type {string}
 */
const secretKey: string = config.secret.access_token;

/**
 *
 * @param user
 */
const generateAccessToken = (user: object) => {
    const accessToken = jwt.sign(user, secretKey);

    return accessToken;
};

/**
 *
 * @param token
 */
const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, secretKey);

        return decoded;
    } catch (error) {
        return false;
    }
};

export { generateAccessToken, verifyAccessToken };
