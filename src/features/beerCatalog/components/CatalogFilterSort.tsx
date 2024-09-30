import {FC} from 'React';
import Select from '../../../shared/Select';

type SortOption = 'name' | 'price' | 'rating';

interface CatalogSortingAndFilterProps {
    sortBy: SortOption;
    setSortBy: (option: SortOption) => void;
}

const sortOptions = [
    {value: 'name', label: 'Name'},
    {value: 'price', label: 'Price'},
    {value: 'rating', label: 'Rating'},
];

const CatalogSortingAndFilter: FC<CatalogSortingAndFilterProps> = ({
                                                                       sortBy,
                                                                       setSortBy,
                                                                   }) => (
    <div className="mb-4">
        <Select
            id="sort-select"
            label="Sort by:"
            value={sortBy}
            onChange={(value) => setSortBy(value as SortOption)}
            options={sortOptions}
        />
    </div>
);

export default CatalogSortingAndFilter;