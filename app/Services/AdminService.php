<?php
namespace App\Services;

use App\Repositories\AdminRepository;
use App\Strategies\AdminVerificationStrategy;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Exception;

class AdminService {
    protected $repo;
    protected $verifier;

    public function __construct(AdminRepository $repo, AdminVerificationStrategy $verifier) {
        $this->repo = $repo;
        $this->verifier = $verifier;
    }

    public function listAdmins($filters) {
        return $this->repo->getAll($filters);
    }

    public function createAdmin($data) {
        return DB::transaction(function () use ($data) {
            $data['password'] = bcrypt($data['password']);
            $data['role'] = 'admin';
            return $this->repo->create($data);
        });
    }

    public function updateAdmin(User $admin, $data) {
        if (!$this->verifier->canModify($admin)) {
            throw new Exception("Unauthorized action.");
        }

        return DB::transaction(function () use ($admin, $data) {
            return $this->repo->update($admin, $data);
        });
    }

    public function deleteAdmin(User $admin) {
        if (!$this->verifier->canModify($admin)) {
            throw new Exception("Unauthorized action.");
        }

        return DB::transaction(function () use ($admin) {
            return $this->repo->delete($admin);
        });
    }
}
