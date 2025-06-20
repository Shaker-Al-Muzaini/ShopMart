import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePage } from '@inertiajs/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Brand() {
    const { brands } = usePage().props as any;
    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-black text-2xl font-bold mb-8 text-center">Our Brands</h2>

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={5}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 },
                    }}
                    className="brand-slider"
                >
                    {brands.map((brand: any, i: number) => (
                        <SwiperSlide key={i}>
                            <div className="bg-gray-50 p-6 rounded-lg h-32 flex items-center justify-center">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="max-h-16"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
