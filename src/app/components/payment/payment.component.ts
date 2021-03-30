import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCard } from 'app/models/creditCard/creditCard';
import { CreditCardDto } from 'app/models/creditCard/creditCardDto';
import { Rental } from 'app/models/rental/rental';
import { AuthService } from 'app/services/auth/auth.service';
import { CreditCardService } from 'app/services/creditcards/credit-card.service';
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
  newCreditCard:CreditCardDto;
  newCreditCardAdd:CreditCard;
  payMessage:string;
  cardAddCheck:boolean=false;
  isAuth : boolean = false;
  creditCards:CreditCard[] = [];
  idUser:number;
  constructor(private activatedRoute:ActivatedRoute,
      private router:Router,
      private toastrService:ToastrService,
      private paymentService:PaymentService,
      private authService:AuthService,
      private creditCardService:CreditCardService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth()
    this.activatedRoute.params.subscribe(params=>{
      if (params["rental"]) {
        this.rental = JSON.parse(params["rental"])
        this.totalPrice = params["totalPrice"]
      }
    })
    if (this.isAuth == true) {
      this.idUser = this.authService.getNameIdentifier()
      this.getCreditCard(this.idUser);
    }
  }

  checkCardAdd(){
    if (this.cardAddCheck == false) {
      this.payToRental()
    }
    else{
      this.addCard();
    }
  }

  // TODO: Form Group ile refactoring gerçekleştir form için
  payToRental(){
    this.newCreditCard={
      totalPrice: Number(this.totalPrice),
      userId: this.idUser,
      creditNumber: this.creditNumber,
      nameOnCard: this.nameOnCard,
      cardCvv: this.cardCVV
    }
    console.log(this.newCreditCard)
    this.paymentService.payToRental(this.newCreditCard).subscribe(response=>{
      this.toastrService.success(response.messages)
      this.router.navigate(["/rentals/pay/", JSON.stringify(this.rental)])
    },
    err=>{
      this.toastrService.error(err.messages)
    })
  }

  addCard(){
    this.newCreditCardAdd={
      userId: this.authService.getNameIdentifier(),
      cardCvv:this.cardCVV,
      nameOnCard:this.nameOnCard,
      creditNumber:this.creditNumber
    }
    console.log(typeof(this.authService.getNameIdentifier()))
    this.creditCardService.add(this.newCreditCardAdd).subscribe(response=>{
      this.toastrService.success(response.messages, "Başarılı")
      this.payToRental();
    },
    err=>{
      this.toastrService.error("Hata alındı", "Hata")
    })
  }

  getCreditCard(userId:number){
    this.creditCardService.getbyUserId(userId).subscribe(response=>{
      this.creditCards = response.data;
      console.log(this.creditCards)
    })
  }

  registeredCardToPay(creditCard:CreditCard){
    this.cardCVV = creditCard.cardCvv;
    this.creditNumber = creditCard.creditNumber;
    this.nameOnCard = creditCard.nameOnCard;
    this.payToRental();
  }
  deleteCard(id:number){
    this.creditCardService.delete(id).subscribe(response=>{
      window.location.reload();
      this.toastrService.success(response.messages, "Başarılı")
    },
    err=>{
      this.toastrService.info(err.error, "Dikkat")
    })
  }
}
