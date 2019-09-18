import OpenSimplexNoise from 'open-simplex-noise';

export class AmbientCanvas {
	private utils: any = {}
	private defaults: any = {}
	private config: any = {}

	// common
	private container
	private canvas
	private ctx
	private center
	private gradient
	private tick
	private particleProps
	private positions
	private velocities
	private lifeSpans
	private speeds
	private sizes
	private hues
	private simplex

	// per config
	private particleCount
	private particlePropCount
	private baseTTL
	private rangeTTL
	private baseSpeed
	private rangeSpeed
	private baseSize
	private rangeSize
	private baseHue
	private rangeHue
	private noiseSteps
	private xOff
	private yOff
	private zOff
	private backgroundColor
	private particlePropsLength
	private rangeY
	private baseRadius
	private rangeRadius

	constructor(private type: string) {
		// utils
		this.utils.PI = Math.PI
		this.utils.cos = Math.cos
		this.utils.sin = Math.sin
		this.utils.abs = Math.abs
		this.utils.sqrt = Math.sqrt
		this.utils.pow = Math.pow
		this.utils.round = Math.round
		this.utils.random = Math.random
		this.utils.atan2 = Math.atan2
		this.utils.HALF_PI = 0.5 * this.utils.PI
		this.utils.TAU = 2 * this.utils.PI
		this.utils.TO_RAD = this.utils.PI / 180
		this.utils.floor = n => n | 0
		this.utils.rand = n => n * this.utils.random()
		this.utils.randIn = (min, max) => this.utils.rand(max - min) + min
		this.utils.randRange = n => n - this.utils.rand(2 * n)
		this.utils.fadeIn = (t, m) => t / m
		this.utils.fadeOut = (t, m) => (m - t) / m
		this.utils.fadeInOut = (t, m) => {
			let hm = 0.5 * m
			return this.utils.abs((t + hm) % m - hm) / (hm)
		}
		this.utils.dist = (x1, y1, x2, y2) => this.utils.sqrt(this.utils.pow(x2 - x1, 2) + this.utils.pow(y2 - y1, 2))
		this.utils.angle = (x1, y1, x2, y2) => this.utils.atan2(y2 - y1, x2 - x1)
		this.utils.lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2

		// defaults
		this.defaults.coalesce = {
			// particleCount: 700,
			particleCount: 200,
			particlePropCount: 9,
			baseTTL: 100,
			rangeTTL: 500,
			baseSpeed: 0.1,
			rangeSpeed: 1,
			baseSize: 2,
			// rangeSize: 10,
			rangeSize: 5,
			// baseHue: 10,
			baseHue: 220,
			rangeHue: 100,
			noiseSteps: 2,
			xOff: 0.0025,
			yOff: 0.005,
			zOff: 0.0005,
			backgroundColor: 'hsla(60,50%,3%,1)',
		}
		this.defaults.coalesce.particlePropsLength = this.defaults.coalesce.particleCount * this.defaults.coalesce.particlePropCount

		this.defaults.swirl = {
			particleCount: 700,
			particlePropCount: 9,
			rangeY: 100,
			baseTTL: 50,
			rangeTTL: 150,
			baseSpeed: 0.1,
			rangeSpeed: 2,
			baseRadius: 1,
			rangeRadius: 4,
			baseHue: 220,
			rangeHue: 100,
			noiseSteps: 8,
			// xOff: 0.00125,
			xOff: 0.000125,
			// yOff: 0.00125,
			yOff: 0.000125,
			// zOff: 0.0005,
			zOff: 0.0001,
			backgroundColor: 'hsla(260,40%,5%,1)',
		}

		this.defaults.swirl.particlePropsLength = this.defaults.coalesce.particleCount * this.defaults.coalesce.particlePropCount


		this.extendConfig(this.defaults[type])
	}

	extendConfig(def) {
		for (let prop in def) {
			this[prop] = def[prop]
		}
	}

