import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'app/models/car';
import { Customer } from 'app/models/customer/customer';
import { RentalDto } from 'app/models/rental/rentalDto';
import { Rental } from 'app/models/rental/rental';
import { CarService } from 'app/services/car.service';
import { CustomerService } from 'app/services/customer/customer.service';
import { RentalService } from 'app/services/rental/rental.service';
import { ToastrService } from 'ngx-toastr';
import { RentalPayment } from 'app/models/rental/rentalPaymen';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  dataLoaded:boolean = false
  dataCarsLoaded:boolean = false
  rentals:RentalDto[] =[];
  cars:Car[]=[];
  customers:Customer[]=[];
  rentDate:Date;
  returnDate:Date;
  customerId:number;
  checkRentalMessage:string;
  rentalPayment:RentalPayment;
  
  newRental:Rental;
  constructor(private rentalService:RentalService,
     private activatedRoute: ActivatedRoute,
     private carsService:CarService,
     private customerService:CustomerService,
     private toastrService:ToastrService,
     private router:Router
     ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if (params["carIdofRental"]) {
        this.setResource(params["carIdofRental"]);
      }
      else if(params["rentalToAdd"]){
        this.newRental = JSON.parse(params["rentalToAdd"])
        this.postAdd(this.newRental)
      }
      else{
        this.getRental();
      }
    })
    
  }
  getRental(){
    this.rentalService.getRental().subscribe(response=>{
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
  setResource(carId:number){
    this.carsService.getCarsById(carId).subscribe(response => {this.cars = response.data})
    this.customerService.getCustomer().subscribe(response => {this.customers = response.data})
    this.dataCarsLoaded =true;
  }

  setRentDate(){
    var dateNow = new Date();
    return dateNow.toISOString().slice(0,10)
  }

  setReturnDate(){
    var dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 1 );
    return dateNow.toISOString().slice(0,10)
  }

  setRentalCreated(car:Car){
    this.newRental = {
        CustomerId:Number(this.customerId),
        CarId:car.carId,
        RentDate:this.rentDate,
        ReturnDate: this.returnDate
    }
    this.rentalService.postCheck(this.newRental).subscribe(response =>{
      this.checkRentalMessage = response.messages
      this.toastrService.success(this.checkRentalMessage)
      let totalprice = this.totalPrice(car.dailyPrice)
      this.router.navigate(['/payment/pay/', JSON.stringify(this.newRental), totalprice])
    },
    err=>{
      this.checkRentalMessage = err.error.messages
      this.toastrService.error(this.checkRentalMessage)
    })
  }
  totalPrice(dailyPrice){
    if(this.newRental.ReturnDate != null ){
      var returnD = new Date(this.newRental.ReturnDate.toString());
      var rentD = new Date(this.newRental.RentDate.toString());
      var difference = returnD.getTime() - rentD.getTime();
    
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24)); 
    
      let amountOfPayment:number = numberOfDays * dailyPrice;
      if(amountOfPayment <= 0){
        this.router.navigate(['/cars']);
        this.toastrService.error("Hatalı işlem");
      }
      return amountOfPayment;
    }
    else{
      this.router.navigate(['/cars']);
      this.toastrService.error("Hatalı işlem");
    }
  }

  postAdd(rental:Rental){
    this.rentalService.postAdd(rental).subscribe(response=>{
      this.toastrService.success(response.messages)
      this.router.navigate(["/rentals/"])
    },
    err => {
      this.toastrService.error(err.error.messages)
      this.router.navigate(["/rentals/"])
    })
  }
}
