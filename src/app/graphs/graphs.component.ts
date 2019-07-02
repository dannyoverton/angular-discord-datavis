import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  public userData: any;
  private userSub: Subscription;

  constructor(public dataService: DataService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [];

  ngOnInit() {
    this.dataService.getUserData();
    this.userSub = this.dataService.getUserUpdateListener()
      .subscribe((userData: any) => {
        this.userData = userData;
        console.log(userData);
      });
  }

}
