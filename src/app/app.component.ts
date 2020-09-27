import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentLoadDependencies} from '../../projects/load-lazy/src/lib/load-lazy.interfaces';
import {LoadLazyService} from 'ngx-load-lazy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('lazyLoadedComponent', {read: ViewContainerRef}) loadedComponent: ViewContainerRef;
  @ViewChild('lazyLoadedComponent2', {read: ViewContainerRef}) loadedComponent2: ViewContainerRef;

  constructor(private lls: LoadLazyService) {



  }


  async ngOnInit(): Promise<void> {
    const obj: ComponentLoadDependencies = {
      rawComponent: await import('./mock/mock.component'),
      template: this.loadedComponent,
      inputs: {
        title: 'new amazing title',
        age: 12
      },
      outputs: {
        func: this.log.bind(this)
      }

    };


    const obj2: Array<ComponentLoadDependencies> = [
      {
        rawComponent: await import('./mock/mock.component'),
        template: this.loadedComponent,
        inputs: {
          title: 'new amazing title',
          age: 12
        },
        outputs: {
          func: this.log.bind(this)
        }

      },
      {
        rawComponent: await import('./mock/mock.component'),
        template: this.loadedComponent2,
        inputs: {
          title: 'new amazing title2',
          age: 14
        },
        outputs: {
          func: this.log.bind(this)
        }

      },
    ];


   const resp = await this.lls.loadMultipleComponents(obj2, 3000);
   console.log(resp);


  }

  log($event: any) {
    console.log('func ran' , $event);
  }

}
