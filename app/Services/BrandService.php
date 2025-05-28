<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Repositories\BrandRepository;
use App\Strategies\BrandSaveStrategy;
use Illuminate\Http\Request;

class BrandService
{
    protected $brandRepo;

    public function __construct(BrandRepository $brandRepo)
    {
        $this->brandRepo = $brandRepo;
    }

    public function list($request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        return $this->brandRepo->getAllPaginated($perPage, $search, $sort, $direction);
    }

    public function create(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $data = BrandSaveStrategy::prepareData($request);
            return $this->brandRepo->create($data);
        });
    }

    public function update(Request $request, $brand)
    {
        return DB::transaction(function () use ($request, $brand) {
            $data = BrandSaveStrategy::prepareData($request, $brand);
            return $this->brandRepo->update($brand, $data);
        });
    }

    public function delete($brand)
    {
        return DB::transaction(function () use ($brand) {
            return $this->brandRepo->delete($brand);
        });
    }
}
