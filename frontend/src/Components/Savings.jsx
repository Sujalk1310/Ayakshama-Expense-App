import React from 'react';
import Categories from './Categories';
import CategoryCard from './CategoryCard';

const SavingsPage = () => {
    const data = {
        category: 'Total',
        spend: 1000,
        limit: 1000,
    };

    return (
        <div className="min-h-screen bg-gray-900 overflow-auto">
            <h1 className="text-center text-white font-bold text-2xl mt-6 mb-0">Total</h1>
            <div className="grid grid-cols-3 gap-8 m-8 mb-0 mt-0">
                {/* Empty divs to create the grid layout */}
                <div className="col-span-1" />
                <div className="col-span-1 flex justify-center items-center">
                    <CategoryCard {...data} />
                </div>
                <div className="col-span-1" />
            </div>
            <h1 className="text-center text-white font-bold text-2xl mb-4">Categories wise</h1>
            <div className="mx-auto">
                <Categories />
            </div>
        </div>
    );
};

export default SavingsPage;
