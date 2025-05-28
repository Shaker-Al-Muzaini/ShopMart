<?php

namespace App\Services;

use App\Repositories\CategoryRepository;
use App\Strategies\CategoryImageStrategy;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class CategoryService
{
    protected $categoryRepository;
    protected $imageStrategy;

    public function __construct(CategoryRepository $categoryRepository, CategoryImageStrategy $imageStrategy)
    {
        $this->categoryRepository = $categoryRepository;
        $this->imageStrategy = $imageStrategy;
    }

    public function createCategory(array $data)
    {
        return DB::transaction(function () use ($data) {
            if (isset($data['image'])) {
                $data['image'] = $this->imageStrategy->upload($data['image']);
            }
            return $this->categoryRepository->create($data);
        });
    }

    public function updateCategory(Category $category, array $data)
    {
        return DB::transaction(function () use ($category, $data) {
            if (isset($data['image'])) {
                $this->imageStrategy->delete($category->image);
                $data['image'] = $this->imageStrategy->upload($data['image']);
            }
            return $this->categoryRepository->update($category, $data);
        });
    }

    public function deleteCategory(Category $category)
    {
        return DB::transaction(function () use ($category) {
            $this->imageStrategy->delete($category->image);
            $this->categoryRepository->delete($category);
        });
    }
}
