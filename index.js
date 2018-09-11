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
	const onStart = () => {
		isClicked = true
	}
	const onEnd = () => {
		isClicked = false
		wasClicked = false
	}
	const onMove = (e) => {
		e.preventDefault()
		const c = e.type === 'touchmove' ? e.touches[0] : e
		const x = c.clientX
		const y = c.clientY
		if (isClicked && wasClicked) {
			paths[last].push(x, y)
		} else if (isClicked) {
			last = paths.length
			paths[last] = [x, y]
			wasClicked = true
		}
	}
	canvasEl.addEventListener('mousedown', onStart)
	canvasEl.addEventListener('touchstart', onStart)
	canvasEl.addEventListener('mouseup', onEnd)
	canvasEl.addEventListener('touchend', onEnd)
	canvasEl.addEventListener('mousemove', onMove)
	canvasEl.addEventListener('touchmove', onMove)
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