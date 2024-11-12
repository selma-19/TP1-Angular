import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { FormsModule } from '@angular/forms';
import {catchError, Observable, of, tap} from "rxjs";
import {LoginResponseDto} from "../dto/login-response.dto";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private login$=new Observable<LoginResponseDto | null>()

  login(credentials: CredentialsDto) {
    this.login$=this.authService.login(credentials).pipe(
      tap(()=>{
            this.toastr.success(`Bienvenu chez vous :)`);
            this.router.navigate([APP_ROUTES.cv]);
      }),
      catchError(()=>{
            this.toastr.error('Veuillez vérifier vos credentials');
            return of(null)

      })
    )
    this.login$.subscribe()
  }
}
