import cors from "cors";
import Undefined from "./utils";
import bodyParser from "body-parser";
import controller from "./controller";
import express, { Router } from "express";

const undefined = new Undefined();

const router = Router();
const app = express();

app.use(cors());
app.use(bodyParser.json());

controller(router);

app.use("/api", router);

const PORT = undefined.config.api.port || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

Undefined.db().then(() => console.log("Database connection was successful"));

export default undefined;
