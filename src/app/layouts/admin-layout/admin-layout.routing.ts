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
import { LoginGuard } from 'app/guards/login.guard';
import { AddCarImageComponent } from 'app/components/add-car-image/add-car-image.component';
import { ManagerGuard } from 'app/guards/manager.guard';
import { OperationClaimsGuard } from 'app/guards/operation-claims.guard';


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
    { path: 'table-list',                           component: TableListComponent },
    { path: 'typography',                           component: TypographyComponent },
    { path: 'icons',                                component: IconsComponent },
    { path: 'maps',                                 component: MapsComponent },
    { path: 'notifications',                        component: NotificationsComponent },
    { path: 'upgrade',                              component: UpgradeComponent },
    { path: 'cars',                                 component: CarComponent }, 
    { path: 'cars/filter/:brandName/:colorName',    component: CarComponent},
    { path: 'cars/car/:carId',                      component: CarComponent },
    { path: 'cars/brand/:brandName',                component: CarComponent },
    { path: 'cars/color/:colorName',                component: CarComponent },
    { path: 'colors',                               component: ColorComponent },
    { path: 'brands',                               component: BrandComponent},
    {
        path: '',
        canActivate:[LoginGuard],
        children: [
            { path: 'rentals',                              component: RentalComponent },
            { path: 'findeks/:carId',                       component: FindeksComponent },
            { path: 'rentals/recourse/:carIdofRental',      component: RentalComponent },
            { path: 'rentals/pay/:rentalToAdd',             component: RentalComponent },
            { path: 'payment/pay/:rental/:totalPrice',      component: PaymentComponent },
            { path: 'cars/add',                             component: AddCarComponent,             canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.add']} },
            { path: 'colors/add',                           component: AddColorComponent,           canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.add']} },
            { path: 'user-profile/:userId',                 component: UpdateUserComponent},
            { path: 'add',                                  component: AddObjectComponent,          canActivate:[ManagerGuard] },   
            { path: 'carimage/add',                         component: AddCarImageComponent,        canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.add']} },
            { path: 'carimage/add/:carId',                  component: AddCarImageComponent,        canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.add']} },
            { path: 'brands/add',                           component: AddBrandComponent,           canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.add']} },
            { path: 'carsupdate',                           component: UpdateCarComponent,          canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.update']} },
            { path: 'carsupdate/:carId',                    component: UpdateCarComponent,          canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.update']} },
            { path: 'brandsupdate',                         component: UpdateBrandComponent,        canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.update']} },
            { path: 'brandsupdate/:brandId',                component: UpdateBrandComponent,        canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.update']} },
            { path: 'colorsupdate',                         component: UpdateColorComponent,        canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.update']} },
            { path: 'colorsupdate/:colorId',                component: UpdateColorComponent,        canActivate:[OperationClaimsGuard], data:{roles:['admin', 'product.update']} },
        ]
    },
    
    

];

// TODO: Admin panelinde kullanıcıları görebileceği bir component yap
// TODO: Faturaları Email ile gönderme sistemi kur 
