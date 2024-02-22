import { Schema, model } from "mongoose";

const userAuthSchema = new Schema(
    {
        email: { type: String, required: true },
        name: { type: String, default: "", required: true },
        token: { type: String, required: true, unique: true },
        surname: { type: String, default: "", required: true },
        password: { type: String, required: true, default: "123456789" },
        telephone: { type: String, required: true, default: "1234567890" },
    },
    { versionKey: false }
);

export const userAuthModel = model("userAuth", userAuthSchema);
