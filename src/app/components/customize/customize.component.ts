import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
//import { DocumentEditorComponent } from '@syncfusion/ej2-angular-documenteditor';
import * as jsPDF from 'jspdf'
import { DataService } from 'src/shared/services/data.service';
@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomizeComponent implements OnInit {
  
  formattedAddress : Address;
  addressvec : Address[] = [ ];    
  //constructor(public docEdit : DocumentEditorComponent) { }
  constructor(public dataService : DataService) { }
  ngOnInit() {
  }
  placesRef : GooglePlaceDirective;
  options = {
    componentRestrictions : {
      country : ['IN']
    }
  }
  public handleAddressChange(address: Address) {
    this.formattedAddress = address;
    const t = address
    this.addressvec.push(t)
  }
  //https://stackoverflow.com/questions/1859185/how-to-force-sequential-javascript-execution
  public shortest_path () 
  {
    let a : string[] = [ ];
    let send : string = '';
    this.addressvec.forEach((t) => {
      send = send + t.id + '&' + t.geometry.location.lat() + '&' + t.geometry.location.lng() + '&'
    })
    this.dataService.getpy('path/'+send).subscribe((data) => {
      let addressvecf : Address [] = [ ];
      console.log(data)
      a = this.anu(data);
      a = this.anu(a)
      console.log("a after anu fn", a);
      a.forEach(it => {
        let addressvect = this.addressvec;
        addressvect.forEach((item) => {
          console.log("item.id ",item.id)
          console.log("it", it)
          if(item.id == it)
          {
            addressvecf.push(item);
          }
        })
        console.log("this.addressvecf", addressvecf)
        //console.log("this.addressvecf", this.addressvecf)
      })
      this.addressvec = addressvecf;
      console.log("this.addressvec", this.addressvec)
    })
   
  }
  anu (value: any, args?: any[]): any[] 
  {
    // check if "routes" exists
    if(value) {
      // create instance vars to store keys and final output
      let keyArr: any[] = Object.keys(value);
      let dataArr :string[] = [];
      // loop through the object,
      // pushing values to the return array
      keyArr.forEach((key: any) => {
          dataArr.push(value[key]);
          console.log("This if from anu fn : key", key);
          console.log("This if from anu fn : val", value[key]);
      });
      // return the resulting array
      return dataArr;
    }
  }
  removeItem (add : Address)
  {
    this.addressvec.splice(this.addressvec.indexOf(add), 1)
  }

  gen_button()
  {
    this.shortest_path();
  }

  @ViewChild('content', {static: false}) content : ElementRef
  geniti()
  {
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor' : function(element, renderer)
      {
        return true;
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, { 'width' : 190, elementHandlers : specialElementHandlers})
    doc.save('itinerary.pdf');
  }
}