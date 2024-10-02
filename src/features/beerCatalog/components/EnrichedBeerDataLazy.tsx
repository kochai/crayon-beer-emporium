import {FC, lazy} from 'react';
import {Beer, BeerEnhancedData} from '../../../types/Beer';
import LazyFeature from '../../../shared/LazyFeature';

export interface EnrichedBeerDataLazyProps {
    beer: Beer | BeerEnhancedData;
    variant: 'card' | 'details';
}

const EnrichedBeerData = lazy(() => import('./EnrichedBeerData'));

export const EnrichedBeerDataLazy: FC<EnrichedBeerDataLazyProps> = (props) => (
    <LazyFeature
        featureFlag="DATA_ENRICHMENT"
        component={EnrichedBeerData}
        {...props}
    />
);

export default EnrichedBeerDataLazy;