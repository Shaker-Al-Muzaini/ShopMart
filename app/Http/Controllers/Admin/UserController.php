<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    protected UserService $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): Response
    {
        $filters = [
            'perPage' => $request->input('perPage', 10),
            'search' => $request->input('search', ''),
            'sort' => $request->input('sort', 'id'),
            'direction' => $request->input('direction', 'asc'),
        ];

        $users = $this->service->listUsers($filters);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => array_merge($filters, [
                'page' => $request->input('page', 1),
            ]),
            'can' => [
                'create' => true,
                'edit' => true,
                'delete' => true
            ]
        ]);
    }
}
