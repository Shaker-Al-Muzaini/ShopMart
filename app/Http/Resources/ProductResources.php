<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResources extends JsonResource
{
    public function toArray(Request $request): array
    {
        $options = $request->input('options') ?: [];

        // صور المنتج حسب الخيارات أو صور عامة
        $images = $options ? $this->getImagesForOptions($options) : $this->getImages();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->getFirstImageUrl('images'),

            'images' => collect($images)->map(function ($image) {
                return [
                    'id' => $image->id,
                    'thumb' => $image->getUrl('thumb'),
                    'small' => $image->getUrl('small'),
                    'large' => $image->getUrl('large'),
                ];
            }),

            'variationTypes' => $this->variationTypes->map(function ($variationType) {
                return [
                    'id' => $variationType->id,
                    'name' => $variationType->name,
                    'options' => $variationType->options->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'name' => $option->name,
                            'images' => $option->getMedia('images')->map(function ($image) {
                                return [
                                    'id' => $image->id,
                                    'thumb' => $image->getUrl('thumb'),
                                    'small' => $image->getUrl('small'),
                                    'large' => $image->getUrl('large'),
                                ];
                            }),
                        ];
                    }),
                ];
            }),

            'variations' => $this->variations->map(function ($variation) {
                return [
                    'id' => $variation->id,
                    'price' => $variation->price,
                    'quantity' => $variation->quantity,
                    'variation_type_option_ids' => $variation->variation_type_option_ids,
                ];
            }),

            'rating' => 4,
            'reviews_count' => 100,
        ];
    }
}
