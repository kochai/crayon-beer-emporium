import { create } from 'zustand';
import { Beer } from '../types/Beer';

interface BeerState {
    beers: Beer[];
    setBeers: (beers: Beer[]) => void;
}
export const useBeerStore = create<BeerState>((set) => ({
    beers: [],
    setBeers: (beers) => set({ beers }),
}));