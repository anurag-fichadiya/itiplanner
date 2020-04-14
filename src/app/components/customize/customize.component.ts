import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
//import { DocumentEditorComponent } from '@syncfusion/ej2-angular-documenteditor';
import * as jsPDF from 'jspdf'
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
  constructor( ) { }
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
    console.log(this.formattedAddress)
    console.log("this.formattedAddress", this.formattedAddress.photos[0].getUrl)
  }

  removeItem (add : Address)
  {
    this.addressvec.splice(this.addressvec.indexOf(add), 1)
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
