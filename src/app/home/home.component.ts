import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  counter: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
    // this.counter = interval(1000).subscribe(
    //   (cnt) => {
    //     console.log(cnt);
    //   }
    // )
    let ob: Observable<number> = new Observable(
      (observer) => {
        let cnt: number = 0;
        setInterval(() => {
          observer.next(cnt);
          cnt++;
          if (cnt == 2) {
            observer.complete();
          }
          if (cnt >= 3) {
            observer.error("Count is greater than 3!");
          }
        }, 1000);
      }
    );
    this.counter = ob.pipe(
      filter((data)=> {return data > 0;}),
      map((data: number)=> {return 'Round ' + (data + 1);}))
      .subscribe((cnt) => {
      console.log(cnt);
    }, (error) => {
      alert('Error Occurs in Counter!');
    }, () => {
      console.log('Completed!')
    });
  }

  ngOnDestroy(): void {
    this.counter.unsubscribe();
  }

}
