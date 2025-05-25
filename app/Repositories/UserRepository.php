<?php
namespace App\Repositories;

use App\Models\User;
class UserRepository
{
    public function getFilteredUsers(array $filters)
    {
        return User::select('id', 'name', 'email', 'phone', 'created_at')
            ->when($filters['search'], function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            })
            ->where('role', '!=', 'admin')
            ->orderBy($filters['sort'], $filters['direction'])
            ->paginate($filters['perPage'])
            ->withQueryString();
    }
}
