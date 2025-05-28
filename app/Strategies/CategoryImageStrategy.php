<?php

namespace App\Strategies;

use App\Helpers\ImageUploader;

class CategoryImageStrategy
{
    public function upload($image)
    {
        return ImageUploader::uploadImage($image, 'categories');
    }

    public function delete($imagePath)
    {
        ImageUploader::deleteImage($imagePath);
    }
}
