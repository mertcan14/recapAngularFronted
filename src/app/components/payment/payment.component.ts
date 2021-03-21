import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCard } from 'app/models/creditCard/creditCard';
import { Rental } from 'app/models/rental/rental';
import { PaymentService } from 'app/services/payment/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental:Rental;
  totalPrice:string;
  creditNumber:string;
  nameOnCard:string;
  cardCVV:string;
  newCreditCard:CreditCard;
  payMessage:string;
  constructor(private activatedRoute:ActivatedRoute,private router:Router, private toastrService:ToastrService, private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["rental"]) {
        this.rental = JSON.parse(params["rental"])
        this.totalPrice = params["totalPrice"]
      }
    })
  }

  payToRental(){
    this.newCreditCard={
      totalPrice: Number(this.totalPrice),
      customerId: this.rental.CustomerId,
      creditNumber: this.creditNumber,
      nameOnCard: this.nameOnCard,
      cardCVV: this.cardCVV
    }
    this.paymentService.payToRental(this.newCreditCard).subscribe(response=>{
      this.toastrService.success(response.messages)
      this.router.navigate(["/rentals/pay/", JSON.stringify(this.rental)])
    },
    err=>{
      this.toastrService.error(err.messages)
    })
  }

}
