import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  form = { name: '', email: '', message: '' };

  submitForm() {
    console.log('Form submitted!', this.form);
    // Handle form submission
  }
}
