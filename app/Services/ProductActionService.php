<?php
namespace App\Services;

use App\Repositories\ProductRepository;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductActionService
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function createProduct(array $data): Product
    {
        return DB::transaction(function () use ($data) {
            return $this->productRepository->create($data);
        });
    }

    public function updateProduct(Product $product, array $data): bool
    {
        return DB::transaction(function () use ($product, $data) {
            return $this->productRepository->update($product, $data);
        });
    }

    public function deleteProduct(Product $product): bool
    {
        return DB::transaction(function () use ($product) {
            return $this->productRepository->delete($product);
        });
    }

    public function getProductById(int $id): Product
    {
        return $this->productRepository->find($id);
    }

    public function getPaginatedProducts($perPage, $search, $sort, $direction)
    {
        return $this->productRepository->paginateWithFilters($perPage, $search, $sort, $direction);
    }
}
