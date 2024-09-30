import {FC} from 'react';
import {beerStyles, breweries, SortKey, useBeerCatalogStore} from '../store/beerStore';

import Select from '../../../shared/Select';
import InputWithLabel from '../../../shared/InputWithLabel';

const BeerCatalogFilters: FC = () => {
    const {
        sortKey,
        sortOrder,
        filters,
        setSortKey,
        setSortOrder,
        setFilter,
        resetFilters
    } = useBeerCatalogStore();

    const sortOptions = [
        {value: 'name', label: 'Name'},
        {value: 'brand', label: 'Brand'},
        {value: 'style', label: 'Style'},
        {value: 'abv', label: 'ABV'},
        {value: 'price', label: 'Price'},
    ];

    return (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md border" role="region" aria-label="Beer catalog filters">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Select
                    id="sort-key"
                    className='flex-1'
                    label="Sort by"
                    value={sortKey}
                    onChange={(value) => setSortKey(value as SortKey)}
                    options={sortOptions}
                />
                <Select
                    id="sort-order"
                    className='flex-1'
                    label="Order"
                    value={sortOrder}
                    onChange={(value) => setSortOrder(value as 'asc' | 'desc')}
                    options={[
                        {value: 'asc', label: 'Ascending'},
                        {value: 'desc', label: 'Descending'},
                    ]}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Select
                    id="brand-filter"
                    className='flex-1'
                    label="Filter by Brand"
                    value={filters.brand}
                    onChange={(value) => setFilter('brand', value)}
                    options={[
                        {value: '', label: 'All Brands'},
                        ...breweries.map(brewery => ({value: brewery, label: brewery}))
                    ]}
                />
                <Select
                    id="style-filter"
                    className='flex-1'
                    label="Filter by Style"
                    value={filters.style}
                    onChange={(value) => setFilter('style', value)}
                    options={[
                        {value: '', label: 'All Styles'},
                        ...beerStyles.map(style => ({value: style, label: style}))
                    ]}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-4">
                <fieldset className="border p-2 rounded">
                    <legend className="text-sm font-medium text-gray-700">ABV Range</legend>
                    <div className="flex gap-2">
                        <InputWithLabel
                            id="min-abv"
                            wrapperClassName="flex-1"
                            label="Min ABV"
                            type="number"
                            value={filters.minAbv}
                            onChange={(value) => setFilter('minAbv', parseFloat(value))}
                            min={0}
                            max={13}
                            step={0.1}
                        />
                        <InputWithLabel
                            id="max-abv"
                            wrapperClassName="flex-1"
                            label="Max ABV"
                            type="number"
                            value={filters.maxAbv}
                            onChange={(value) => setFilter('maxAbv', parseFloat(value))}
                            min={0}
                            max={13}
                            step={0.1}
                        />
                    </div>
                </fieldset>
                <fieldset className="border p-2 rounded">
                    <legend className="text-sm font-medium text-gray-700">Price Range</legend>
                    <div className="flex gap-2">
                        <InputWithLabel
                            id="min-price"
                            wrapperClassName="flex-1"
                            label="Min Price"
                            type="number"
                            value={filters.minPrice}
                            onChange={(value) => setFilter('minPrice', parseFloat(value))}
                            min={0}
                            step={0.01}
                        />
                        <InputWithLabel
                            id="max-price"
                            wrapperClassName="flex-1"
                            label="Max Price"
                            type="number"
                            value={filters.maxPrice}
                            onChange={(value) => setFilter('maxPrice', parseFloat(value))}
                            min={0}
                            step={0.01}
                        />
                    </div>
                </fieldset>
            </div>
            <button
                onClick={resetFilters}
                className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white text-sm font-bold py-1 px-3 rounded transition-colors duration-300"
                aria-label="Reset all filters"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default BeerCatalogFilters;