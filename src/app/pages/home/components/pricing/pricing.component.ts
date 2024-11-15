import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  pricingPlans = [
    { name: 'Basic', price: 29, features: ['Access to Gym', '1 Group Class'] },
    {
      name: 'Premium',
      price: 49,
      features: ['Access to Gym', '5 Group Classes', 'Personal Training'],
    },
    {
      name: 'VIP',
      price: 79,
      features: ['Unlimited Access', 'All Classes', 'Personal Trainer 1-on-1'],
    },
  ];
}
