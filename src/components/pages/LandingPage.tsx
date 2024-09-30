import {useState, useEffect, FC} from 'react';
import {useBeerStore} from '../../store/beerStore';
import {Beer} from '../../types/Beer';
import BeerCard from "../shared/BeerCard";
import Header from "../shared/Header";

type SortOption = 'name' | 'price' | 'rating';

const LandingPage: FC = () => {
    const {beers, setBeers} = useBeerStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('name');

    useEffect(() => {
        fetch('https://api.sampleapis.com/beers/ale')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Beer[]) => {
                setBeers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching beers:', error);
                setError('Failed to fetch beers. Please try again later.');
                setLoading(false);
            });
    }, [setBeers]);

    const sortedBeers = [...beers].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price':
                return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
            case 'rating':
                return b.rating.average - a.rating.average;
            default:
                return 0;
        }
    });

    const handleBuy = (beer: Beer) => {
        alert(`Bought beer ${beer.name} with ID: ${beer.id}`);
    };

    const handleSort = (option: SortOption) => {
        setSortBy(option);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
                     aria-label="Loading"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Header text='Our Beer Catalog'>
                <div className="mb-4">
                    <label htmlFor="sort-select" className="mr-2">Sort by:</label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value as SortOption)}
                        className="border rounded p-1"
                    >
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </Header>
            <section aria-label="Beer catalog">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none">
                    {sortedBeers.map((beer: Beer) => (
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