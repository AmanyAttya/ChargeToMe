import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  megError: string = "";
  isLoading: boolean = false;
  msgSuccess: boolean=false;

  // Create FormGroup
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.confirmPassword });

  // Submit method
  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.setRegister(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === 'success') {
            this.msgSuccess=true;
            setTimeout(() => {
              this.router.navigate(['/login']);
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

  // Custom validation function
  confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }
}
