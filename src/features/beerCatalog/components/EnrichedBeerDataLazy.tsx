import {FC, lazy} from 'react';
import {Beer} from '../../../types/Beer';
import LazyFeature from '../../../shared/LazyFeature';
import {FEATURES} from '../../../config/featureFlags';

export interface EnrichedBeerDataLazyProps {
    beer: Beer;
    variant: 'card' | 'details';
}

const EnrichedBeerData = lazy(() => import('./EnrichedBeerData'));

export const EnrichedBeerDataLazy: FC<EnrichedBeerDataLazyProps> = (props) => (
    <LazyFeature
        featureFlag={FEATURES.DATA_ENRICHMENT}
        component={EnrichedBeerData}
        {...props}
    />
);

export default EnrichedBeerDataLazy;