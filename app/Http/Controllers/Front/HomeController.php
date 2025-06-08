<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $best_listProducts =Product::query()->limit(4)->orderBy('sales','desc')->get();
        $Special_Offers_listProducts=Product::query()->where('is_special_offer', true)->limit(4)->get();
        return inertia::render('Ecommerce/Home', [
            'title' => 'Home',
            'description' => 'Welcome to our e-commerce platform. Explore our products and enjoy a seamless shopping experience.',
        ]);
    }
}
