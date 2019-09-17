import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog/blog.service';

@Component({
	selector: 'app-blog-preview',
	templateUrl: './blog-preview.component.html',
	styleUrls: ['./blog-preview.component.sass']
})
export class BlogPreviewComponent implements OnInit {
	private _articles: any[]
	private articleIndex = 0
	private featuredArticle

	constructor(private blogService: BlogService) { }

	ngOnInit() {
		this._articles = this.blogService.articles
		this.featuredArticle = this._articles[this.articleIndex]
	}

	get articles() {
		return this._articles
	}
}
