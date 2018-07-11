import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {TASK} from './app.model';

@Injectable()
export class DemoService {

    constructor(private http:Http) {
    }

    // Uses http.get() to load data from a single API endpoint
    getTasks() {
        return this.http.get('/api/tasks').map((res:Response) => res.json());
    }

    createTask(task:TASK) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(task);
        return this.http.post('/api/task/', body, options).map((res:Response) => res.json());
    }
}