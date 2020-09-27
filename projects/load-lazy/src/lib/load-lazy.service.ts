import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable,
  Injector,
  NgZone,
  ViewContainerRef
} from '@angular/core';
import {ComponentLoadDependencies, ICompInput} from './load-lazy.interfaces';


@Injectable({
  providedIn: 'root'
})
export class LoadLazyService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private zone: NgZone,
  ) {
  }

  public async loadComponent(loadInfo: ComponentLoadDependencies): Promise<ComponentRef<any>> {
    try {
      return this.zone.run(() => {
        this.validateComponentData(loadInfo.rawComponent);
        const factoryResult: ComponentFactory<any> = this.runFactoryProtocol(loadInfo.rawComponent.default);
        const loadedIntoView: ComponentRef<any> = this.loadComponentIntoView(loadInfo.template, factoryResult);
        if (loadInfo.inputs) {
          this.addInputs(loadedIntoView, loadInfo.inputs);
        }
        if (loadInfo.outputs) {
          this.addOutputs(loadedIntoView, loadInfo.outputs);
        }
        return loadedIntoView;
      });

    } catch (e) {
      console.log('e', e);
    }


  }


  // tslint:disable-next-line:max-line-length
  public async loadMultipleComponents(loadInfo: Array<ComponentLoadDependencies>, timeBetweenComponentLoad: number = 0): Promise<Array<ComponentRef<any>>> {
    const componentInstances = [];
    for (const load of loadInfo) {
      const newComp = await this.loadComponent(load);
      componentInstances.push(newComp);
      await this.sleep(timeBetweenComponentLoad);
    }

    return componentInstances;

  }


  private validateComponentData(rawComponent: any): void {
    let error: any = false;

    if (!rawComponent.hasOwnProperty('default') || !rawComponent.default) {
      if (!error) {
        error = {};
      }

      error.defaultValue = 'Please export component with export default *componentName*';
    }

    if (error) {
      throw Error(JSON.stringify(error));
    }

  }


  private runFactoryProtocol(defaultComponent: any): ComponentFactory<any> {
    return this.componentFactoryResolver.resolveComponentFactory(defaultComponent);
  }

  private loadComponentIntoView(viewRef: ViewContainerRef, factoryResult: ComponentFactory<any>) {
    return viewRef.createComponent(factoryResult, null, this.injector);
  }


  private addInputs(component: ComponentRef<any>, inputs: ICompInput): void {
    for (const input in inputs) {
      if (!inputs.hasOwnProperty(input)) {
        continue;
      }
      component.instance[input] = inputs[input];
    }
  }

  private addOutputs(component: ComponentRef<any>, outputs: ICompInput): void {
    for (const output in outputs) {
      if (!outputs.hasOwnProperty(output)) {
        continue;
      }
      (component.instance[output] as EventEmitter<any>).subscribe(outputs[output]);
    }
  }


  private async sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }

}
