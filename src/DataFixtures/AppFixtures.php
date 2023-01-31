<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;

class AppFixtures extends Fixture
{
    private Generator $faker;
    private int $chrono;
    private ObjectManager $manager;
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher )
    {
        $this->hasher = $hasher;
        $this->faker = Factory::create('fr_FR');   
    }

    public function load(ObjectManager $manager): void
    {
        $this->manager = $manager;
        
        

        for($u=0; $u<10; $u++){
            $user = new User();
            
            $hash = $this->hasher->hashPassword($user, 'password');
            
            $user->setFirstname($this->faker->firstName())
                ->setLastname($this->faker->lastName())
                ->setEmail($this->faker->email())
                ->setPassword($hash);

            $manager->persist($user);

            $this->chrono = 1;

            $this->createCustomer($user);
        }

        $manager->flush();
    }

    private function createCustomer(User $user): void
    {
        for($c = 0; $c < mt_rand(5,20); $c++){
            $customer = new Customer();
            $customer->setFirstname($this->faker->firstName())
                ->setLastname($this->faker->lastName())
                ->setEmail($this->faker->email())
                ->setCompany($this->faker->company())
                ->setUser($user)
                ;

            $this->manager->persist($customer);
            
            $this->createInvoice($customer);
            
        }
    }

    private function createInvoice(Customer $customer): void
    {
        $chrono = 1;
        for($i=0; $i < mt_rand(3,10); $i++){
            $invoice = new Invoice();
            $invoice->setAmount($this->faker->randomFloat(2, 250, 5000))
                ->setSentAt(DateTimeImmutable::createFromMutable($this->faker->dateTimeBetween('-6 months')))
                ->setStatus($this->faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                ->setCustomer($customer)
                ->setChrono($this->chrono)
                ;

                $this->chrono++;
            
            $this->manager->persist($invoice);
        }
    }
}
