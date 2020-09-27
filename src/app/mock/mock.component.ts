import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css'],

})
export class MockComponent implements OnInit, OnDestroy {


  @Input() title: string;
  @Input() age: string;
  @Output() func: EventEmitter<any> = new EventEmitter<any>();
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.func.unsubscribe();
  }

}


export default MockComponent;
