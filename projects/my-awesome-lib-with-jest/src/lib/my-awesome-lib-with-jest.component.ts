import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'lib-my-awesome-lib-with-jest',
  template: `
    <p>
      my-awesome-lib-with-jest works!
    </p>
    <div style="overflow: hidden; width: 100%;" [@editExpand]="editBlockStatus"> 
    </div>
  `,
  styles: [
  ],
  animations: [
    trigger('editExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('625ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
]
})
export class MyAwesomeLibWithJestComponent implements OnInit {
    editBlockStatus: string = 'collapsed';
    constructor() { }

    ngOnInit(): void {
    }

}
