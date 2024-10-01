import {FC, lazy} from 'react';
import BaseBeerCatalogFilters from './BaseBeerCatalogFilters';
import LazyFeature from '../../../shared/LazyFeature';
import {useBeerCatalogStore} from '../store/beerCatalogStore';
import LoadingSpinner from '../../../shared/LoadingSpinner';

const EnrichedBeerCatalogFilters = lazy(() => import('./EnrichedBeerCatalogFilters'));

const BeerCatalogFilters: FC = () => {
    const {resetFilters} = useBeerCatalogStore();

    return (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md border" role="region" aria-label="Beer catalog filters">
            <BaseBeerCatalogFilters/>
            <LazyFeature
                featureFlag="DATA_ENRICHMENT"
                component={EnrichedBeerCatalogFilters}
                fallback={<LoadingSpinner/>}
            />
            <button
                onClick={resetFilters}
                className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-300"
                aria-label="Reset all filters"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default BeerCatalogFilters;