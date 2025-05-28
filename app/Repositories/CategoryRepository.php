<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function getAll($perPage, $search, $sort, $direction)
    {
        return Category::select('id', 'name', 'slug', 'parent_id', 'image', 'created_at')
            ->when($search, fn($query) => $query->where('name', 'like', '%' . $search . '%'))
            ->orderBy($sort, $direction)
            ->paginate($perPage)
            ->withQueryString();
    }

    public function find($id)
    {
        return Category::findOrFail($id);
    }

    public function create(array $data)
    {
        return Category::create($data);
    }

    public function update(Category $category, array $data)
    {
        $category->update($data);
        return $category;
    }

    public function delete(Category $category)
    {
        $category->delete();
    }

    public function getParentsWithDescendants()
    {
        return Category::select('id', 'name')->with('descendants')->isParent()->get();
    }
}
