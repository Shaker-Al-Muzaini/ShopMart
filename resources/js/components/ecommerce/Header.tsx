import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [categoryOpen, setcategoryOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    return (
        <>
            <div className="bg-gray-800 text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link href="#" className="hover:text-gray-300"><i className="fab fa-facebook-f"></i></Link>
                        <Link href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></Link>
                        <Link href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></Link>
                        <Link href="#" className="hover:text-gray-300"><i className="fab fa-pinterest"></i></Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                className="flex items-center space-x-1 hover:text-gray-300"
                            >
                                <span>USD</span>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </button>
                            {isCurrencyOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50">
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">USD - US Dollar</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">EUR - Euro</Link>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className="flex items-center space-x-1 hover:text-gray-300"
                            >
                                <span>English</span>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </button>
                            {isLanguageOpen && (
                                <div
                                    onClick={() => setIsLanguageOpen(false)}
                                    className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50"
                                >
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">English</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Français</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Español</Link>
                                </div>
                            )}
                        </div>

                        <Link href="#" className="hover:text-gray-300 flex items-center space-x-1">
                            <i className="fas fa-user"></i>
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            </div>

            <header className="bg-white shadow-sm py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="#" className="text-2xl font-bold text-indigo-600">ShopMart</Link>

                    <div className="flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-indigo-600">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative hover:text-indigo-600"
                            >
                                <i className="fas fa-shopping-cart text-xl"></i>
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                            </button>

                            {isCartOpen && (
                                <div
                                    onClick={() => setIsCartOpen(false)}
                                    className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b">
                                        <h3 className="font-medium">Cart Summary (2 items)</h3>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        <div className="flex p-4 border-b">
                                            <img src="./images/p-1.jpg" alt="Product" className="w-16 h-16 rounded" />
                                            <div className="ml-4 flex-1">
                                                <h4 className="font-medium">Wireless Headphones</h4>
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-gray-600">1 × $89.99</p>
                                                    <button className="text-red-500 hover:text-red-700">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex p-4">
                                            <img src="./images/p-2.jpg" alt="Product" className="w-16 h-16 rounded" />
                                            <div className="ml-4 flex-1">
                                                <h4 className="font-medium">Smart Watch</h4>
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-gray-600">1 × $129.99</p>
                                                    <button className="text-red-500 hover:text-red-700">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t">
                                        <div className="flex justify-between mb-2">
                                            <span>Subtotal:</span>
                                            <span className="font-medium">$219.98</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link href="#" className="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded-md hover:bg-gray-300">View Cart</Link>
                                            <Link href="#" className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700">Checkout</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-700 hover:text-indigo-600">Login</Link>
                            <span className="text-gray-300">|</span>
                            <Link href="#" className="text-gray-700 hover:text-indigo-600">Register</Link>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="bg-white shadow">
                <div className="container mx-auto px-4">
                    <div className="flex">
                        {/* Categories Dropdown */}
                        <div className="relative group dropdown">
                            <button
                                onClick={() => setcategoryOpen(!categoryOpen)}
                                className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600 focus:outline-none"
                            >
                                <i className="fas fa-bars mr-2"></i>
                                <span>All Categories</span>
                                <i className="fas fa-chevron-down ml-2 text-xs"></i>
                            </button>
                            {categoryOpen && (
                                <div className="dropdown-menu absolute left-0 w-64 bg-white shadow-lg rounded-b-md z-50">
                                    {/* Category with subcategories */}
                                    <div className="relative nested-dropdown">
                                        <Link href="#" className="flex items-center justify-between px-4 py-3 hover:bg-gray-100">
                                            <div className="flex items-center">
                                                <i className="fas fa-laptop mr-3 text-indigo-500"></i>
                                                <span>Electronics</span>
                                            </div>
                                            <i className="fas fa-chevron-right text-xs"></i>
                                        </Link>
                                        <div className="nested-dropdown-menu absolute w-64 bg-white shadow-lg rounded-md">
                                            {/* Subcategory with more nested categories */}
                                            <div className="relative nested-dropdown">
                                                <Link href="#" className="flex items-center justify-between px-4 py-3 hover:bg-gray-100">
                                                    <div className="flex items-center">
                                                        <i className="fas fa-mobile-alt mr-3 text-indigo-500"></i>
                                                        <span>Smartphones</span>
                                                    </div>
                                                    <i className="fas fa-chevron-right text-xs"></i>
                                                </Link>
                                                <div className="nested-dropdown-menu absolute w-64 bg-white shadow-lg rounded-md">
                                                    <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Android Phones</Link>
                                                    <Link href="#" className="block px-4 py-3 hover:bg-gray-100">iPhones</Link>
                                                    <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Accessories</Link>
                                                </div>
                                            </div>
                                            <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Laptops</Link>
                                            <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Cameras</Link>
                                            <Link href="#" className="block px-4 py-3 hover:bg-gray-100">Audio</Link>
                                        </div>
                                    </div>
                                    {/* More categories */}
                                    <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <i className="fas fa-tshirt mr-3 text-indigo-500"></i>
                                        <span>Fashion</span>
                                    </Link>
                                    <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <i className="fas fa-home mr-3 text-indigo-500"></i>
                                        <span>Home & Garden</span>
                                    </Link>
                                    <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <i className="fas fa-futbol mr-3 text-indigo-500"></i>
                                        <span>Sports & Outdoors</span>
                                    </Link>
                                    <Link href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                                        <i className="fas fa-baby mr-3 text-indigo-500"></i>
                                        <span>Baby & Kids</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Main Menu */}
                        <ul className="flex">
                            <li>
                                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Home</Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Shop</Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">New Arrivals</Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Deals</Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Blog</Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
