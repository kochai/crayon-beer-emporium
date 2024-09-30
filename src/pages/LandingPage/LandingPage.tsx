import {FC} from "React";
import {useEffect} from 'react';
import {useBeerCatalogStore} from '../../features/beerCatalog/store/beerStore';
import BeerCard from '../../features/beerCatalog/components/BeerCard';
import Header from '../../shared/Header';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorMessage from '../../shared/ErrorMessage';
import CatalogSortingAndFilter from '../../features/beerCatalog/components/CatalogFilterSort';

const LandingPage: FC = () => {
    const {
        loading,
        error,
        sortBy,
        fetchBeers,
        setSortBy,
        getSortedBeers,
        handleBuy
    } = useBeerCatalogStore();

    useEffect(() => {
        fetchBeers();
    }, [fetchBeers]);

    const sortedBeers = getSortedBeers();

    if (loading) {
        return (<LoadingSpinner/>);
    }

    if (error) {
        return (<ErrorMessage message={error}/>);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Header text="Our Beer Catalog">
                <CatalogSortingAndFilter sortBy={sortBy} setSortBy={setSortBy}/>
            </Header>
            <section aria-label="Beer catalog">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none">
                    {sortedBeers.map((beer) => (
                        <li key={beer.id} tabIndex={0}>
                            <BeerCard beer={beer} onBuy={handleBuy}/>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default LandingPage;