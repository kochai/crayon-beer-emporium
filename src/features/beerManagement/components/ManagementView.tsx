import {FC, useEffect} from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';

import {useBeerManagementStore} from '../store/beerManagementStore';

import TopSalesChart from './TopSalesChart';
import AddBeerForm from './AddBeerForm';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import ErrorMessage from '../../../shared/ErrorMessage';
import Header from '../../../shared/Header';

import {buttonBaseClasses, buttonSizeClasses, buttonVariantClasses} from '../../../shared/Button';

const ManagementView: FC = () => {
    const {topSellingBeers, loading, error, addBeer, fetchTopSellingBeers} = useBeerManagementStore();

    useEffect(() => {
        fetchTopSellingBeers();
    }, [fetchTopSellingBeers]);

    if (loading) return <LoadingSpinner/>;

    if (error) return <ErrorMessage message={error}/>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Header text="Beer Management" className="flex-row justify-between mb-4">
                <Link
                    to="/"
                    className={clsx([
                        'flex items-center text-center',
                        buttonBaseClasses,
                        buttonVariantClasses.primary,
                        buttonSizeClasses.medium
                    ])}
                    aria-label="Back to beer catalog"
                >
                    Back to Catalog
                </Link>
            </Header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Top 10 Selling Beers</h3>
                    <TopSalesChart data={topSellingBeers}/>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Add New Beer</h3>
                    <AddBeerForm onSubmit={addBeer}/>
                </div>
            </div>
        </div>
    );
};

export default ManagementView;