function setup() {
	createCanvas(500, 100).parent('canvasContainer')
	angleMode(DEGREES)
	frameRate(60)
	background(200)

	system.init()
	filter(BLUR, 13)
	system.reDraw()
}

let system = {
	// SYSTEM PROPERTIES
	canvasWidth: null,
	canvasHeight: null,

	noiseSensitivity: 0.45,
	blurSensitivity: 0.6,

	// NOISE PROPERTIES
	noiseScale: 0.025,

	init() {
		this.canvasWidth = width
		this.canvasHeight = height

		this.drawPoint()
	},

	drawPoint() {
		let simplex = new SimplexNoise()
		strokeWeight(1)
		for (let i = 0; i < this.canvasHeight; i++) {
			for (let j = 0; j < this.canvasWidth; j++) {
				simplex.noise2D(j * this.noiseScale, i * this.noiseScale) + 0.5 > this.noiseSensitivity ? stroke(0) : stroke(255)
				// noise(j * this.noiseScale, i * this.noiseScale) > this.noiseSensitivity ? stroke(0) : stroke(255)
				point(j, i)
			}
		}
	},

	reDraw() {
		let black = color(0)
		let white = color(255)
		for (let i = 0; i < this.canvasHeight; i++) {
			for (let j = 0; j < this.canvasWidth; j++) {
				let pixelColor = get(j, i)[0]
				if (pixelColor > 127) {
					set(j, i, white)
				} else {
					set(j, i, black)
				}
			}
		}
		updatePixels()
	},
}

function draw() {}
