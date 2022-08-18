import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private http: HttpClient, private auth_service: LoginService ) { }


  intercept(req, next) {
    const tokenizeReq =  req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth_service.getToken()}`
        }
      })

      return next.handle(tokenizeReq);
  }




}
