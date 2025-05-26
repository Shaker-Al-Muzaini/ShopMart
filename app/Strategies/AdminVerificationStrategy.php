<?php
namespace App\Strategies;

use App\Models\User;

interface AdminVerificationStrategy {
    public function canModify(User $admin): bool;
}
