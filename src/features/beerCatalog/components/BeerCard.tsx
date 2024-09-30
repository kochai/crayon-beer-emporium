import {FC, useState} from 'react';
import {Link} from 'react-router-dom';

import {Beer} from '../types/Beer';

interface BeerCardProps {
    beer: Beer;
    onBuy?: (beer: Beer) => void;
}

const BeerCard: FC<BeerCardProps> = ({beer, onBuy}) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };
    return (
        <div
            className="bg-white rounded-lg border shadow-md overflow-hidden h-full">
            <div className="flex p-4 h-full items-center">
                <div className="flex-shrink-0 w-20 h-28 mr-4">
                    {
                        imageError ? (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded"
                                 aria-label="No image available">
                                <span className="text-gray-400 text-xs text-center">No Image</span>
                            </div>
                        ) : (
                            <img
                                src={beer.image}
                                alt={`${beer.name} bottle`}
                                className="w-full h-full object-contain rounded"
                                onError={handleImageError}
                            />
                        )
                    }
                </div>
                <div className="flex-grow flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-1 line-clamp-2 h-12 leading-6">{beer.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">Price: {beer.price}</p>
                        <div className="flex items-center mb-2"
                             aria-label={`Rating: ${beer.rating.average.toFixed(1)} out of 5 stars, based on ${beer.rating.reviews} reviews`}>
                            <span className="text-yellow-500 mr-1 text-sm not-sr-only" aria-hidden="true">★</span>
                            <span className="text-sm font-medium not-sr-only">{beer.rating.average.toFixed(1)}</span>
                            <span className="text-gray-500 text-xs ml-1 not-sr-only">({beer.rating.reviews})</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <Link
                            to={`/beer/${beer.id}`}
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-300 text-sm"
                            aria-label={`View details for ${beer.name}`}
                        >
                            Details
                        </Link>
                        <button
                            onClick={() => onBuy && onBuy(beer)}
                            className="bg-gray-700 hover:bg-gray-800 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-300"
                            aria-label={`Buy ${beer.name}`}
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeerCard;