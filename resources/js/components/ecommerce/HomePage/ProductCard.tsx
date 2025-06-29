import { ProductListItem } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Heart, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';


type Props = {
    product: ProductListItem;
};

const ProductCard = ({ product }: Props) => {
    const form = useForm<{
        option_ids: Record<string, number>;
        quantity: number;
    }>({
        option_ids: {},
        quantity: 1,
    });

    const handleDetail = (slug: string) => {
        router.visit(route('product.detail', { slug }));
    };

    const addToCart = () => {
        form.post(route('cart.store', product.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('The product has been added to the shopping cart.');
            },
            onError: (err: any) => {
                toast.error('The product has not been added.');
                console.log(err);
            },
        });
    };

    const stripHtml = (html: string) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    return (
        <div className="group overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="relative">
                {product.image && (
                    <img
                        src={product.image.replace('localhost', '127.0.0.1:8000')}
                        alt="Product"
                        className="h-64 w-full object-cover"
                    />
                )}

                {product.isDiscount && (
                    <div className="absolute top-0 right-0 m-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white">
                        -{product.discount}%
                    </div>
                )}

                <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                        onClick={addToCart}
                        disabled={form.processing}
                        className="mx-2 rounded-full bg-white p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white"
                    >
                        <ShoppingBag className="h-5 w-5" />
                    </button>
                    <button className="mx-2 rounded-full bg-white p-3 text-gray-800 transition hover:bg-indigo-600 hover:text-white">
                        <Heart className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="p-4 cursor-pointer" onClick={() => handleDetail(product.slug)}>
                <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                <p className="mb-3 text-sm text-gray-600">
                    {stripHtml(product.description).substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-bold text-indigo-600">${product.price}</span>
                        {product.isDiscount && (
                            <span className="ml-2 text-gray-400 line-through">
                ${product.originalPrice ?? '119.99'}
              </span>
                        )}
                    </div>
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
