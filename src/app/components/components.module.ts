import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AddBrandComponent } from './add-brand/add-brand.component';
import { AddColorComponent } from './add-color/add-color.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { AddCarComponent } from './add-car/add-car.component';
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { UpdateColorComponent } from './update-color/update-color.component';
import { UpdateCarComponent } from './update-car/update-car.component';



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
    PaymentComponent,
    AddBrandComponent,
    AddColorComponent,
    AddObjectComponent,
    AddCarComponent,
    UpdateBrandComponent,
    UpdateColorComponent,
    UpdateCarComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
