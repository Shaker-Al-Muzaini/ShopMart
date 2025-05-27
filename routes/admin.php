<?php

use App\Http\Controllers\Admin\AdminControler;
use App\Http\Controllers\Admin\BrandsController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', AdminCheckMiddleware::class])->group(function () {
    Route::prefix('admin')->name('admin.')->group(callback: function () {
        Route::resource('users', UserController::class);
        Route::resource('admins', AdminControler::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('brands', BrandsController::class);
    });
});
