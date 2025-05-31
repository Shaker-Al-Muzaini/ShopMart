<?php
namespace App\Repositories;

use App\Models\Product;
class ProductRepository
{
    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(Product $product, array $data): bool
    {
        return $product->update($data);
    }

    public function delete(Product $product): bool
    {
        return $product->delete();
    }

    public function find(int $id): Product
    {
        return Product::findOrFail($id);
    }

    public function paginateWithFilters($perPage, $search, $sort, $direction)
    {
        return Product::select('id', 'name', 'slug', 'created_at')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderBy($sort, $direction)
            ->paginate($perPage)
            ->withQueryString();
    }
}
