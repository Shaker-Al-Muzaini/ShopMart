
import { Link } from '@inertiajs/react';
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white pt-16 pb-6">
            <div className="container mx-auhref px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link href="#" className="text-2xl font-bold text-white mb-4 block"
                        >ShopMart</Link
                        >
                        <p className="text-gray-400 mb-6">
                            ShopMart offers a wide range of high-quality products at
                            competitive prices. We're committed href providing an exceptional
                            shopping experience with fast shipping and excellent cushrefmer
                            service.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="#"
                                className="bg-gray-700 hover:bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link
                                href="#"
                                className="bg-gray-700 hover:bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            >
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link
                                href="#"
                                className="bg-gray-700 hover:bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            >
                                <i className="fab fa-instagram"></i>
                            </Link>
                            <Link
                                href="#"
                                className="bg-gray-700 hover:bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            >
                                <i className="fab fa-youtube"></i>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Home
                                </Link>

                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Shop</Link>

                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Products</Link>

                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >About Us</Link>

                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Contact</Link>

                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Blog</Link>

                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Cushrefmer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >My Account</Link
                                >
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Order Hishrefry</Link
                                >
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Wishlist</Link
                                >
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Returns</Link
                                >
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >FAQs</Link
                                >
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >Terms & Conditions</Link
                                >
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <i className="fas fa-map-marker-alt mt-1 mr-3 text-indigo-500"></i>
                                <span className="text-gray-400"
                                >1234 Market St, Suite 900<br />San Francisco, CA 94103</span
                                >
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-phone-alt mr-3 text-indigo-500"></i>
                                <span className="text-gray-400">+1 (800) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-envelope mr-3 text-indigo-500"></i>
                                <span className="text-gray-400">info@shopmart.com</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-clock mr-3 text-indigo-500"></i>
                                <span className="text-gray-400">Mon-Fri: 9AM - 6PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="border-gray-700 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 mb-4 md:mb-0">
                        © 2025 ShopMart. All Rights Reserved.
                    </p>
                    <div className="flex space-x-6">
                        <img src="./images/payement-4.png" alt="Payment" className="h-8" />
                        <img src="./images/payment-3.png" alt="Payment" className="h-8" />
                        <img src="./images/payment-2.png" alt="Payment" className="h-8" />
                        <img src="./images/payment-1.png" alt="Payment" className="h-8" />
                    </div>
                </div>
            </div>
        </footer>

    );
}
