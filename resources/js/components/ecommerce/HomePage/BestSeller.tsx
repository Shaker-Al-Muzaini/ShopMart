import { usePage } from '@inertiajs/react';
import ProductCard from '@/components/ecommerce/HomePage/ProductCard';
import { ProductListItem } from '@/types';
import React from 'react';

export default function BestSeller() {
    const { best_SellingProducts } = usePage().props as any;

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-black text-2xl font-bold">Best Sellers</h2>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">
                        View All
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {best_SellingProducts.length > 0 ? (
                        best_SellingProducts.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-500">
                            No best selling products available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
