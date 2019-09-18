import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ChangeDetectorRef } from "@angular/core";
import { BlogService } from '../../blog/blog.service';

type Orientation = ("prev" | "next" | "none")

@Component({
	selector: 'app-blog-preview',
	templateUrl: './blog-preview.component.html',
	styleUrls: ['./blog-preview.component.sass'],
	animations: [
		trigger(
			"slideAnimation",
			[
				transition(
					"void => prev", // ---> Entering --->
					[
						style({
							transform: 'translateX(-100%)',
							opacity: 0.0,
						}),
						animate(
							"300ms ease-in-out",
							style({
								transform: 'translateX(0)',
								opacity: 1.0,
							})
						)
					]
				),
				transition(
					"prev => void", // ---> Leaving --->
					[
						animate(
							"300ms ease-in-out",
							style({
								transform: 'translateX(100%)',
								opacity: 0.0
							})
						)
					]
				),
				transition(
					"void => next", // <--- Entering <---
					[
						style({
							transform: 'translateX(100%)',
							opacity: 0.0,

						}),
						animate(
							"300ms ease-in-out",
							style({
								transform: 'translateX(0)',
								opacity: 1.0,

							})
						)
					]
				),
				transition(
					"next => void", // <--- Leaving <---
					[
						animate(
							"300ms ease-in-out",
							style({
								transform: 'translateX(-100%)',
								opacity: 0.0
							})
						)
					]
				)
			]
		)
	]
})


export class BlogPreviewComponent implements OnInit {
	private _articles: any[]
	private currentArticle
	public orientation: Orientation = 'none'
	public disabledDirection = 'left'

	constructor(private blogService: BlogService, private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit() {
		this._articles = this.blogService.articles
		this.currentArticle = this._articles[0]
	}

	get articles() {
		return this._articles
	}

	flipPage(direction) {
		this.orientation = direction
		this.changeDetectorRef.detectChanges()
		let index = this._articles.indexOf(this.currentArticle)
		this.disabledDirection = null
		if (direction == 'next' && this._articles[index + 1]) {
			this.currentArticle = this._articles[index + 1]
			if (index + 1 == this._articles.length - 1)
				this.disabledDirection = 'right'
		}
		else if (direction == 'prev' && this._articles[index - 1]) {
			this.currentArticle = this._articles[index - 1]
			if (index - 1 == 0) {
				this.disabledDirection = 'left'
			}
		}
	}
}
