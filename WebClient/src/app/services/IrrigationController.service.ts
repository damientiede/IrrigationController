import {Injectable} from "@angular/core";
import { HttpClient, HttpEvent, HttpHandler, 
         HttpInterceptor, HttpRequest 
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IrrigationControllerService {
    private restUrl = "http://192.168.1.109:8000/api/";
    status:any;
    constructor(private http: HttpClient) {

    }
    public getStatus<T>(): Observable<T> {
        return this.http.get<T>(this.restUrl);
    }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        console.log(JSON.stringify(req.headers));
        return next.handle(req);
    }
}