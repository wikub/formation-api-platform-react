<?php

namespace App\Doctrine;

use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use Symfony\Bundle\SecurityBundle\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(
        private Security $security,
    )
    {}
    
    public function applyToCollection(
        QueryBuilder $queryBuilder, 
        QueryNameGeneratorInterface $queryNameGenerator, 
        string $resourceClass, 
        Operation $operation = null, 
        array $context = []
    ): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(
        QueryBuilder $queryBuilder, 
        QueryNameGeneratorInterface $queryNameGenerator, 
        string $resourceClass, 
        array $identifiers, 
        Operation $operation = null, 
        array $context = []
    ): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        
        if( (Invoice::class !== $resourceClass && Customer::class !== $resourceClass) || $this->security->isGranted('ROLE_ADMIN')) {
            return;
        }
        $user = $this->security->getUser();

        $rootAlias = $queryBuilder->getRootAliases()[0];

        if( $resourceClass === Customer::class) {
            $queryBuilder->andWhere(sprintf('%s.user = :current_user', $rootAlias));
        }

        if( $resourceClass === Invoice::class) {
            $queryBuilder->join(sprintf('%s.customer', $rootAlias), 'c');
            $queryBuilder->andWhere(sprintf('c.user = :current_user', $rootAlias));
        }

        $queryBuilder->setParameter('current_user', $user->getId());

    }
}