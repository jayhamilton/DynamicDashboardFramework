import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { BoardService } from 'src/app/board/board.service';
import { EventService } from 'src/app/eventservice/event.service';
import { GadgetBase } from '../common/gadget-common/gadget-base/gadget.base';
import { PieApiService } from './pie-api-service';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent extends GadgetBase implements OnInit {

  data: any[] = [];
  xAxisLabel = "";
  legendTitle = "";
  yAxisLabel = "";
  metricType = "";
  panelOpenState = false;

  colorScheme: Color;

  constructor(private eventService: EventService, private boardService: BoardService, private pieApiService: PieApiService, private httpClient: HttpClient) {
    super();

    this.colorScheme = {
      domain: [],
      name: '',
      selectable: false,
      group: ScaleType.Linear
    };
  }

  ngOnInit(): void {
    /**
     * TODO pull in the data based on the
     * - board specific attributes
     * - establish an api session key
     */
    this.initializeProperties();
    this.switchColorScheme();

    if (this.isMissingPropertyValue()) {
      this.inConfig = true;
    } else {
      this.requestMetricData();
    }
  }

  initializeProperties() {

    /*
    TODO specifically initialize the metricType. This is a property page property that would best be
    set in the base class.
  */

    //iterate through the properties to find the metric property and get its value.
    this.propertyPages[0].properties.forEach(property => {
      let option = property['label'].toString().toLowerCase();
      if (option === "metric") {
        this.metricType = property['value'].toString().toLowerCase()
      }
    })
  }

  remove() {
    this.eventService.emitGadgetDeleteEvent({ data: this.instanceId });
  }

  switchColorScheme() {

    //todo - this code relies too much on metricType options knowledge
    switch (this.metricType) {
      case "pull-requests":
        this.colorScheme = {
          domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
          name: '',
          selectable: false,
          group: ScaleType.Linear
        };
        break;
      case "completed-stories":
        this.colorScheme = {
          domain: ['#000074', '#880025', '#0F18BB', '#7a03ff', '#0738ff', '#ff63ff'],
          name: '',
          selectable: false,
          group: ScaleType.Linear
        };
        break;
      default: {}
    }
  }

  requestMetricData() {

    /**
     * TODO
     * userName and password:  should be swapped out for a more appropriate authentication strategy.
     * endpoint-target:  could be a specific variation of a type of endpoint that is supported by this stacked bar chart
     * metric-type: could be a specific type could represent a specific type of metric that is supported by this stacked bar chart.
     */

    this.pieApiService.getData(this.metricType).subscribe(metricData => {
      let data = metricData['data'];
      Object.assign(this, { data });
      this.legendTitle = metricData['legendTitle'];
      this.yAxisLabel = metricData['yAxesLabel'];
      this.setHelpLinks(metricData['links']);
      this.setMicroContent();

    });
  }

  propertyChangeEvent(propertiesJSON: string) {
    //update internal props
    const updatedPropsObject = JSON.parse(propertiesJSON);

    if (updatedPropsObject.title != undefined) {
      this.title = updatedPropsObject.title;
    }
    if (updatedPropsObject.subtitle != undefined) {
      this.subtitle = updatedPropsObject.subtitle;
    }
    if (updatedPropsObject.metric != undefined) {
      this.metricType = updatedPropsObject.metric;
      this.requestMetricData();
    }

    //persist changes
    this.boardService.savePropertyPageConfigurationToDestination(
      propertiesJSON,
      this.instanceId
    );
  }
  /** TODO FIX THIS HACK and move this to the gadget base class*/
  setMicroContent() {
    this.httpClient.get<any>(this.helpMicroContentURL, { responseType: 'text' as 'json' }).subscribe(html => {
      this.helpMicroContent = html;
    })
  }
}
