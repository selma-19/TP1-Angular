import {Injectable, inject, signal, computed} from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import {Observable, tap} from 'rxjs';
import {AuthState} from "../AuthState";
import {CONSTANTES} from "../../../config/const.config";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  //we initialize with local storage content to  persist state on refresh
  private authState=signal<AuthState>({
      email:localStorage.getItem(CONSTANTES.email),
      userId:localStorage.getItem(CONSTANTES.userId),
      isAuthenticated:!!localStorage.getItem(CONSTANTES.token),
      token:localStorage.getItem(CONSTANTES.token)
    }
  );

  constructor() {}


  stateIsAuthenticated=computed(()=>(this.authState().isAuthenticated))
  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap(response=>{
        this.authState.set({
          email:credentials.email,
          userId:response.userId.toString(),
          isAuthenticated:true,
          token:response.id
        })
        localStorage.setItem(CONSTANTES.token,response.id);
        localStorage.setItem(CONSTANTES.email,credentials.email)
        localStorage.setItem(CONSTANTES.userId,response.userId.toString())
      })
    )
  }

  logout() {
    this.authState.set({
      email:null,
      userId:null,
      isAuthenticated:false,
      token:null
    })
    localStorage.removeItem(CONSTANTES.token);
    localStorage.removeItem(CONSTANTES.email);
    localStorage.removeItem(CONSTANTES.userId);
  }
}
