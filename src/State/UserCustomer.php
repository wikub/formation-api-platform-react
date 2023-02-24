<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Bundle\SecurityBundle\Security;

class UserCustomer implements ProcessorInterface
{
    public function __construct(
        private Security $security,
        private readonly ProcessorInterface $processor, 
    ){}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $data->setUser($this->security->getUser());
        
        //return $data;
        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
