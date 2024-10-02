export const FEATURES = {
    USE_ML_RECOMMENDATIONS: 'USE_ML_RECOMMENDATIONS',
    DATA_ENRICHMENT: 'DATA_ENRICHMENT',
};
export type FeatureTypes = keyof typeof FEATURES;

export const isFeatureEnabled = (feature: string): boolean => {
    /*
     * TODO: Move enabled features to be a Kubernetes ConfigMap or a remote config service or through a Node.js process
     */
    const enabledFeatures = [
        FEATURES.DATA_ENRICHMENT,
        FEATURES.USE_ML_RECOMMENDATIONS
    ];
    return enabledFeatures.includes(feature);
};