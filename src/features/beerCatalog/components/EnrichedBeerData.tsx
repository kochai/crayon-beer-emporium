import {FC} from 'react';
import {EnrichedBeerDataLazyProps} from './EnrichedBeerDataLazy';
import {isEnhancedBeer} from '../../../shared/utils/enrichBeerData';

const EnrichedBeerData: FC<EnrichedBeerDataLazyProps> = ({beer, variant}) => {
    if (variant === 'card') {
        return (
            <>
                {isEnhancedBeer(beer) && <p className="text-sm text-gray-600 mb-2">ABV: {beer.abv}%</p>}
                {isEnhancedBeer(beer) && <p className="text-sm text-gray-600 mb-2">Brand: {beer.brand}</p>}
                {isEnhancedBeer(beer) && <p className="text-sm text-gray-600 mb-2">Style: {beer.style}</p>}
            </>
        );
    }

    const renderDetailItem = (label: string, value: string | number | undefined) => {
        if (value === undefined) return null;
        return (
            <div>
                <span className="text-gray-500">{label}: </span>
                <span className="font-bold" aria-label={label}>{value}</span>
            </div>
        );
    };

    return (
        <>
            {isEnhancedBeer(beer) && renderDetailItem('ABV', beer.abv ? `${beer.abv}%` : undefined)}
            {isEnhancedBeer(beer) && renderDetailItem('Brand', beer.brand)}
            {isEnhancedBeer(beer) && renderDetailItem('Style', beer.style)}
        </>
    );
};

export default EnrichedBeerData;