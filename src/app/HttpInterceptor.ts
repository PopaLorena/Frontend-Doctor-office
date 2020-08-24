import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from './services/user.service';
import { tap } from 'rxjs/operators'
import { ConstantPool } from '@angular/compiler';
import { Router } from '@angular/router';
import { CommonService } from './services/commonService';
@Injectable()
export class CostomInterceptor implements HttpInterceptor {
    constructor(private userService: UserService,
        private router:Router,
        private commonService: CommonService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const header = {
            authorization: this.userService.token
        };
        //    req.headers.append('authorization', this.userService.token)
        const reqe = req.clone({
            setHeaders: header
        });
        // console.log(req);
        // console.log(next);
        return next.handle(reqe).pipe(
            tap((event: HttpEvent<any>) => {
                console.log(event);
            }, 
            (err) => {
                if(err.status===401){
                // this.commonService.loginFailed();
                console.log(err);
                }
            }
            )
        )
    }

}