<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PorductListResurce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category_id' => $this->category_id,
            'description' => $this->description,
            'price' => $this->getPriceForFirstOption(),
            'image' => $this->getFirstImageUrl('images', 'small'),
            'quantity' => $this->quantity,
            'isDiscounted' => $this->false,
            'discount'=>0


        ];

    }

}
