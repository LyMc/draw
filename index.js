(() => {
	const canvasEl = document.getElementById('canvas')
	let width
	let height
	canvasEl.width = width = window.innerWidth
	canvasEl.height = height = window.innerHeight
	const ctx = canvasEl.getContext('2d')
	let isClicked = false
	let wasClicked = false
	let last = 0
	const paths = []
	window.addEventListener('resize', () => {
		canvasEl.width = width = window.innerWidth
		canvasEl.height = height = window.innerHeight
	})
	canvasEl.addEventListener('mousedown', () => {
		isClicked = true
	})
	canvasEl.addEventListener('mouseup', () => {
		isClicked = false
		wasClicked = false
	})
	canvasEl.addEventListener('mousemove', (e) => {
		const x = e.clientX - e.target.offsetLeft
		const y = e.clientY - e.target.offsetTop
		if (isClicked && wasClicked) {
			paths[last].push(x, y)
		} else if (isClicked) {
			last = paths.length
			paths[last] = [x, y]
			wasClicked = true
		}
	})
	function draw () {
		ctx.clearRect(0, 0, width, height)
		ctx.beginPath()
		paths.forEach(path => {
			ctx.moveTo(path[0], path[1])
			for (let i = 2; i < path.length; i += 2) {
				ctx.lineTo(path[i], path[i + 1])
			}
		})
		ctx.stroke()
		requestAnimationFrame(draw)
	}
	draw()
})()