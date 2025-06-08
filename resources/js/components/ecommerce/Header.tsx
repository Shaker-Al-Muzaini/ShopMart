import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaShoppingCart, FaChevronDown, FaBars, FaChevronRight } from 'react-icons/fa';
import { User, Search } from 'lucide-react';

export default function Header() {
    const { parentCategories } = usePage().props;

    const [open, setOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // ✅ تحويل التصنيفات إلى شكل هرمي مناسب
    const transformCategory = (category) => ({
        label: category.name,
        icon: (
            <img
                src={category.image || '/default-category.png'}
                alt={category.name}
                className="w-5 h-5 mr-2 inline-block object-cover rounded"
            />
        ),
        subcategories: category.children?.length
            ? category.children.map(transformCategory)
            : [],
    });

    // ✅ جهّز التصنيفات للاستخدام
    const categories = parentCategories.map(transformCategory);

    // ✅ مكون لعرض تصنيف فردي مع القائمة الفرعية إن وجدت
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
                    {item.subcategories && item.subcategories.length > 0 && (
                        <FaChevronRight className="text-xs" />
                    )}
                </div>

                {item.subcategories && open && (
                    <div className="absolute left-full top-0 w-64 bg-white shadow-lg rounded-md z-50">
                        {item.subcategories.map((subItem, i) => (
                            subItem.subcategories && subItem.subcategories.length > 0 ? (
                                <CategoryItem key={i} item={subItem} />
                            ) : (
                                <div
                                    key={i}
                                    className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        {subItem.icon}
                                        <span>{subItem.label}</span>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* شريط التواصل الاجتماعي واللغة والعملات */}
            <div className="bg-gray-800 text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link href="#"><FaFacebookF className="h-6 w-6 text-[#1877F2]" /></Link>
                        <Link href="#"><FaTwitter className="h-6 w-6 text-[#1DA1F2]" /></Link>
                        <Link href="#"><FaInstagram className="h-6 w-6 text-[#E4405F]" /></Link>
                        <Link href="#"><FaPinterestP className="h-6 w-6 text-[#BD081C]" /></Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="flex items-center space-x-1 hover:text-gray-300">
                                <span>USD</span>
                                <FaChevronDown className="h-3 w-3" />
                            </button>
                            {isCurrencyOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md z-50">
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">USD - US Dollar</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">EUR - Euro</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">GBP - British Pound</Link>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="flex items-center space-x-1 hover:text-gray-300">
                                <span>English</span>
                                <FaChevronDown className="h-3 w-3" />
                            </button>
                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md z-50">
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">English</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Français</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Español</Link>
                                </div>
                            )}
                        </div>

                        <Link href="#" className="hover:text-gray-300 flex items-center space-x-1">
                            <User className="h-5 w-5" />
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* رأس الصفحة الرئيسي */}
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
                                <Search />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative hover:text-indigo-600 text-gray-900">
                                <FaShoppingCart className="h-6 w-6" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                            </button>

                            {isCartOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md z-50">
                                    <div className="p-4 border-b">
                                        <h3 className="font-medium">Cart Summary (2 items)</h3>
                                    </div>
                                    {/* منتجات مزيفة للعرض */}
                                    <div className="p-4">
                                        <p>Demo cart item here</p>
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

            {/* قائمة التنقل */}
            <nav className="bg-white shadow">
                <div className="container mx-auto px-4">
                    <div className="flex">
                        {/* القائمة المنسدلة للتصنيفات */}
                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center text-black px-4 py-3 hover:text-indigo-600"
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

                        {/* روابط التنقل */}
                        <ul className="flex">
                            <li><Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Home</Link></li>
                            <li><Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Shop</Link></li>
                            <li><Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">New Arrivals</Link></li>
                            <li><Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Deals</Link></li>
                            <li><Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Blog</Link></li>
                            <li><Link href="#" className="flex items-center px-4 py-3 text-gray-700 hover:text-indigo-600">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
