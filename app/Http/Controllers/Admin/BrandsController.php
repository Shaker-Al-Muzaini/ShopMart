<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\BrandStoreUpdateRequest;
use App\Models\Brands;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    public function create(Request $request): \Inertia\Response
    {
        return Inertia::render('Admin/Brands/Create');
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(BrandStoreUpdateRequest $request): \Illuminate\Http\RedirectResponse
    {
        $data = $request->only('name');
        if ($request->hasFile('image')) {
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'brands');
        }

        Brands::create($data);
        return redirect()->route('admin.brands.index')->with('success', 'Brand created successfully.');
    }

    public function edit($id): \Inertia\Response
    {
        $brand = Brands::findOrFail($id);
        $brand->image = asset('storage/' . $brand->image);
        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function update(BrandStoreUpdateRequest $request, Brands $brand): \Illuminate\Http\RedirectResponse
    {
        $data = $request->only('name');

        if ($request->hasFile('image')) {
            ImageUploader::deleteImage($brand->image);
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'brands');
        }

        $brand->update($data);
        return redirect()->route('admin.brands.index')->with('success', 'Brand updated successfully.');
    }

    public function destroy($id): \Illuminate\Http\RedirectResponse
    {
        $brand = Brands::findOrFail($id);
        ImageUploader::deleteImage($brand->image);
        $brand->delete();
        return redirect()->route('admin.brands.index')->with('success', 'Brand deleted successfully.');
    }
}
