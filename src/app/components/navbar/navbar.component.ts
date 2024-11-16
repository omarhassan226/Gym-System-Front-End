import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

export interface User {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '0.5s ease-in',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isOpen = false;
  isMobileMenuOpen = false;
  showNavbar = false;
  isLoggedIn = false;
  token = localStorage.getItem('token');

  userData: User = { name: '', email: '', phone: '' };
  private subscription!: Subscription;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      this.checkLoginStatus();
      this.subscription = this.authService.isAuth$.subscribe((isAuth) => {
        this.isLoggedIn = isAuth;
        if (this.isLoggedIn) {
          this.showNavbar = true;
          this.getUser();
        }
      });
    }, 0);
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openModel() {
    this.isOpen = !this.isOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToSection(event: Event, targetId: string): void {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  logout() {
    this.authService.signOut();
    localStorage.removeItem('token');
    this.isOpen = false;
    this.router.navigate(['/login']);
  }

  // Fetch user data from the backend
  getUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.subscription = this.authService.getUser().subscribe({
        next: (data: User) => {
          this.userData = data;
        },
        error: (err) => {
          console.error('Error getting user!', err);
        },
      });
    }
  }
}
