import { Component } from '@angular/core';
import {Router} from '@angular/router';
import * as jQuery from 'jquery';
import 'metisMenu';
//import 'jquery-slimscroll';
//declare var jQuery: any;
//declare let jQuery: any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    //if (jQuery("body").hasClass('fixed-sidebar')) {
    //  jQuery('.sidebar-collapse').slimscroll({
    //    height: '100%'
    //  })
    //}
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

}
