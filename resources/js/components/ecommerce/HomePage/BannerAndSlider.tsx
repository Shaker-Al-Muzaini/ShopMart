import { Link } from '@inertiajs/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function BannerAndSlider() {
    return (
        // <!-- Banner Section with Slider and Card -->
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row -mx-4">

                {/* السلايدر على اليسار */}
                <div className="w-full lg:w-3/4 px-4 order-2 lg:order-1">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        className="main-slider rounded-lg overflow-hidden shadow-md"
                    >
                        <SwiperSlide>
                            <div className="relative">
                                <img
                                    src="/images/banner-1.jpg"
                                    alt="Banner 1"
                                    className="w-full h-72 lg:h-96 object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col justify-center px-10 bg-black/30 text-white">
                                    <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
                                    <p className="text-lg mb-4">Check out our latest products</p>
                                    <a
                                        href="#"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md w-max"
                                    >
                                        Discover
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/banner-2.jpg"
                                alt="Banner 2"
                                className="w-full h-72 lg:h-96 object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="/images/banner-3.jpg"
                                alt="Banner 3"
                                className="w-full h-72 lg:h-96 object-cover"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* البطاقات على اليمين */}
                <div className="w-full lg:w-1/4 px-4 mb-8 lg:mb-0 flex flex-col gap-4 order-1 lg:order-2">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
                        <img
                            src="/images/banner-4.jpg"
                            alt="Promo"
                            className="w-full h-44 object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                            -30%
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1">Flash Sale</h3>
                            <p className="text-gray-600 text-sm mb-2">Limited time offer on premium products</p>
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Shop Now →
                            </a>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
                        <img
                            src="/images/d025893b-f957-4b32-8950-d27b2bcfc37a.jpg"
                            alt="Promo"
                            className="w-full h-44 object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                            New
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1">Exclusive Items</h3>
                            <p className="text-gray-600 text-sm mb-2">Discover our premium collections</p>
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Learn More →
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}
