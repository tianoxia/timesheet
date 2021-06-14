export interface IAppConfig {
    env: {
        name: string;
    };
    logging: {
        console: boolean;
        appInsights: boolean;
    };
    ad: {
        requireAuth: boolean;
        clientSecret: string;
        clientId: string;

    };
    apiServer: {
        baseUrl: string;
        timeoutInSeconds: number;
    };
}
