import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CarComponent } from 'app/components/car/car.component';
import { ColorComponent } from 'app/components/color/color.component';
import { BrandComponent } from 'app/components/brand/brand.component';
import { RentalComponent } from 'app/components/rental/rental.component';
import { PaymentComponent } from 'app/components/payment/payment.component';
import { AddBrandComponent } from 'app/components/add-brand/add-brand.component';
import { AddObjectComponent } from 'app/components/add-object/add-object.component';
import { AddColorComponent } from 'app/components/add-color/add-color.component';
import { AddCarComponent } from 'app/components/add-car/add-car.component';
import { UpdateBrandComponent } from 'app/components/update-brand/update-brand.component';
import { UpdateColorComponent } from 'app/components/update-color/update-color.component';
import { UpdateCarComponent } from 'app/components/update-car/update-car.component';
import { FindeksComponent } from 'app/components/findeks/findeks.component';
import { UpdateUserComponent } from 'app/components/update-user/update-user.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'cars',                                 component: CarComponent },
    { path: 'user-profilecreativetim',              component: UserProfileComponent },
    { path: 'user-profile/:userId',                 component: UpdateUserComponent },
    { path: 'table-list',                           component: TableListComponent },
    { path: 'payment/pay/:rental/:totalPrice',      component: PaymentComponent },
    { path: 'cars',                                 component: CarComponent },
    { path: 'cars/add',                             component: AddCarComponent },
    { path: 'cars/filter/:brandName/:colorName',    component: CarComponent },
    { path: 'cars/car/:carId',                      component: CarComponent },
    { path: 'cars/brand/:brandName',                component: CarComponent },
    { path: 'cars/color/:colorName',                component: CarComponent },
    { path: 'colors',                               component: ColorComponent },
    { path: 'colors/add',                           component: AddColorComponent },
    { path: 'brands',                               component: BrandComponent },
    { path: 'add',                                  component: AddObjectComponent },   
    { path: 'brands/add',                           component: AddBrandComponent },
    { path: 'carsupdate',                           component: UpdateCarComponent },
    { path: 'carsupdate/:carId',                    component: UpdateCarComponent },
    { path: 'brandsupdate',                         component: UpdateBrandComponent },
    { path: 'brandsupdate/:brandId',                component: UpdateBrandComponent },
    { path: 'colorsupdate',                         component: UpdateColorComponent },
    { path: 'colorsupdate/:colorId',                component: UpdateColorComponent },
    { path: 'rentals',                              component: RentalComponent },
    { path: 'findeks/:carId',                       component: FindeksComponent },
    { path: 'rentals/recourse/:carIdofRental',      component: RentalComponent },
    { path: 'rentals/pay/:rentalToAdd',             component: RentalComponent },
    { path: 'typography',                           component: TypographyComponent },
    { path: 'icons',                                component: IconsComponent },
    { path: 'maps',                                 component: MapsComponent },
    { path: 'notifications',                        component: NotificationsComponent },
    { path: 'upgrade',                              component: UpgradeComponent },
];
