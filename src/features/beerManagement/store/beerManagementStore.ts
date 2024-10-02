import {create} from 'zustand';

import {BeerWithSales} from '../../../types/Beer';
import {fetchBeersWithSales} from '../api/addSalesCount';

interface BeerManagementState {
    topSellingBeers: BeerWithSales[];
    loading: boolean;
    error: string | null;
    addBeer: (beer: Omit<BeerWithSales, 'id'>) => void;
    fetchTopSellingBeers: () => Promise<void>;
}

export const useBeerManagementStore = create<BeerManagementState>((set) => ({
    topSellingBeers: [],
    loading: false,
    error: null,

    addBeer: (newBeer) => {
        // TODO: Add API call to update data on BE
        set(state => ({
            topSellingBeers: [...state.topSellingBeers, {...newBeer, id: Date.now(), salesCount: 0}]
        }));
    },

    fetchTopSellingBeers: async () => {
        set({loading: true, error: null});
        try {
            const allBeers = await fetchBeersWithSales();
            const sortedBeers = allBeers.sort((a, b) => b.salesCount - a.salesCount);
            const topTenBeers = sortedBeers.slice(0, 10);
            set({topSellingBeers: topTenBeers, loading: false});
        } catch (error) {
            console.error('Error fetching top selling beers:', error);
            set({error: 'Failed to fetch top selling beers. Please try again later.', loading: false});
        }
    }
}));