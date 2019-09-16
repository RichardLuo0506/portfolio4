import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog/blog.service';

@Component({
	selector: 'app-blog-preview',
	templateUrl: './blog-preview.component.html',
	styleUrls: ['./blog-preview.component.sass']
})
export class BlogPreviewComponent implements OnInit {
	private _blogs: any[]

	constructor(private blogService: BlogService) { }

	ngOnInit() {
		this._blogs = this.blogService.blogs
	}

	get blogs() {
		return this._blogs
	}
}
