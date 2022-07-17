import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { BoardService } from 'src/app/board/board.service';
import { EventService } from 'src/app/eventservice/event.service';
import { GadgetBase } from '../common/gadget-common/gadget-base/gadget.base';
import { BarApiService } from './bar-api-service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent extends GadgetBase implements OnInit {

  data: any[] = [];
  xAxisLabel = ""
  legendTitle = ""
  yAxisLabel = ""

  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: '',
    selectable: false,
    group: ScaleType.Linear
  };

  constructor(private eventService: EventService, private boardService: BoardService, private barApiService: BarApiService) {
    super();

  }

  ngOnInit(): void {
    /**
     * TODO pull in the data based on the
     * - board specific attributes
     * - establish an api session key
     */
    /**
     * TODO determine if this Bar Chart should be an implementation of
     * an abstract METRIC type that has an interface to get the data based on
     * values and types of values above.
     */

    /**
     * TODO
     * userName and password:  should be swapped out for a more appropriate authentication strategy.
     * endpoint-target:  could be a specific variation of a type of endpoint that is supported by this stacked bar chart
     * metric-type: could be a specific type could represent a specific type of metric that is supported by this stacked bar chart.
     */

    if (this.isMissingPropertyValue()) {
      this.inConfig = true;
    } else {

      this.barApiService.getData("endpointTarget", "metricType").subscribe(metricData => {
        let data = metricData['data'];
        Object.assign(this, { data });
        this.legendTitle = metricData['legendTitle'];
        this.yAxisLabel = metricData['yAxesLabel'];
      });

    }
  }

  remove() {
    this.eventService.emitGadgetDeleteEvent({ data: this.instanceId });
  }

  propertyChangeEvent(propertiesJSON: string) {
    //update internal props
    const updatedPropsObject = JSON.parse(propertiesJSON);

    if (updatedPropsObject.title != undefined) {
      this.title = updatedPropsObject.title;
    }
    if (updatedPropsObject.subtitle != undefined) {
      this.subtitle = updatedPropsObject.subtitle;
      console.log.apply(this.subtitle);
    }

    //persist changes
    this.boardService.savePropertyPageConfigurationToDestination(
      propertiesJSON,
      this.instanceId
    );
  }

}
