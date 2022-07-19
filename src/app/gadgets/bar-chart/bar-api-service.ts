import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BarApiService {

  /* This service will need to get data from an endpoint. That data and endpoint will be dictated
  by the
  - endpoint-target: some specific info that informs the system about the nature of the API call
  - metric-type: some specific info that informs the system the nature of the API call
 */

  //use MOCK api endpoint
  apiEndPoint = "/assets/api/_metrics/metric-a/mock.json";

  constructor(private httpClient: HttpClient) { }

  getData(metricType:string) {

    switch(metricType){
      case "pull-requests":
        this.apiEndPoint = "/assets/api/_metrics/metric-a/mock.json";
        break;
      case "completed-stories":
        this.apiEndPoint = "/assets/api/_metrics/metric-b/mock.json";
        break;
      default:{
        //this.apiEndPoint = "/assets/api/_metrics/metric-a/mock.json";
      }

    }



    let headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa("" + ':' + ""),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    //TODO- have the endPointTarget and metricType be used to construct the final API call.

    return this.httpClient.get<any>(this.apiEndPoint, {
      headers,
    });
  }
}

