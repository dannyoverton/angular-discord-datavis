import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as CanvasJS from './canvasjs.min';
import * as d3 from 'd3';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  userData: any;
  private userSub: Subscription;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUserData();
    this.userSub = this.dataService.getUserUpdateListener()
      .subscribe((userData: any) => {
        this.userData = userData;
      });

    const counts = {}; // https://stackoverflow.com/questions/15052702/count-unique-elements-in-array-without-sorting
    for (var i = 0; i < this.userData.length; i++) {
      counts[this.userData[i]] = 1 + (counts[this.userData[i]] || 0);
    }

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    // usage example:   https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    let a = this.userData;
    let unique = a.filter(onlyUnique);

    var data = counts;

    d3.select(".chart")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style("width", function (d) { return d + "px"; })
      .text(function (d) { return d; });





    // let chart = new CanvasJS.Chart('chartContainer', {
    //   animationEnabled: true,
    //   exportEnabled: true,
    //   title: {
    //     text: 'Basic Column Chart in Angular'
    //   },
    //    data: [
    //      {
    //        type: 'column',
    //        dataPoints: [
    //          { y: 71, label: 'Apple' },
    //          { y: 55, label: 'Mango' },
    //          { y: 50, label: 'Orange' },
    //          { y: 65, label: 'Banana' },
    //          { y: 95, label: 'Pineapple' },
    //          { y: 68, label: 'Pears' },
    //          { y: 28, label: 'Grapes' },
    //          { y: 34, label: 'Lychee' },
    //          { y: 14, label: 'Jackfruit' }
    //        ]
    //      }
    //    ]
    // });

    // chart.render();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
