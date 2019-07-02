import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  public userData: any;
  private userSub: Subscription;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUserData();
    this.userSub = this.dataService.getUserUpdateListener()
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log(userData)
      });

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
