import {
  Component,
  Input,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { AreaChartComponent } from '../area-chart/area-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { IGadget } from '../common/gadget-common/gadget-base/gadget.model';


/*
 this class handles the dynamic creation of components
 */

@Component({
  selector: 'gadget-grid-cell-host',
  template: '',
})
export class GadgetGridCellHostComponent implements OnInit {
  @Input() gadgetData: IGadget;

  constructor(private componentHost: ViewContainerRef) {
    this.gadgetData = {
      componentType: '',
      title: '',
      subtitle: '',
      description: '',
      icon: '',
      instanceId: -1,
      tags: [],
      propertyPages: [],
      actions: [],
    };
  }

  ngOnInit() {
    let gadgetRef = null;

    //TODO refactor and move to seperate clases
    switch (this.gadgetData.componentType) {
      case 'BarChartComponent':
          gadgetRef = this.componentHost.createComponent(BarChartComponent);
          break;
          case 'AreaChartComponent':
            gadgetRef = this.componentHost.createComponent(AreaChartComponent);
            break;
      default:
      //do nothing
    }

    if (gadgetRef) {
      gadgetRef.instance.initializeConfiguration(this.gadgetData);
    }
  }
}
