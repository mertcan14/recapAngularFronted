import { Component, OnInit } from '@angular/core';
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
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColor();
  }

  getColor(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }
}
