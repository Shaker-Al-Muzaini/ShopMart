<?php
namespace App\Repositories;

use App\Models\User;

class AdminRepository {
    public function getAll($filters) {
        return User::where('role', 'admin')
            ->when($filters['search'], function ($query, $search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%")
                    ->orWhere('phone', 'like', "%$search%");
            })
            ->orderBy($filters['sort'], $filters['direction'])
            ->paginate($filters['perPage']);
    }

    public function findById($id) {
        return User::where('role', 'admin')->findOrFail($id);
    }

    public function create($data) {
        return User::create($data);
    }

    public function update(User $admin, $data) {
        return $admin->update($data);
    }

    public function delete(User $admin) {
        return $admin->delete();
    }
}
