import {FC, useEffect} from 'react';
import {useBeerDetailsStore} from '../store/beerDetailsStore';
import {useParams, Link} from 'react-router-dom';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import Header from '../../../shared/Header';
import ImagePlaceholder from '../../../shared/ImagePlaceholder';
import ErrorMessage from '../../../shared/ErrorMessage';
import Button, {buttonBaseClasses, buttonSizeClasses, buttonVariantClasses} from '../../../shared/Button';
import clsx from 'clsx';
import EnrichedBeerDataLazy from "../../beerCatalog/components/EnrichedBeerData";
import {isEnhancedBeer} from "../../../utils/enrichBeerData";

const BeerDetailsPage: FC = () => {
    const {id} = useParams<{ id: string }>();
    const {currentBeer, clearCurrentBeer, loading, error, fetchBeerById, handleBuy} = useBeerDetailsStore();

    useEffect(() => {
        if (id) {
            clearCurrentBeer();
            fetchBeerById(id);
        }

        return clearCurrentBeer();
    }, [id, fetchBeerById]);

    if (loading) return <LoadingSpinner/>;
    if (error) return <ErrorMessage message={error}/>;
    if (!currentBeer) return <div>No beer found</div>;

    const renderDetailItem = (label: string, value: string | number | undefined) => {
        if (value === undefined) return null;
        return (
            <div>
                <span className="text-gray-500">
                    {label}:&nbsp;
                </span>
                <span className="font-bold" aria-label={label}>
                    {value}
                </span>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Header text={currentBeer.name} className='flex-row justify-between'>
                <Link
                    to="/"
                    className={clsx([
                        'flex items-center text-center',
                        buttonBaseClasses,
                        buttonVariantClasses.primary,
                        buttonSizeClasses.medium
                    ])}
                    aria-label="Back to beer catalog"
                >
                    Back to Catalog
                </Link>
            </Header>

            <div className="mt-8 overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 relative">
                        <ImagePlaceholder
                            src={currentBeer.image}
                            alt={currentBeer.name}
                            className="h-64 w-full object-cover md:w-36"
                            placeholderClassName="h-64 w-full md:w-64 bg-gray-200 flex items-center justify-center"
                        />
                    </div>
                    <div className="p-8">
                        {renderDetailItem("ID", currentBeer.id)}
                        <EnrichedBeerDataLazy beer={currentBeer} variant="details"/>
                        {renderDetailItem("Price", currentBeer.price)}
                        <div className="mt-4">
                            <span className="text-gray-500">Rating: </span>
                            <span className="font-bold" aria-label="Average rating">
                                {currentBeer.rating.average.toFixed(1)}
                                <span className="text-sm text-gray-500">
                                    &nbsp;({currentBeer.rating.reviews} reviews)
                                </span>
                            </span>
                        </div>
                        {
                            isEnhancedBeer(currentBeer) && (
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold">
                                        Details:
                                    </h2>
                                    <p className="text-gray-600" aria-label="Beer description">
                                        {currentBeer.details}
                                    </p>
                                </div>
                            )
                        }
                        <Button
                            onClick={() => currentBeer && handleBuy(currentBeer)}
                            aria-label={`Buy ${currentBeer.name}`}
                            className='mt-4'
                        >
                            Buy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeerDetailsPage;