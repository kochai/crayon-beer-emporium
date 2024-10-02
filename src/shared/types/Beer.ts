export interface Beer {
    id: number;
    name: string;
    price: string;
    image: string;
    rating: {
        average: number;
        reviews: number;
    };
}

// Optional currently due to possible release in v1.23 of API
export interface BeerEnhancedData extends Beer {
    style: string;
    abv: number;
    brand: string;
    details: string;
}

export interface BeerWithSales extends BeerEnhancedData {
    salesCount: number;
}