import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarComponent } from './car/car.component';
import { ColorComponent } from './color/color.component';
import { BrandComponent } from './brand/brand.component';
import { RentalComponent } from './rental/rental.component';
import { FilterPipePipe } from '../pipes/filter-pipe.pipe';
import { FilterBrandPipePipe } from '../pipes/filter-brand-pipe.pipe';
import { FilterColorPipePipe } from '../pipes/filter-color-pipe.pipe';
import { CarFilterComponent } from './car-filter/car-filter.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    RentalComponent,
    FilterPipePipe,
    FilterBrandPipePipe,
    FilterColorPipePipe,
    CarFilterComponent,
    PaymentComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormsModule,
  ]
})
export class ComponentsModule { }
