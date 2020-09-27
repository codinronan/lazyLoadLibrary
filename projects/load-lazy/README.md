
# Ngx-LoadLazy - Lazy Load Single Components   
  
  Load angular components with Ivy in runtime with ease and simplicity in mind.
  Pages get complex from day to day, load time decrease and UX is damaged. LoadLazy will help take the burden of the complexity of loading components in run time.
  
  
## Usage Example
#### Single Component Load
	@ViewChild('lazyLoadedComponent', {read: ViewContainerRef}) loadedComponent: ViewContainerRef;
	
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
      
    this.lazyLoadService.loadComponent(obj)


#### Multi-Component load  (Can add interval between component load)

    @ViewChild('lazyLoadedComponent2', {read: ViewContainerRef}) loadedComponent2: ViewContainerRef;
    
     const obj: Array<ComponentLoadDependencies> = [  
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
      
      
    await this.lls.loadMultipleComponents(obj, 3000);
