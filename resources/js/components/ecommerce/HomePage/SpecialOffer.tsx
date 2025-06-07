import {
    FaShoppingCart,
    FaHeart,
    FaSearch,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
} from "react-icons/fa";

const products = [
    {
        id: 1,
        name: "Leather Backpack",
        desc: "Stylish and durable everyday bag",
        image: "/images/p-5.jpg",
        price: 69.99,
        oldPrice: 99.99,
        discount: "-30%",
    },
    {
        id: 2,
        name: "Designer Sunglasses",
        desc: "Polarized UV protection sunglasses",
        image: "/images/p-6.jpg",
        price: 74.99,
        oldPrice: 99.99,
        discount: "-25%",

    },
    {
        id: 3,
        name: "Fitness Tracker",
        desc: "Track steps, sleep and heart rate",
        image: "/images/p-8.jpg",
        price: 29.99,
        oldPrice: 49.99,
        discount: "-40%",

    },
    {
        id: 4,
        name: "Wireless Charger",
        desc: "Fast charging for all Qi-enabled devices",
        image: "/images/p-8.jpg",
        price: 24.99,
        oldPrice: 29.99,
        discount: "-15%",

    },
];

export default function SpecialOffer() {
    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-black text-2xl font-bold">Special Offers</h2>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">
                        View All
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-sm overflow-hidden group"
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm">
                                    {product.discount}
                                </div>
                                <div className="absolute inset-0  bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="bg-white text-gray-800 rounded-full p-3 mx-2 hover:bg-indigo-600 hover:text-white transition">
                                        <FaShoppingCart />
                                    </button>
                                    <button className="bg-white text-gray-800 rounded-full p-3 mx-2 hover:bg-indigo-600 hover:text-white transition">
                                        <FaHeart />
                                    </button>
                                    <button className="bg-white text-gray-800 rounded-full p-3 mx-2 hover:bg-indigo-600 hover:text-white transition">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{product.desc}</p>
                                <div className="flex items-center justify-between">
                                    <div>
                    <span className="text-indigo-600 font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                                        <span className="text-gray-400 line-through ml-2">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
