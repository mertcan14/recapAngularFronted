import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'app/models/color/color';
import { ColorService } from 'app/services/color/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  dataLoaded:boolean = false;
  filterColorText="";
  dataCarsLoaded= false;
  constructor(private colorService:ColorService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url =>{
      if (url[0].path == "cars") {
        this.getColor();
        this.dataCarsLoaded=true;
      }
      else{
        this.getColor();
      }
    })
  }

  getColor(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }
  // setRouter(){
  //   if (this.selectedColor === "") {
      
  //   }
  //   else{
  //     return "/cars/color/" + this.selectedColor
  //   }
  // }
}
