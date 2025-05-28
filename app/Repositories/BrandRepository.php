<?php

namespace App\Repositories;

use App\Models\Brands;

class BrandRepository
{
    public function getAllPaginated($perPage, $search, $sort, $direction)
    {
        return Brands::select('id', 'name', 'slug', 'image', 'created_at')
            ->when($search, fn($query) => $query->where('name', 'like', "%{$search}%"))
            ->orderBy($sort, $direction)
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data)
    {
        return Brands::create($data);
    }

    public function update(Brands $brand, array $data)
    {
        return $brand->update($data);
    }

    public function delete(Brands $brand)
    {
        return $brand->delete();
    }

    public function findOrFail($id)
    {
        return Brands::findOrFail($id);
    }
}
