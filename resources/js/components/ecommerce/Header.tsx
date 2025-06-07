import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP,FaShoppingCart,FaChevronDown } from 'react-icons/fa';
import { User, Search, Menu } from 'lucide-react';
import {
    FaBars, FaChevronRight, FaLaptop, FaMobileAlt,
    FaTshirt, FaHome, FaFutbol, FaBaby
} from 'react-icons/fa';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [categoryOpen, setcategoryOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const categories = [
        {
            label: 'Electronics',
            icon: <FaLaptop className="mr-3 text-indigo-500" />,
            subcategories: [
                {
                    label: 'Smartphones',
                    icon: <FaMobileAlt className="mr-3 text-indigo-500" />,
                    subcategories: [
                        { label: 'Android Phones' },
                        { label: 'iPhones' },
                        { label: 'Accessories' },
                    ],
                },
                { label: 'Laptops' },
                { label: 'Cameras' },
                { label: 'Audio' },
            ],
        },
        { label: 'Fashion', icon: <FaTshirt className="mr-3 text-indigo-500" /> },
        { label: 'Home & Garden', icon: <FaHome className="mr-3 text-indigo-500" /> },
        { label: 'Sports & Outdoors', icon: <FaFutbol className="mr-3 text-indigo-500" /> },
        { label: 'Baby & Kids', icon: <FaBaby className="mr-3 text-indigo-500" /> },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const CategoryItem = ({ item }) => {
        const [open, setOpen] = useState(false);
        return (
            <div className="relative group">
                <div
                    onClick={() => setOpen(!open)}
                    className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                    <div className="flex items-center">
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                    {item.subcategories && <FaChevronRight className="text-xs" />}
                </div>

                {item.subcategories && open && (
                    <div className="absolute left-full top-0 w-64 bg-white shadow-lg rounded-md z-50">
                        {item.subcategories.map((subItem, i) =>
                            subItem.subcategories ? (
                                <CategoryItem key={i} item={subItem} />
                            ) : (
                                <div
                                    key={i}
                                    className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    {subItem.label}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <div className="bg-gray-800 text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link href="#" className="hover:opacity-80" aria-label="Facebook">
                            <FaFacebookF className="h-6 w-6 text-[#1877F2]" />
                        </Link>
                        <Link href="#" className="hover:opacity-80" aria-label="Twitter">
                            <FaTwitter className="h-6 w-6 text-[#1DA1F2]" />
                        </Link>
                        <Link href="#" className="hover:opacity-80" aria-label="Instagram">
                            <FaInstagram className="h-6 w-6 text-[#E4405F]" />
                        </Link>
                        <Link href="#" className="hover:opacity-80" aria-label="Pinterest">
                            <FaPinterestP className="h-6 w-6 text-[#BD081C]" />
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                className="flex items-center space-x-1 hover:text-gray-300"
                            >
                                <span>USD</span>
                                <FaChevronDown className="h-3 w-3"/>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </button>
                            {isCurrencyOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden z-50">
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">USD - US Dollar</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">EUR - Euro</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">GBP - British</Link>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className="flex items-center space-x-1 hover:text-gray-300"
                            >
                                <span>English</span>
                                <FaChevronDown className="h-3 w-3"/>
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
                            <User className="h-5 w-5"/>
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
                                <Search/>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative hover:text-indigo-600 text-gray-900"
                            >
                                <FaShoppingCart className="h-6 w-6"/>
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
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center text-black px-4 py-3  hover:text-indigo-600"
                            >
                                <FaBars className="mr-2" />
                                <span>All Categories</span>
                                <FaChevronDown className="ml-2 text-xs" />
                            </button>

                            {isOpen && (
                                <div className="absolute left-0 w-64 text-black bg-white shadow-lg rounded-b-md z-50">
                                    {categories.map((cat, i) => (
                                        <CategoryItem key={i} item={cat} />
                                    ))}
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
