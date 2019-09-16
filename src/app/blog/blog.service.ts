import { Injectable } from '@angular/core';
import { Blog } from './blog.model';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	private _blogs: Blog[]

	constructor() {
		this._blogs = [
			new Blog('New Portfolio Site'),
			new Blog('Relearning Angular')
		]
	}

	get blogs() {
		return this._blogs
	}
}
