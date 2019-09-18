interface ProjectOpts {
	title: string,
	subtitle?: string,
	imgSrc?: string,
	description?: string,
}

export class Project {
	constructor(opts: ProjectOpts) {
		Object.assign(this, opts)
		console.log(this);
	}
}