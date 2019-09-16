import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

	constructor(private navBarService: NavBarService) { }

	ngOnInit() {
	}

	onSectionChange(sectionId: string) {
		this.navBarService.onSectionChanged(sectionId);
	}
}
