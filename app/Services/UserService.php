<?php
namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    protected UserRepository $repo;

    public function __construct(UserRepository $repo)
    {
        $this->repo = $repo;
    }

    public function listUsers(array $filters)
    {
        return $this->repo->getFilteredUsers($filters);
    }
}
