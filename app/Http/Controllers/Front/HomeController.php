<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return inertia::render('Ecommerce/Home', [
            'title' => 'Home',
            'description' => 'Welcome to our e-commerce platform. Explore our products and enjoy a seamless shopping experience.',
        ]);
    }
}
