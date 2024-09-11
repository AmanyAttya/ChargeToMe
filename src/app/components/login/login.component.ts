import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected from styleUrl to styleUrls
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  megError: string = "";
  isLoading: boolean = false;
  msgSuccess: boolean = false;

  // Create FormGroup
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  });

  // Submit method
  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.setLogin(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === 'success') {
            this.msgSuccess = true;
          
            setTimeout(() => {
              //save token
              localStorage.setItem('userToken',JSON.stringify(res.token))
console.log(res.token)
            //2-decode Token 
            this.authService.saveUserdata()

             //3- navagite Token

              this.router.navigate(['/home']); // Navigate to home instead of login after successful login
            }, 1000);
          }

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.megError = err.error.message;
          console.log(err);
          this.isLoading = false;
        }
      });
    }
  }
}
