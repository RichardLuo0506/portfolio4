import { Component, OnInit } from '@angular/core';
import { AmbientCanvas } from './ambient-canvas.model';
import { throttle } from 'lodash';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { WindowRef } from '../../window-ref.service';

@Component({
	selector: 'ambient-canvas',
	templateUrl: './ambient-canvas.component.html',
	styleUrls: ['./ambient-canvas.component.sass']
})
export class AmbientCanvasComponent implements OnInit {
	constructor(private winRef: WindowRef) { }

	ngOnInit() {
		this.initCanvas('coalesce')
	}

	initCanvas(type: string) {
		let ambientCanvas = new AmbientCanvas(type)
		ambientCanvas.setup()

		fromEvent(this.winRef.nativeWindow, 'resize').pipe(debounceTime(200)).subscribe(() => {
			ambientCanvas.resize()
		})
	}
}
