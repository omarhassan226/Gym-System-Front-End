import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  services = [
    {
      name: 'Personal Training',
      description: 'One-on-one training sessions to reach your personal goals.',
    },
    {
      name: 'Yoga Classes',
      description: 'Relax and rejuvenate with our yoga sessions.',
    },
    {
      name: 'Group Fitness',
      description: 'Join group fitness classes for a fun and engaging workout.',
    },
  ];
}
