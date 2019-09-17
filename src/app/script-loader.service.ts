import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class ScriptLoaderService {
	private scripts = {
		// Ambient Canvas Backgrounds
		noise: { src: '../lib/ambient-canvas-backgrounds/noise.min.js' },
		util: { src: '../lib/ambient-canvas-backgrounds/util.js' },
		coalesce: { src: '../lib/ambient-canvas-backgrounds/coalesce.js' },
		swirl: { src: '../lib/ambient-canvas-backgrounds/swirl.js' },
	};

	constructor() { }

	load(...scripts: string[]) {
		const promises = [];
		scripts.forEach(script => promises.push(this.loadScript(script)))

		return Promise.all(promises)
	}

	loadScript(name: string) {
		var self = this;
		return new Promise((resolve, reject) => {
			if (!this.scripts[name])
				resolve({ script: name, loaded: false, status: 'Does not Exist' })
			if (this.scripts[name].loaded) {
				resolve({ script: name, loaded: true, status: 'Already Loaded' })
			} else {
				const script = document.createElement('script')
				script.type = 'text/javascript'
				script.src = this.scripts[name].src
				// cross browser handling of onLoaded event
				if (script['readyState']) {  // IE
					script['onreadystatechange'] = () => {
						if (script['readyState'] === 'loaded' || script['readyState'] === 'complete') {
							script['onreadystatechange'] = null
							this.scripts[name].loaded = true
							resolve({ script: name, loaded: true, status: 'Loaded' })
						}
					}
				} else {  // Others
					script.onload = () => {
						this.scripts[name].loaded = true
						resolve({ script: name, loaded: true, status: 'Loaded' })
					}
				}
				script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Error' })
				document.getElementsByTagName('head')[0].appendChild(script)
			}
		})
	}
}
