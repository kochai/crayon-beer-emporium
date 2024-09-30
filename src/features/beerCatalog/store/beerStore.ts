import {create} from 'zustand';
import {Beer} from '../types/Beer';
import {fetchBeers} from "../api/beerCatalogApi";

type SortOption = 'name' | 'price' | 'rating';

interface BeerCatalogState {
    beers: Beer[];
    loading: boolean;
    error: string | null;
    sortBy: SortOption;
    fetchBeers: () => Promise<void>;
    setSortBy: (option: SortOption) => void;
    getSortedBeers: () => Beer[];
    handleBuy: (beer: Beer) => void;
}

export const useBeerCatalogStore = create<BeerCatalogState>((set, get) => ({
    beers: [],
    loading: false,
    error: null,
    sortBy: 'name',

    fetchBeers: async () => {
        set({loading: true, error: null});
        try {
            const data = await fetchBeers();
            set({beers: data, loading: false});
        } catch (error) {
            console.error('Error fetching beers:', error);
            set({error: 'Failed to fetch beers. Please try again later.', loading: false});
        }
    },

    setSortBy: (option) => set({sortBy: option}),

    getSortedBeers: () => {
        const {beers, sortBy} = get();
        return [...beers].sort((a, b) => {
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
    },

    handleBuy: (beer) => {
        alert(`Bought beer ${beer.name} with ID: ${beer.id}`);
    },
}));