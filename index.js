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
	let paths = []
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
		setPaths()
	}
	const clearAll = () => {
		paths = []
		setPaths()
	}
	canvasEl.addEventListener('mousedown', onStart)
	canvasEl.addEventListener('touchstart', onStart)
	canvasEl.addEventListener('mouseup', onEnd)
	canvasEl.addEventListener('touchend', onEnd)
	canvasEl.addEventListener('mousemove', onMove)
	canvasEl.addEventListener('touchmove', onMove)
	document.getElementById('clearAll').addEventListener('click', clearAll)
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

	firebase.initializeApp({
		apiKey: "AIzaSyCP47s7yiMaFVwzl3QGcPf-Yhyx7J5JWqQ",
		authDomain: "my-own-trello-app.firebaseapp.com",
		databaseURL: "https://my-own-trello-app.firebaseio.com",
		projectId: "my-own-trello-app",
		storageBucket: "my-own-trello-app.appspot.com",
		messagingSenderId: "88640639045"
	})
	const db = firebase.database()
	const dbRef = db.ref('draw/paths')
	function setPaths() {
		dbRef.set(paths)
	}
	dbRef.on('value', function(snapshot) {
		paths = snapshot.val() || []
	})
})()