import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../script-loader.service';

@Component({
	selector: 'ambient-canvas',
	templateUrl: './ambient-canvas.component.html',
	styleUrls: ['./ambient-canvas.component.sass']
})
export class AmbientCanvasComponent implements OnInit {

	constructor(private scriptLoader: ScriptLoaderService) { }

	async ngOnInit() {
		let boob = await this.scriptLoader.load('noise', 'util', 'coalesce')
		console.log(boob);
	}
}
