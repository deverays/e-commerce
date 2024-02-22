export default interface Config {
    mongoose_url: string;
    api: {
        port: number;
    };
    secret: {
        refresh_token: string;
        access_token: string;
    };
}
