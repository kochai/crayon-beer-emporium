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