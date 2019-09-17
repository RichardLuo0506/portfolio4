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
			new Article('Relearning Angular'),
			new Article('Finally Using ES6'),
		]
	}

	get articles() {
		return this._articles
	}
}
