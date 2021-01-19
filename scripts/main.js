function setup() {
	angleMode(DEGREES)
	frameRate(60)

	system.init()
}

let system = {
	// SYSTEM PROPERTIES
	canvas: null,
	imgWidth: null,
	imgHeight: null,

	noiseSensitivity: 0.4,
	blurSensitivity: 13,

	// NOISE PROPERTIES
	noiseScale: 0.02,

	init() {
		this.imgWidth = 300
		this.imgHeight = 150

		datGuiSetup()

		system.generate()
	},

	generate() {
		this.canvas = createCanvas(this.imgWidth, this.imgHeight).parent('#canvasContainer')
		this.drawPoint()
		filter(BLUR, this.blurSensitivity)
		loadPixels()
		this.reDraw()
	},

	drawPoint() {
		let simplex = new SimplexNoise()
		strokeWeight(1)
		for (let i = 0; i < this.imgWidth; i++) {
			for (let j = 0; j < this.imgHeight; j++) {
				simplex.noise2D(j * this.noiseScale, i * this.noiseScale) + 0.5 > this.noiseSensitivity ? stroke(0) : stroke(255)
				point(i, j)
			}
		}
	},

	reDraw() {
		for (let i = 0; i < this.imgWidth; i++) {
			for (let j = 0; j < this.imgHeight; j++) {
				let pixelColor = get(i, j)[0]
				if (pixelColor > 127) {
					stroke('white')
				} else {
					stroke('black')
				}
				point(i, j)
			}
		}
	},

	save() {
		saveCanvas('noiseStain', 'png')
	},
}

function draw() {}

function datGuiSetup() {
	let gui = new dat.GUI({ width: 410 })

	gui.add(system, 'imgWidth', 0, window.innerWidth).name('Longueur')
	gui.add(system, 'imgHeight', 0, window.innerHeight).name('Largeur')
	gui.add(system, 'noiseScale', 0, 0.05).name('Densité')
	gui.add(system, 'blurSensitivity', 0, 50).name('Lissage')

	gui.add(system, 'save').name('Sauvegarder')
	gui.add(system, 'generate').name('Générer')
}
