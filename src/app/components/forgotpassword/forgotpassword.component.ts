import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']  // Fixed the typo
})
export class ForgotpasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  step: number = 1;

  // Form for email verification
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  // Form for verifying reset code
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  });

  // Form for resetting password
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]{10}$/)]) // Adjusted for password validation
  });

  // Method to handle email verification
  verifyEmailSubmit(): void {
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Method to handle code verification
  verifyCodeSubmit(): void {
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Method to handle password reset submission
  resetPasswordSubmit(): void {
    this._AuthService.setRestPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserdata();  // Fixed missing parentheses
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
