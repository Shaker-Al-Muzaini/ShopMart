<?php

use App\Http\Controllers\Admin\AdminControler;
use App\Http\Controllers\Admin\BrandsController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\ProductVariationController;
use App\Http\Controllers\Admin\ProductVariationTypeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Support\Facades\Route;



Route::middleware(['auth', AdminCheckMiddleware::class])->group(function () {
    Route::prefix('admin')->name('admin.')->group(callback: function () {


        Route::group(['prefix' => 'products', 'as' => 'products.'], function () {
            Route::controller(ProductImageController::class)->group(function () {
                Route::group(['prefix' => 'images', 'as' => 'images.'], function () {
                    Route::get('/{produt}', 'index')->name('index');
                    Route::post('/{product}/store', 'store')->name('store');
                    Route::delete('/delete/{id}', 'destroy')->name('destroy');
                });
            });

            Route::controller(ProductVariationTypeController::class)->group(function () {
                Route::group(['prefix' => 'variation-types', 'as' => 'variation-types.'], function () {
                    Route::get('/{produt}', 'index')->name('index');
                    Route::post('/{product}/store', 'store')->name('store');
                    Route::delete('/delete/{variationType}', 'destroy')->name('destroy');
                });
            });

            Route::controller(ProductVariationController::class)->group(function () {
                Route::group(['prefix' => 'variations', 'as' => 'variations.'], function () {
                    Route::get('/{produt}', 'index')->name('index');
                    Route::post('/{product}/update', 'update')->name('update');
                });
            });
        });
        Route::resource('users', UserController::class);
        Route::resource('admins', AdminControler::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('brands', BrandsController::class);
        Route::resource('products', ProductController::class);

    });
});
