import { Component, OnInit } from '@angular/core';
import { NavBarService } from './nav-bar.service';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {
	section = 'Welcome';

	constructor(private navBarService: NavBarService) { }

	ngOnInit() {
		this.navBarService.sectionChanged.subscribe(section => this.section = section);
	}
}
