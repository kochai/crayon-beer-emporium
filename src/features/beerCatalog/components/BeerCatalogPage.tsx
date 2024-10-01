import {FC} from "React";
import {useEffect} from 'react';
import {useBeerCatalogStore} from '../store/beerCatalogStore';
import BeerCard from './BeerCard';
import Header from '../../../shared/Header';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import ErrorMessage from '../../../shared/ErrorMessage';
import BeerCatalogFilters from './BeerCatalogFilters';

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
            <Header text="Craft Beer Catalog">
                <BeerCatalogFilters />
            </Header>
            <section aria-label="Beer catalog">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none">
                    {sortedAndFilteredBeers.map((beer) => (
                        <li key={beer.id} tabIndex={0}>
                            <BeerCard beer={beer} onBuy={handleBuy}/>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default BeerCatalogPage;