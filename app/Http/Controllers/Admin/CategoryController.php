<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CtaegoryStoreUpdateRequest;
use App\Services\CategoryService;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    protected $categoryService;
    protected $categoryRepository;

    public function __construct(CategoryService $categoryService, CategoryRepository $categoryRepository)
    {
        $this->categoryService = $categoryService;
        $this->categoryRepository = $categoryRepository;
    }

    public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $categories = $this->categoryRepository->getAll($perPage, $search, $sort, $direction);

        $categories->getCollection()->transform(function ($category) {
            $category->image = asset('storage/' . $category->image);
            if ($category->parent_id) {
                $category->parent_name = $category->parent->name;
            }
            return $category;
        });

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters' => compact('search', 'sort', 'direction', 'perPage'),
            'can' => [
                'create' => true,
                'edit' => true,
                'delete' => true
            ]
        ]);
    }

    public function create(): Response
    {
        $categories = $this->categoryRepository->getParentsWithDescendants();
        $flattenedCategories = $this->flattenCategories($categories);
        return Inertia::render('Admin/Categories/Create', [
            'categories' => $flattenedCategories,
        ]);
    }

    public function store(CtaegoryStoreUpdateRequest $request): RedirectResponse
    {
        $data = $request->only('name', 'description', 'parent_id');
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image');
        }
        $this->categoryService->createCategory($data);
        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    public function edit($id): Response
    {
        $category = $this->categoryRepository->find($id);
        $category->image = asset('storage/' . $category->image);
        $categories = $this->categoryRepository->getParentsWithDescendants();
        $flattenedCategories = $this->flattenCategories($categories);
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'categories' => $flattenedCategories,
        ]);
    }

    public function update(CtaegoryStoreUpdateRequest $request, $id): RedirectResponse
    {
        $category = $this->categoryRepository->find($id);
        $data = $request->only('name', 'description', 'parent_id');
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image');
        }
        $this->categoryService->updateCategory($category, $data);
        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy($id): RedirectResponse
    {
        $category = $this->categoryRepository->find($id);
        $this->categoryService->deleteCategory($category);
        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }

    private function flattenCategories($categories, $prefix = '', $result = [])
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
