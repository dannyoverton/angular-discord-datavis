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
  public msgList: any;


  constructor(public dataService: DataService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  // public barChartData = [];
  public barChartData = [
    {
      data: [],
      label: ''
    }
  ];

  ngOnInit() {
    this.dataService.getUserData();
    this.userSub = this.dataService.getUserUpdateListener()
      .subscribe((userData: any) => {
        this.userData = userData;
        const msgCount = this.userData.map(a => a.count);
        this.barChartLabels = userData.map(a => a.users);  // .map gets the keys from objects in array found here: https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
        this.barChartData.push(
          {
            data: msgCount,
            label: 'Discord User Data'
          }
        );
        console.log(this.barChartData);
        console.log(msgCount)

      });
  }

}
