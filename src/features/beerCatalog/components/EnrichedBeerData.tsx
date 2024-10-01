import {FC} from 'react';
import {EnrichedBeerDataLazyProps} from './EnrichedBeerDataLazy';

const EnrichedBeerData: FC<EnrichedBeerDataLazyProps> = ({beer, variant}) => {
    if (variant === 'card') {
        return (
            <>
                {beer.abv && <p className="text-sm text-gray-600 mb-2">ABV: {beer.abv}%</p>}
                {beer.brand && <p className="text-sm text-gray-600 mb-2">Brand: {beer.brand}</p>}
                {beer.style && <p className="text-sm text-gray-600 mb-2">Style: {beer.style}</p>}
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
            {renderDetailItem('ABV', beer.abv ? `${beer.abv}%` : undefined)}
            {renderDetailItem('Brand', beer.brand)}
            {renderDetailItem('Style', beer.style)}
        </>
    );
};

export default EnrichedBeerData;