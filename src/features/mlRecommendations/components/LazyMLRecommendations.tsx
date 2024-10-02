import {FC, lazy} from 'react';
import LazyFeature from '../../../shared/LazyFeature';

const MLRecommendations = lazy(() => import('./MLRecommendations'));

const LazyMLRecommendations: FC = () => {
    return (
        <LazyFeature
            featureFlag="USE_ML_RECOMMENDATIONS"
            component={MLRecommendations}
        />
    )
}

export default LazyMLRecommendations;