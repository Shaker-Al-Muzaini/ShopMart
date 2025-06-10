<?php

namespace App\Models;

use App\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia;

    protected $guarded = [];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(100);
        $this->addMediaConversion('small')->width(480);
        $this->addMediaConversion('large')->width(1200);
    }

    public function scopePublished($query)
    {
        return $query->where('status', ProductStatusEnum::Published->value);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brands::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variationTypes(): HasMany
    {
        return $this->hasMany(VariationType::class);
    }

    public function options(): HasManyThrough
    {
        return $this->hasManyThrough(VariationTypeOption::class, VariationType::class, 'product_id', 'variation_type_id', 'id', 'id');
    }

    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class);
    }
    public function getFirstImageUrl(string $collectionName = 'images', string $conversion = 'thumb'): ?string
    {
        if($this->options()->count() > 0) {
            foreach ($this->options as $option) {
                $imageUrl = $option->getFirstMediaUrl($collectionName,$conversion);
                if ($imageUrl) {
                    return $imageUrl;
                }
            }
        }
        return $this->getFirstMediaUrl($collectionName, $conversion);
    }
    public function getPriceForFirstOption()
    {
        $firstOptions = $this->getFirstOptionMap();
        if ($firstOptions) {
           return $this->getpriceForOptions($firstOptions);
        }
        return $this->price;
    }
    public function getFirstOptionMap()
    {
       return $this->variationTypes->mapWithKeys(fn($type)
       =>[$type->id=>$type->options[0]->id])->toArray();


    }
    public function getpriceForOptions(array $optionsIds=[])
    {
       $optionsIds=array_values($optionsIds);
       sort($optionsIds);
       $optionsIds->josn_encode($optionsIds);
       foreach ($this->variations as $variation) {
           $a=$variation->variation_type_options_ids;
           if ($optionsIds == $a) {
               return $variation->price !== null ? $variation->price : $this->price;
           }
       }
         return $this->price;
    }

}