	setup() {
		this.createCanvas()
		this.resize()
		this.initParticles()
		this.draw()
	}

	createCanvas() {
		this.container = document.querySelector('.content--canvas')
		this.canvas = {
			a: document.createElement('canvas'),
			b: document.createElement('canvas')
		}
		this.canvas.b.style = `
			width: 100%
			height: 100%
		`
		this.container.appendChild(this.canvas.b)
		this.ctx = {
			a: this.canvas.a.getContext('2d'),
			b: this.canvas.b.getContext('2d')
		}
		this.center = []
	}

	resize() {
		const { offsetWidth, offsetHeight } = this.container

		this.canvas.a.width = offsetWidth
		this.canvas.a.height = offsetHeight

		this.ctx.a.drawImage(this.canvas.b, 0, 0)

		this.canvas.b.width = offsetWidth
		this.canvas.b.height = offsetHeight

		this.ctx.b.drawImage(this.canvas.a, 0, 0)

		this.center[0] = 0.5 * this.canvas.a.width
		this.center[1] = 0.5 * this.canvas.a.height
	}

	initParticles() {
		this.tick = 0

		if (this.type === 'swirl')
			this.simplex = new OpenSimplexNoise(Date.now())

		this.particleProps = new Float32Array(this.particlePropsLength)

		let i

		for (i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
			this.initParticle(i)
		}
	}

