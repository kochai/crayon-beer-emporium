export const FEATURES = {
    SHOW_BEER_DETAILS: 'SHOW_BEER_DETAILS',
    USE_ML_RECOMMENDATIONS: 'USE_ML_RECOMMENDATIONS',
    DATA_ENRICHMENT: 'DATA_ENRICHMENT',
};

export const isFeatureEnabled = (feature: string): boolean => {
    /*
     * TODO: Move enabled features to be a Kubernetes ConfigMap or a remote config service or through a Node.js process
     */
    const enabledFeatures = [
        FEATURES.SHOW_BEER_DETAILS,
        FEATURES.DATA_ENRICHMENT,
    ];
    return enabledFeatures.includes(feature);
};