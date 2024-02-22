import mongoose from "mongoose";
import { EventEmitter } from "stream";

import Config from "../interfaces/config";
const config = require("../../config.json");

class Undefined extends EventEmitter {
    config: Config;

    /**
     * @private
     */
    constructor() {
        super();

        this.config = config || false;
    }

    static async db() {
        await mongoose.connect(config.mongoose_url);
    }
}

export default Undefined;
