import {create} from 'zustand';
import {Beer, BeerEnhancedData} from '../../../shared/types/Beer';
import {fetchBeers} from '../api/beerCatalogApi';
import {isEnhancedBeer} from '../../../shared/utils/enrichBeerData';

export type SortKey = 'name' | 'brand' | 'style' | 'abv' | 'price';
type SortOrder = 'asc' | 'desc';

interface Filters {
    brand: string;
    style: string;
    minAbv: number;
    maxAbv: number;
    minPrice: number;
    maxPrice: number;
}

type BeerType = Beer | BeerEnhancedData;

interface BeerCatalogState<T extends BeerType> {
    beers: T[];
    loading: boolean;
    error: string | null;
    sortKey: SortKey;
    sortOrder: SortOrder;
    filters: Filters;
    fetchBeers: () => Promise<void>;
    setSortKey: (key: SortKey) => void;
    setSortOrder: (order: SortOrder) => void;
    setFilter: (key: keyof Filters, value: string | number) => void;
    resetFilters: () => void;
    getSortedAndFilteredBeers: () => T[];
    handleBuy: (beer: T) => void;
}

export const beerStyles = ['IPA', 'Stout', 'Lager', 'Pale Ale', 'Porter'];
export const breweries = ['Hoppy Brewers', 'Malt Masters', 'Craft Kings'];

const initialFilters: Filters = {
    brand: '',
    style: '',
    minAbv: 0,
    maxAbv: 100,
    minPrice: 0,
    maxPrice: 1000,
};

export const useBeerCatalogStore = create<BeerCatalogState<BeerType>>((set, get) => ({
    beers: [],
    loading: false,
    error: null,
    sortKey: 'name',
    sortOrder: 'asc',
    filters: initialFilters,

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

    setSortKey: (key) => set({sortKey: key}),
    setSortOrder: (order) => set({sortOrder: order}),

    setFilter: (key, value) => set((state) => ({
        filters: {...state.filters, [key]: value}
    })),

    resetFilters: () => {
        set({filters: initialFilters, sortKey: 'name', sortOrder: 'asc'});
    },

    getSortedAndFilteredBeers: () => {
        const {beers, sortKey, sortOrder, filters} = get();

        const filteredBeers = beers.filter(beer => {
            const price = parseFloat(beer.price.slice(1));
            if (price < filters.minPrice || price > filters.maxPrice) {
                return false;
            }

            if (isEnhancedBeer(beer)) {
                return (
                    beer.brand.toLowerCase().includes(filters.brand.toLowerCase()) &&
                    beer.style.toLowerCase().includes(filters.style.toLowerCase()) &&
                    beer.abv >= filters.minAbv && beer.abv <= filters.maxAbv
                );
            }

            return true;
        });

        return filteredBeers.sort((a, b) => {
            if (sortKey === 'abv' || sortKey === 'brand' || sortKey === 'style') {
                if (isEnhancedBeer(a) && isEnhancedBeer(b)) {
                    return sortOrder === 'asc'
                        ? (a[sortKey] as string).localeCompare(b[sortKey] as string)
                        : (b[sortKey] as string).localeCompare(a[sortKey] as string);
                }
                return isEnhancedBeer(a) ? -1 : 1;
            }

            return sortOrder === 'asc'
                ? a[sortKey].localeCompare(b[sortKey])
                : b[sortKey].localeCompare(a[sortKey]);
        });
    },

    handleBuy: (beer) => {
        alert(`Bought beer ${beer.name} with ID: ${beer.id}`);
    },
}));