<?php
namespace App\Http\Controllers\Admin;
use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Brands;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Services\ProductActionService;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductActionService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $products = $this->productService->getPaginatedProducts($perPage, $search, $sort, $direction);

        $products->getCollection()->transform(function ($product) {
            $product->image = $product->getFirstImageUrl('images', 'thumb');
            return $product;
        });

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
                'perPage' => $perPage,
                'page' => $request->input('page', 1),
            ],
            'can' => [
                'create' => true,
                'edit' => true,
                'delete' => true
            ]
        ]);
    }

    public function create(): Response
    {
        $brands = Brands::select('id', 'name')->get();
        $categories = Category::select('id', 'name', 'parent_id')->with('descendants')->isParent()->get();
        $flattenedCategies = $this->flattenCategories($categories);
        return Inertia::render('Admin/Products/Create', [
            'brands' => $brands,
            'categories' => $flattenedCategies,
        ]);
    }

    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $data = $request->only('name', 'description', 'status', 'brand_id', 'category_id', 'price', 'quantity', 'barcode', 'sku');
        $product = $this->productService->createProduct($data);

        return redirect()->route('admin.products.edit', $product->id)->with('success', 'Product created successfully.');
    }

    public function edit($id): Response
    {
        $product = $this->productService->getProductById($id);
        $product->image = asset('storage/' . $product->image);
        $brands = Brands::select('id', 'name')->get();
        $categories = Category::select('id', 'name', 'parent_id')->with('descendants')->isParent()->get();
        $flattenedCategies = $this->flattenCategories($categories);
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'brands' => $brands,
            'categories' => $flattenedCategies
        ]);
    }

    public function update(ProductUpdateRequest $request, Product $product): RedirectResponse
    {
        $data = $request->only('name', 'description', 'status', 'brand_id', 'category_id', 'price', 'quantity', 'barcode', 'sku');
        $this->productService->updateProduct($product, $data);
        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy($id): RedirectResponse
    {
        $product = $this->productService->getProductById($id);
        ImageUploader::deleteImage($product->image);
        $this->productService->deleteProduct($product);
        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }

    public function flattenCategories($categories, $prefix = '', $result = [])
    {
        foreach ($categories as $category) {
            $path = $prefix ? "$prefix > $category->name" : $category->name;

            $result[] = [
                'id' => $category->id,
                'name' => $category->name,
                'path' => $path,
                'level' => substr_count($path, '>'),
            ];

            if ($category->descendants && $category->descendants->count() > 0) {
                $result = $this->flattenCategories($category->descendants, $path, $result);
            }
        }
        return $result;
    }
}
