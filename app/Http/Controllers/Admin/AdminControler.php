<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminStoreRequest;
use App\Http\Requests\AdminUpdateRequest;
use App\Http\Resources\AdminResource;
use App\Models\User;
use App\Repositories\AdminRepository;
use App\Services\AdminService;
use App\Strategies\RoleBasedAdminVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminControler extends Controller
{
    protected $service;

    public function __construct()
    {
        $repo = new AdminRepository();
        $verifier = new RoleBasedAdminVerification();
        $this->service = new AdminService($repo, $verifier);
    }

    public function index(Request $request): \Inertia\Response
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $admins = User::select('id', 'name', 'email', 'phone', 'created_at','avatar')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            })
            ->where('role', '=', 'admin')
            ->orderBy($sort, $direction)
            ->paginate($perPage)->withQueryString();
        return Inertia::render('Admin/Admins/Index', [
            'admins' => $admins,
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

    public function create()
    {
        return Inertia::render('Admin/Admins/Create');
    }

    public function store(AdminStoreRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            if ($request->hasFile('avatar')) {
                $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }

            $this->service->createAdmin($data);
            DB::commit();
            return redirect()->route('admin.admins.index')->with('success', 'Admin created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Something went wrong: ' . $e->getMessage()]);
        }
    }

    public function edit($id): \Inertia\Response
    {
        $admin = User::findOrFail($id);
        $admin->avatar = asset('storage/' . $admin->avatar);
        return Inertia::render('Admin/Admins/Edit', [
            'admin' => $admin
        ]);
    }

    public function update(AdminUpdateRequest $request, User $admin)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            if ($request->hasFile('avatar')) {
                if ($admin->avatar) {
                    Storage::disk('public')->delete($admin->avatar);
                }
                $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }

            $this->service->updateAdmin($admin, $data);
            DB::commit();
            return redirect()->route('admin.admins.index')->with('success', 'Admin updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Something went wrong: ' . $e->getMessage()]);
        }
    }

    public function destroy(User $admin)
    {
        DB::beginTransaction();
        try {
            if ($admin->avatar) {
                Storage::disk('public')->delete($admin->avatar);
            }

            $this->service->deleteAdmin($admin);
            DB::commit();
            return redirect()->route('admin.admins.index')->with('success', 'Admin deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Something went wrong: ' . $e->getMessage()]);
        }
    }
}
