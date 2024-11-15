import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'John Doe',
      feedback:
        'FitLife Gym helped me transform my life. I’m stronger and healthier!',
    },
    {
      name: 'Jane Smith',
      feedback: 'Great atmosphere and amazing trainers! I feel at home here.',
    },
  ];
}
