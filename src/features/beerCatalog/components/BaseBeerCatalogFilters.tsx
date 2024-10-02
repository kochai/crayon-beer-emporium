import {FC} from 'react';
import {SortKey, useBeerCatalogStore} from '../store/beerCatalogStore';
import Select from '../../../shared/Select';
import InputWithLabel from '../../../shared/InputWithLabel';

const BaseBeerCatalogFilters: FC = () => {
    const {
        sortKey,
        sortOrder,
        filters,
        setSortKey,
        setSortOrder,
        setFilter
    } = useBeerCatalogStore();

    const sortOptions = [
        {value: 'name', label: 'Name'},
        {value: 'price', label: 'Price'},
    ];

    return (
        <div role="region" aria-label="Beer catalog filters">
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
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-4">
                <fieldset className="border p-2 rounded contents sm:block">
                    <legend className="text-sm font-medium text-gray-700">Price Range</legend>
                    <div className="flex gap-2 flex-col sm:flex-row">
                        <InputWithLabel
                            id="min-price"
                            wrapperClassName="flex-1"
                            label="Min Price"
                            type="number"
                            value={filters.minPrice}
                            onChange={(value) => setFilter('minPrice', parseFloat(value || "0"))}
                            min={0}
                            step={0.01}
                        />
                        <InputWithLabel
                            id="max-price"
                            wrapperClassName="flex-1"
                            label="Max Price"
                            type="number"
                            value={filters.maxPrice}
                            onChange={(value) => setFilter('maxPrice', parseFloat(value || "0"))}
                            min={0}
                            step={0.01}
                        />
                    </div>
                </fieldset>
            </div>
        </div>
    );
};

export default BaseBeerCatalogFilters;