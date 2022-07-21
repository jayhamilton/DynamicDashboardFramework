import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { GadgetCommonModule } from './common/gadget-common/gadget-common.module';
import { GadgetGridCellHostComponent } from './gadget-grid-cell-host/gadget-grid-cell-host.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form-module';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { BarApiService } from './bar-chart/bar-api-service';
import { MatExpansionModule } from '@angular/material/expansion';
import { PieApiService } from './pie-chart/pie-api-service';
import { PieChartComponent } from './pie-chart/pie-chart.component';
@NgModule({
  declarations: [
    GadgetGridCellHostComponent,
    BarChartComponent,
    PieChartComponent,
    AreaChartComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    GadgetCommonModule,
    DynamicFormModule,
    HttpClientModule,
    FormsModule,
    MatChipsModule,
    NgxChartsModule,
    MatExpansionModule


  ],
    exports: [
     GadgetGridCellHostComponent
    ],
    providers: [
      BarApiService,
      PieApiService

    ]

})
export class GadgetsModule {}
