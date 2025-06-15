<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Resources\PorductListResurce;
use App\Models\Product;
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
        return inertia::render('Ecommerce/Home', [
            'title' => 'Home',
            'description' => 'Welcome. Explore our products and enjoy a seamless shopping experience.',
            'best_SellingProducts' => $best_SellingProducts,
            'SpecialOffers' => $SpecialOffers,
        ]);
    }
}
