import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.css']
})
export class LocationInputComponent implements OnInit {

  @ViewChild('locationInput') ref: ElementRef<HTMLInputElement>;

  constructor(private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
    const options = {
      componentRestrictions: {country: 'us'},
      fields: [],
      types: []
    };
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.ref.nativeElement);
    });
  }

}
