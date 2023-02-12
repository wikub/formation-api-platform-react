<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\InvoiceRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use App\Controller\InvoiceIncrementationController;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource(
    paginationEnabled: true,
    paginationClientEnabled: true,
    paginationItemsPerPage: 10,
    paginationClientItemsPerPage: true,
    order: ['sentAt' => 'DESC'],
    normalizationContext: ['groups' => ['invoices_read']],
    operations: [
        new GetCollection(),
        new Get(),
        new Post(),
        new Put(),
        new Delete(),
        new Post(
            name: 'increment',
            uriTemplate: '/invoices/{id}/increment',
            controller: InvoiceIncrementationController::class,
            description: 'Increment invoices',
            openapiContext: [
                'summary' => 'Increment invoices',
            ]
            

        )
    ]
)]
#[ApiResource(
    uriTemplate: '/customers/{id}/invoices', 
    uriVariables: [
        'id' => new Link(
            fromClass: Customer::class,
            toProperty: 'customer',
            fromProperty: 'invoices'
        )
    ], 
    operations: [new GetCollection()],
    normalizationContext: ['groups' => ['invoices_read_by_user']],
)]
#[ApiFilter(OrderFilter::class, properties: ['sentAt', 'amount'])]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_read_by_user'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['invoices_read', 'customers_read', 'invoices_read_by_user'])]
    private ?string $amount = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_read_by_user'])]
    private ?\DateTimeImmutable $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices_read', 'customers_read', 'invoices_read_by_user'])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invoices_read'])]
    private ?Customer $customer = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_read_by_user'])]
    private ?int $chrono = null;

    #[Groups(['invoices_read'])]
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?string
    {
        return $this->amount;
    }

    public function setAmount(string $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeImmutable
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeImmutable $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
