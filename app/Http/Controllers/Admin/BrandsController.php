<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrandStoreUpdateRequest;
use App\Models\Brands;
use App\Services\BrandService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandsController extends Controller
{
    protected $service;

    public function __construct(BrandService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): \Inertia\Response
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $brands = Brands::select('id', 'name', 'slug', 'image','created_at')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderBy($sort, $direction)
            ->paginate($perPage)->withQueryString();

        $brands->getCollection()->transform(function ($brand) {
            $brand->image = asset('storage/' . $brand->image);
            return $brand;
        });

        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands,
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


    public function create()
    {
        return Inertia::render('Admin/Brands/Create');
    }

    public function store(BrandStoreUpdateRequest $request)
    {
        $this->service->create($request);
        return redirect()->route('admin.brands.index')->with('success', 'Brand created successfully.');
    }

    public function edit($id)
    {
        $brand = Brands::findOrFail($id);
        $brand->image = asset('storage/' . $brand->image);

        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand,
        ]);
    }

    public function update(BrandStoreUpdateRequest $request, Brands $brand)
    {
        $this->service->update($request, $brand);
        return redirect()->route('admin.brands.index')->with('success', 'Brand updated successfully.');
    }

    public function destroy($id)
    {
        $brand = Brands::findOrFail($id);
        $this->service->delete($brand);
        return redirect()->route('admin.brands.index')->with('success', 'Brand deleted successfully.');
    }
}
