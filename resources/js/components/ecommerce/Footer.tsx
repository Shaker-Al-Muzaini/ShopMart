import { Link } from '@inertiajs/react';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock
} from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white pt-16 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Shop Info */}
                    <div>
                        <Link href="#" className="text-2xl font-bold text-white mb-4 block">ShopMart</Link>
                        <p className="text-gray-400 mb-6">
                            ShopMart offers a wide range of high-quality products at competitive prices.
                            We're committed to providing an exceptional shopping experience with fast shipping and excellent customer service.
                        </p>
                        <div className="flex space-x-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                                <a key={idx} href="#" className="bg-gray-700 hover:bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                    <Icon className="text-white text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            {["Home", "Shop", "Products", "About Us", "Contact", "Blog"].map((link, i) => (
                                <li key={i}>
                                    <Link href="#" className="hover:text-white transition">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-gray-400">
                            {["My Account", "Order History", "Wishlist", "Returns", "FAQs", "Terms & Conditions"].map((link, i) => (
                                <li key={i}>
                                    <Link href="#" className="hover:text-white transition">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-indigo-500 mt-1 mr-3" />
                                <span>
                  1234 Market St, Suite 900<br />
                  San Francisco, CA 94103
                </span>
                            </li>
                            <li className="flex items-center">
                                <FaPhoneAlt className="text-indigo-500 mr-3" />
                                +1 (800) 123-4567
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="text-indigo-500 mr-3" />
                                info@shopmart.com
                            </li>
                            <li className="flex items-center">
                                <FaClock className="text-indigo-500 mr-3" />
                                Mon–Fri: 9AM – 6PM
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="border-gray-700 my-8" />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 mb-4 md:mb-0">
                        © 2025 ShopMart. All Rights Reserved.
                    </p>
                    <div className="flex space-x-6">
                        <img src="/images/payment-4.png" alt="Payment" className="h-8" />
                        <img src="/images/payment-3.png" alt="Payment" className="h-8" />
                        <img src="/images/payment-2.png" alt="Payment" className="h-8" />
                        <img src="/images/payment-1.png" alt="Payment" className="h-8" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
