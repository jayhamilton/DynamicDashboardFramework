import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LibraryModule } from '../library/library.module';
import { RbacDirective } from '../_authorization/rbac.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [MenuComponent, RbacDirective],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    ConfigurationModule,
    MatDialogModule,
    LibraryModule,
  ],
  exports: [MenuComponent],
  providers: [],
})
export class MenuModule {}