	initParticle(i) {
		if (this.type === 'coalesce') {
			let theta, x, y, vx, vy, life, ttl, speed, size, hue
			x = this.utils.rand(this.canvas.a.width)
			y = this.utils.rand(this.canvas.a.height)
			theta = this.utils.angle(x, y, this.center[0], this.center[1])
			vx = this.utils.cos(theta) * 6
			vy = this.utils.sin(theta) * 6
			life = 0
			ttl = this.baseTTL + this.utils.rand(this.rangeTTL)
			speed = this.baseSpeed + this.utils.rand(this.rangeSpeed)
			size = this.baseSize + this.utils.rand(this.rangeSize)
			hue = this.baseHue + this.utils.rand(this.rangeHue)

			this.particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i)
		} else if (this.type === 'swirl') {
			let x, y, vx, vy, life, ttl, speed, radius, hue;

			x = this.utils.rand(this.canvas.a.width);
			y = this.center[1] + this.utils.randRange(this.rangeY);
			vx = 0;
			vy = 0;
			life = 0;
			ttl = this.baseTTL + this.utils.rand(this.rangeTTL);
			speed = this.baseSpeed + this.utils.rand(this.rangeSpeed);
			radius = this.baseRadius + this.utils.rand(this.rangeRadius);
			hue = this.baseHue + this.utils.rand(this.rangeHue);

			this.particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
		}
	}

	draw() {
		this.tick++
		this.ctx.a.clearRect(0, 0, this.canvas.a.width, this.canvas.a.height)
		this.ctx.b.fillStyle = this.backgroundColor
		this.ctx.b.fillRect(0, 0, this.canvas.a.width, this.canvas.a.height)

		this.drawParticles()
		this.renderGlow()
		this.render()

		window.requestAnimationFrame(this.draw.bind(this))
	}

	drawParticles() {
		let i

		for (i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
			this.updateParticle(i)
		}
	}

	updateParticle(i) {
		if (this.type === 'coalesce') {
			let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i
			let x, y, theta, vx, vy, life, ttl, speed, x2, y2, size, hue

			x = this.particleProps[i]
			y = this.particleProps[i2]
			theta = this.utils.angle(x, y, this.center[0], this.center[1]) + 0.75 * this.utils.HALF_PI
			vx = this.utils.lerp(this.particleProps[i3], 2 * this.utils.cos(theta), 0.05)
			vy = this.utils.lerp(this.particleProps[i4], 2 * this.utils.sin(theta), 0.05)
			life = this.particleProps[i5]
			ttl = this.particleProps[i6]
			speed = this.particleProps[i7]
			x2 = x + vx * speed
			y2 = y + vy * speed
			size = this.particleProps[i8]
			hue = this.particleProps[i9]

			this.drawParticleCoalesce(x, y, theta, life, ttl, size, hue)

			life++

			this.particleProps[i] = x2
			this.particleProps[i2] = y2
			this.particleProps[i3] = vx
			this.particleProps[i4] = vy
			this.particleProps[i5] = life

			life > ttl && this.initParticle(i)
		} else if (this.type === 'swirl') {
			let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i
			let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue

			x = this.particleProps[i]
			y = this.particleProps[i2]
			n = this.simplex.noise3D(x * this.xOff, y * this.yOff, this.tick * this.zOff) * this.noiseSteps * this.utils.TAU
			vx = this.utils.lerp(this.particleProps[i3], this.utils.cos(n), 0.5)
			vy = this.utils.lerp(this.particleProps[i4], this.utils.sin(n), 0.5)
			life = this.particleProps[i5]
			ttl = this.particleProps[i6]
			speed = this.particleProps[i7]
			x2 = x + vx * speed
			y2 = y + vy * speed
			radius = this.particleProps[i8]
			hue = this.particleProps[i9]

			this.drawParticleSwirl(x, y, x2, y2, life, ttl, radius, hue)

			life++

			this.particleProps[i] = x2
			this.particleProps[i2] = y2
			this.particleProps[i3] = vx
			this.particleProps[i4] = vy
			this.particleProps[i5] = life;

			(this.checkBounds(x, y) || life > ttl) && this.initParticle(i)
		}
	}
	checkBounds(x, y) {
		return (
			x > this.canvas.a.width ||
			x < 0 ||
			y > this.canvas.a.height ||
			y < 0
		)
	}

	drawParticleCoalesce(x, y, theta, life, ttl, size, hue) {
		let xRel = x - (0.5 * size), yRel = y - (0.5 * size)

		this.ctx.a.save()
		this.ctx.a.lineCap = 'round'
		this.ctx.a.lineWidth = 1
		this.ctx.a.strokeStyle = `hsla(${hue},100%,60%,${this.utils.fadeInOut(life, ttl)})`
		this.ctx.a.beginPath()
		this.ctx.a.translate(xRel, yRel)
		this.ctx.a.rotate(theta)
		this.ctx.a.translate(-xRel, -yRel)
		this.ctx.a.strokeRect(xRel, yRel, size, size)
		this.ctx.a.closePath()
		this.ctx.a.restore()
	}

	drawParticleSwirl(x, y, x2, y2, life, ttl, radius, hue) {
		this.ctx.a.save()
		this.ctx.a.lineCap = 'round'
		this.ctx.a.lineWidth = radius
		this.ctx.a.strokeStyle = `hsla(${hue},100%,60%,${this.utils.fadeInOut(life, ttl)})`
		this.ctx.a.beginPath()
		this.ctx.a.moveTo(x, y)
		this.ctx.a.lineTo(x2, y2)
		this.ctx.a.stroke()
		this.ctx.a.closePath()
		this.ctx.a.restore()
	}

	renderGlow() {
		this.ctx.b.save()
		this.ctx.b.filter = 'blur(8px) brightness(200%)'
		this.ctx.b.globalCompositeOperation = 'lighter'
		this.ctx.b.drawImage(this.canvas.a, 0, 0)
		this.ctx.b.restore()

		this.ctx.b.save()
		this.ctx.b.filter = 'blur(4px) brightness(200%)'
		this.ctx.b.globalCompositeOperation = 'lighter'
		this.ctx.b.drawImage(this.canvas.a, 0, 0)
		this.ctx.b.restore()
	}

	render() {
		this.ctx.b.save()
		this.ctx.b.globalCompositeOperation = 'lighter'
		this.ctx.b.drawImage(this.canvas.a, 0, 0)
		this.ctx.b.restore()
	}
}