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








        //   // Parsing the data down to the info we need because our bot gets EVERYTHING. Check links for more details
      //   // (one is for getting the unique users and one is for getting the count)
      //   const counts = {}; // https://stackoverflow.com/questions/15052702/count-unique-elements-in-array-without-sorting
      //   for (var i = 0; i < this.userData.length; i++) {
      //     counts[this.userData[i]] = 1 + (counts[this.userData[i]] || 0);
      //   }
      //   function onlyUnique(value, index, self) {
      //     return self.indexOf(value) === index;
      //   }

      //   // usage example:   https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      //   let a = this.userData;
      //   let unique = a.filter(onlyUnique);

      //   var data = counts;
      //   var userNames = Object.entries(data)
      //   let result = Object.values(data)
      //   var posts = [
      //     { user: 'killroyman', amount: 304 },
      //     { user: 'testbacktre', amount: 78}
      //   ]
      //   // var obj = {};
      //   // userData.forEach((data) => {
      //   //   obj[data[0]] = data[1]
      //   // });

      //   // Next bit of code flattens multiple arrays into one
      //   // https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
      //   // userData = [].concat.apply([], userData);
      //   console.log(userData)
      //   console.log(userNames)
      //   console.log(result)








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
