import {FC, FormEvent, useState} from 'react';
import Button from '../../../shared/Button';
import InputWithLabel from '../../../shared/InputWithLabel';
import {BeerWithSales} from '../../../types/Beer';

interface AddBeerFormProps {
    onSubmit: (beer: Omit<BeerWithSales, 'id'>) => void;
}

const AddBeerForm: FC<AddBeerFormProps> = ({onSubmit}) => {
    const [newBeer, setNewBeer] = useState<Omit<BeerWithSales, 'id'>>({
        name: '',
        brand: '',
        style: '',
        abv: 0,
        price: '',
        image: '',
        rating: {average: 0, reviews: 0},
        details: '',
        salesCount: 0
    });

    const handleChange = (field: keyof Omit<BeerWithSales, 'id'>) => (value: string) => {
        setNewBeer(prev => ({...prev, [field]: field === 'abv' ? parseFloat(value) : value}));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(newBeer);
        setNewBeer({
            name: '',
            brand: '',
            style: '',
            abv: 0,
            price: '',
            image: '',
            rating: {average: 0, reviews: 0},
            details: '',
            salesCount: 0
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-12">
            <InputWithLabel
                id="name"
                label="Name"
                value={newBeer.name}
                onChange={handleChange('name')}
                required
            />
            <InputWithLabel
                id="brand"
                label="Brand"
                value={newBeer.brand}
                onChange={handleChange('brand')}
                required
            />
            <InputWithLabel
                id="style"
                label="Style"
                value={newBeer.style}
                onChange={handleChange('style')}
                required
            />
            <InputWithLabel
                id="abv"
                label="ABV"
                type="number"
                value={newBeer.abv.toString()}
                onChange={handleChange('abv')}
                step="0.1"
                required
            />
            <InputWithLabel
                id="price"
                label="Price"
                value={newBeer.price}
                onChange={handleChange('price')}
                required
            />
            <InputWithLabel
                id="image"
                label="Image URL"
                type="url"
                value={newBeer.image}
                onChange={handleChange('image')}
                required
            />
            <div className="flex flex-col">
                <label htmlFor="details" className="mb-1 text-sm font-medium text-gray-700">Details</label>
                <textarea
                    id="details"
                    value={newBeer.details}
                    onChange={(e) => handleChange('details')(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <Button type="submit">
                Add Beer
            </Button>
        </form>
    );
};

export default AddBeerForm;