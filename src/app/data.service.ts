import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private userData: any  = [];
  private userUpdated = new Subject<any>();

  constructor(private http: HttpClient) { }

  getUserData() {
    this.http.get<{posts: any}>('http://localhost:3000/api/users')
      .subscribe((postData) => {
        this.userData = postData.posts;
        this.userUpdated.next([...this.userData]);
      });
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }
}
