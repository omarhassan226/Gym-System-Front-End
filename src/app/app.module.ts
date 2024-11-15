import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/home/components/hero/hero.component';
import { AboutComponent } from './pages/home/components/about/about.component';
import { PricingComponent } from './pages/home/components/pricing/pricing.component';
import { TestimonialsComponent } from './pages/home/components/testimonials/testimonials.component';
import { ContactComponent } from './pages/home/components/contact/contact.component';
import { FooterComponent } from './pages/home/components/footer/footer.component';
import { ServicesComponent } from './pages/home/components/services/services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './pages/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    PricingComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    RegistrationComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
