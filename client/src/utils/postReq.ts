import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

/**
 * 
 * @param method 
 * @param param1 
 */
const postReq = async (
    /**entered method */
    method: string,
    /**data */
    { url, data }: { url: string; data?: object }
) => {
    /**@ts-ignore */
    return await axios(VITE_BASE_URL + url, {
        method,
        data,
    })
        /**@ts-ignore */
        .then((response) => {
            /**return */
            return response;
        })
};

export { postReq };
