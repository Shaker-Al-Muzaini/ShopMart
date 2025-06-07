import {
    FaShoppingCart,
    FaHeart,
    FaSearch,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
} from "react-icons/fa";
function ProductCard({
                         image,
                         title,
                         description,
                         price,
                         oldPrice,
                         rating,
                         discount,
                     }: {
    image: string;
    title: string;
    description: string;
    price: string;
    oldPrice?: string;
    rating: (1 | 0.5 | 0)[];
    discount?: string;
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
            <div className="relative">
                <img src={image} alt={title} className="w-full h-64 object-cover" />
                {discount && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm">
                        {discount}
                    </div>
                )}
                <div className="absolute inset-0  bg-opacity-40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
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
                <h3 className="font-medium text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-3">{description}</p>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-indigo-600 font-bold">{price}</span>
                        {oldPrice && (
                            <span className="text-gray-400 line-through ml-2">
                {oldPrice}
              </span>
                        )}
                    </div>
                    <div className="flex text-yellow-400">
                        {rating.map((val, idx) =>
                            val === 1 ? (
                                <FaStar key={idx} />
                            ) : val === 0.5 ? (
                                <FaStarHalfAlt key={idx} />
                            ) : (
                                <FaRegStar key={idx} />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function BestSeller() {
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
                    <ProductCard
                        image="/images/p-1.jpg"
                        title="Wireless Headphones"
                        description="Premium sound quality with noise cancellation"
                        price="$89.99"
                        oldPrice="$119.99"
                        rating={[1, 1, 1, 1, 0.5]}
                        discount="-20%"
                    />

                    <ProductCard
                        image="/images/p-2.jpg"
                        title="Smart Watch"
                        description="Track your fitness and stay connected"
                        price="$129.99"
                        rating={[1, 1, 1, 1, 1]}
                    />

                    <ProductCard
                        image="/images/p-3.jpg"
                        title="Bluetooth Speaker"
                        description="Portable speaker with deep bass"
                        price="$59.99"
                        oldPrice="$69.99"
                        rating={[1, 1, 1, 1, 0]}
                        discount="-15%"
                    />

                    <ProductCard
                        image="/images/p-4.jpg"
                        title="HD Action Camera"
                        description="Capture your adventures in 4K"
                        price="$149.99"
                        rating={[1, 1, 1, 1, 0.5]}
                    />
                </div>
            </div>
        </div>
    );
}


