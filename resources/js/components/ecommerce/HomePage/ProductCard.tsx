import React from 'react';
import { ProductListItem } from '@/types';

interface ProductCardProps {
    product: ProductListItem;
}
const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
};


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="group overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="relative">
                <img
                    src={product.image.replace('localhost', '127.0.0.1:8000')}
                    alt="Product"
                    className="h-64 w-full object-cover"
                />
                {product.isDiscount && (
                    <div className="absolute top-0 right-0 m-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white">
                        {product.discount}
                    </div>
                )}

                <div className="absolute inset-0 z-20 flex items-center justify-center  bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button className="mx-2 rounded-full bg-white p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                        <i className="fas fa-shopping-cart"></i>
                    </button>
                    <button className="mx-2 rounded-full bg-white p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                        <i className="fas fa-heart"></i>
                    </button>
                    <button className="mx-2 rounded-full bg-white p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>

            <div className="p-4">
                <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                <p className="mb-3 text-sm text-gray-600">
                    {stripHtml(product.description).substring(0, 100)}...
                </p>

                <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-600">
                        ${product.price}
                        {product.isDiscount && (
                            <span className="ml-2 text-gray-400 line-through">
                                $119.99
                            </span>
                        )}
                    </span>
                    <div className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
