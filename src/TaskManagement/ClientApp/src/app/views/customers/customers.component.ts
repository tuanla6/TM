import { Component } from '@angular/core';
import { fadeInOut } from '../../services/animations';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [fadeInOut]
})
export class CustomersComponent {

}
