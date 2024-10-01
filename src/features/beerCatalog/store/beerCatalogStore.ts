import {create} from 'zustand';
import {Beer} from '../../../types/Beer';
import {fetchBeers} from '../api/beerCatalogApi';
import {FEATURES, isFeatureEnabled} from '../../../config/featureFlags';

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

interface BeerCatalogState {
    beers: Beer[];
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
    getSortedAndFilteredBeers: () => Beer[];
    handleBuy: (beer: Beer) => void;
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

export const useBeerCatalogStore = create<BeerCatalogState>((set, get) => ({
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
            set({beers: data, loading: false})
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
        set({filters: initialFilters});
        set({sortKey: 'name'});
        set({sortOrder: 'asc'});
    },

    getSortedAndFilteredBeers: () => {
        const {beers, sortKey, sortOrder, filters} = get();
        if (isFeatureEnabled(FEATURES.DATA_ENRICHMENT)) {
            return beers
                .filter(beer =>
                    beer.brand?.toLowerCase().includes(filters.brand.toLowerCase()) &&
                    beer.style?.toLowerCase().includes(filters.style.toLowerCase()) &&
                    beer.abv >= filters.minAbv && beer.abv <= filters.maxAbv &&
                    parseFloat(beer.price.slice(1)) >= filters.minPrice &&
                    parseFloat(beer.price.slice(1)) <= filters.maxPrice
                )
                .sort((a, b) => {
                    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
                    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
        }

        return beers
            .filter(beer =>
                parseFloat(beer.price.slice(1)) >= filters.minPrice &&
                parseFloat(beer.price.slice(1)) <= filters.maxPrice
            )
            .sort((a, b) => {
                if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
    },

    handleBuy: (beer) => {
        alert(`Bought beer ${beer.name} with ID: ${beer.id}`);
    },
}));