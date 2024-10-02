import {FC, useEffect} from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';

import {useBeerCatalogStore} from '../store/beerCatalogStore';

import BeerCard from './BeerCard';
import Header from '../../../shared/Header';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import ErrorMessage from '../../../shared/ErrorMessage';
import BeerCatalogFilters from './BeerCatalogFilters';
import {buttonBaseClasses, buttonSizeClasses, buttonVariantClasses} from '../../../shared/Button';
import LazyMLRecommendations from "../../mlRecommendations/components/LazyMLRecommendations";

const BeerCatalogPage: FC = () => {
    const {
        loading,
        error,
        fetchBeers,
        getSortedAndFilteredBeers,
        handleBuy
    } = useBeerCatalogStore();

    useEffect(() => {
        fetchBeers();
    }, [fetchBeers]);

    const sortedAndFilteredBeers = getSortedAndFilteredBeers();

    if (loading) return (<LoadingSpinner/>);

    if (error) return (<ErrorMessage message={error}/>);

    return (
        <div className="container mx-auto px-4 py-8">
            <Header text="Craft Beer Catalog" className="flex-row justify-between mb-4">
                <Link
                    to="/management"
                    className={clsx([
                        'flex items-center text-center',
                        buttonBaseClasses,
                        buttonVariantClasses.primary,
                        buttonSizeClasses.medium
                    ])}
                    aria-label="Go to management view"
                >
                    Beer Management
                </Link>
            </Header>
            <BeerCatalogFilters/>
            <section aria-label="Beer catalog">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none">
                    {sortedAndFilteredBeers.map((beer) => (
                        <li key={beer.id} tabIndex={0}>
                            <BeerCard beer={beer} onBuy={handleBuy}/>
                        </li>
                    ))}
                </ul>
            </section>
            <LazyMLRecommendations/>
        </div>
    );
};

export default BeerCatalogPage;