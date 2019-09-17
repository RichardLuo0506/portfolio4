import { Component, OnInit, HostListener } from '@angular/core';
import { ScriptLoaderService } from '../../script-loader.service';
import { AmbientCanvas } from './ambient-canvas.model';

@Component({
	selector: 'ambient-canvas',
	templateUrl: './ambient-canvas.component.html',
	styleUrls: ['./ambient-canvas.component.sass']
})
export class AmbientCanvasComponent implements OnInit {
	// constructor(private scriptLoader: ScriptLoaderService, private winRef: WindowRef) { }
	constructor(private scriptLoader: ScriptLoaderService) { }

	async ngOnInit() {
		await this.scriptLoader.load('noise')
		let ambientCanvas = new AmbientCanvas('coalesce')
		ambientCanvas.setup()

	}

	@HostListener('window:resize')
	onWindowResize() {

	}
}
