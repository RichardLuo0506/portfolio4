import { Injectable } from '@angular/core';
import { Article } from './article.model';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	private _articles: Article[]

	constructor() {
		this._articles = [
			new Article('New Portfolio Site', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
			new Article('Relearning Angular', 'Est cu graeci aeterno deseruisse. Dicat animal electram ea pro, sit magna singulis id. Malorum referrentur interpretaris te usu. Ut senserit expetendis referrentur his, ex eam populo voluptatum.'),
			new Article('Finally Using ES6', 'Errem inimicus et pro, ex primis prodesset cum, delicata pericula percipitur sed ne. Pri dicat percipit ea, ius modus tollit regione ei. Sed no augue integre, id vim libris iriure cotidieque, admodum denique ex ius. In suas reque lucilius sed, vix veniam denique et.'),
		]
	}

	get articles() {
		return this._articles
	}
}
