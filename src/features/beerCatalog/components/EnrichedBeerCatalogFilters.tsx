import {FC} from 'react';
import {beerStyles, breweries, useBeerCatalogStore} from '../store/beerCatalogStore';
import Select from '../../../shared/Select';
import InputWithLabel from '../../../shared/InputWithLabel';

const EnhancedBeerCatalogFilters: FC = () => {
    const {filters, setFilter} = useBeerCatalogStore();

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Select
                    id="brand-filter"
                    className="flex-1"
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
                    className="flex-1"
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
                <fieldset className="border p-2 rounded contents sm:block">
                    <legend className="text-sm font-medium text-gray-700">ABV Range</legend>
                    <div className="flex gap-2">
                        <InputWithLabel
                            id="min-abv"
                            wrapperClassName="flex-1"
                            label="Min ABV"
                            type="number"
                            value={filters.minAbv}
                            onChange={(value) => setFilter('minAbv', parseFloat(value || "0"))}
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
                            onChange={(value) => setFilter('maxAbv', parseFloat(value || "0"))}
                            min={0}
                            max={13}
                            step={0.1}
                        />
                    </div>
                </fieldset>
            </div>
        </>
    );
};

export default EnhancedBeerCatalogFilters;