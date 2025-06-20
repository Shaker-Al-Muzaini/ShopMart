<?php

namespace App\Http\Controllers\Front;
use App\Http\Controllers\Controller;
use App\Http\Resources\PorductListResurce;
use App\Http\Resources\ProductResources;
use App\Models\Brands;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $best_SellingProducts =PorductListResurce::collection(Product::query()->limit(4)
            ->orderBy('sales','desc')
            ->get())->resolve();
        $SpecialOffers=PorductListResurce::collection(Product::query()->where('is_special_offer', true)
            ->limit(4)
            ->get())->resolve();
        $brands=Brands::query()->select('id','name','slug','image')->get()->map(function($brand){
            $brand->image=asset('storage/'.$brand->image);
            return $brand;
        });
        return inertia::render('Ecommerce/Home', [
            'title' => 'Home',
            'description' => 'Welcome. Explore our products and enjoy a seamless shopping experience.',
            'best_SellingProducts' => $best_SellingProducts,
            'specialOffers' => $SpecialOffers,
            'brands' => $brands,
        ]);
    }
    public function productDetail(Request $request, $slug)
    {

        $product = Product::where('slug', $slug)->firstOrFail();
        $productResource = new ProductResources($product);
        $relatedProducts = PorductListResurce::collection(
            Product::where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->limit(4)
                ->get()
        );


        return Inertia::render('Ecommerce/ProductDetail', [
            'product' => $productResource->resolve(),
            'variationOptions' => request('options', []),
            'relatedProducts' => $relatedProducts->resolve(),
        ]);
    }


}
