<?php
namespace App\Strategies;

use App\Models\Brands;
use App\Helpers\ImageUploader;
use Illuminate\Http\Request;

class BrandSaveStrategy
{
    public static function prepareData(Request $request, ?Brands $brand = null)
    {
        $data = $request->only('name');

        if ($request->hasFile('image')) {
            if ($brand) {
                ImageUploader::deleteImage($brand->image);
            }
            $data['image'] = ImageUploader::uploadImage($request->file('image'), 'brands');
        }

        return $data;
    }
}
