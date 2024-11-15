import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  private signupSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatcher }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Custom validator to match password and confirm password
  passwordMatcher(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  // Get form control for validation
  get f() {
    return this.registrationForm.controls;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const formData = this.registrationForm.value;

    // Subscribe to the sign-up service
    this.signupSubscription = this.authService.signup(formData).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Registration failed:', error);
      }
    );
  }

  // Cleanup subscriptions when the component is destroyed
  ngOnDestroy(): void {
    if (this.signupSubscription) {
      this.signupSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }
}
