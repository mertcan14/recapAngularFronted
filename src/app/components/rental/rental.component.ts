import { Component, OnInit } from '@angular/core';
import { Rental } from 'app/models/rental/rental';
import { RentalService } from 'app/services/rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  dataLoaded:boolean = false
  rentals:Rental[] =[];
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRental();
  }
  getRental(){
    this.rentalService.getRental().subscribe(response=>{
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

}
