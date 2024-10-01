export interface Beer {
    id: number;
    name: string;
    price: string;
    image: string;
    rating: {
        average: number;
        reviews: number;
    };
    // Optional currently due to possible release in v1.23 of API
    style?: string;
    abv?: number;
    brand?: string;
    details?: string;
}