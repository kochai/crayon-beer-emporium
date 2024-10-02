/*
 * TODO: Move enabled features to be a Kubernetes ConfigMap or a remote config service or through a Node.js process
 */
export const APP_CONFIG = {
    API_URL: 'https://api.sampleapis.com',
    UI_CONFIG: {
        ITEMS_PER_PAGE: 20,
        RTL: false,
    },
};

export type AppConfig = keyof typeof APP_CONFIG;
