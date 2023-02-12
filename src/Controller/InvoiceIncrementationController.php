<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class InvoiceIncrementationController extends AbstractController
{

    public function __construct(
        private EntityManagerInterface $entityManager
    )
    {
        
    }
    public function __invoke(Invoice $data)
    {
        $data->setChrono($data->getChrono() + 1);
        $this->entityManager->persist($data);
        $this->entityManager->flush();

        return $data;
    }
}