<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\VariationStoreUpdateRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ProductService;

class ProductVariationController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request, $product)
    {
        $product = Product::findOrFail($product);
        $variations = $product->variations->toArray();
        $variations = $this->productService->mergeCartesianWithExisting($product->variationTypes, $variations, $product);
        return Inertia::render('Admin/Products/Variations/Index', [
            'product' => $product,
            'variationsLists' => $variations,
        ]);
    }

    /**
     * Update product variations
     *
     * @param Request $request
     * @param Product $product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(VariationStoreUpdateRequest $request, Product $product)
    {
        // Process the variations
        $data = $this->productService->mutateFormDataBeforeSave($request->all(), $product);
        $updatedProduct = $this->productService->handleRecordUpdate($product, $data);
        return redirect()->back()->with('success', 'Product variations updated successfully');
    }

}
