<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Repository\InvoiceRepository;
use Symfony\Bundle\SecurityBundle\Security;

class InvoiceChrono implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $processor,
        private InvoiceRepository $invoiceRepository,
        private Security $security,
    ){}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $lastChrono = $this->invoiceRepository->findNextChrono($this->security->getUser());
        
        $data->setChrono($lastChrono);
        $data->setSentAt(new \DateTimeImmutable());

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
