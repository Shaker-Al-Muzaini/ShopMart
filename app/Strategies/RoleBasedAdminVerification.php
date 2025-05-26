<?php
namespace App\Strategies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RoleBasedAdminVerification implements AdminVerificationStrategy {
    public function canModify(User $admin): bool {
        $user = Auth::user();
        return $user->role === 'admin';
    }
}
