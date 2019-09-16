export class Blog {
	private link: string

	constructor(
		private title: string,
		private description?: string,
		private content?: string,
	) {
		this.link = this.titleToUrl(this.title)

	}

	titleToUrl(title: string) {
		return title.toLowerCase().replace(/\s/g, '-')
	}
}