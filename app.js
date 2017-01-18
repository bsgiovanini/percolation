import PCWQuickUnion from './components/PCWQuickUnion.js';


window.onload = () => {


	const run = document.querySelector(".run");

	let freq = 1000;

	Math.getRandomInt = (min, max) => {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	let interval = null;
	
	run.addEventListener("click", (event) => {

		if(interval) clearInterval(interval);
		
		const drawContainer = document.querySelector(".percolation-view-container");
		const dim = parseInt(document.querySelector(".n").value);
		const freqInput = parseInt(document.querySelector(".n").value);
		freq = (parseInt(freqInput)) ? freqInput: freq;  
		const dims = 100/dim;
		const n = dim*dim;

		drawContainer.innerHTML = '';

		let counter = 0;
		
		for(let i = 1; i <= n; i++) {

			let node = document.createElement("div");
			node.id = i;
			node.classList.add("grid-node");
			node.style.width=`${dims}%`;
			node.style.height=`${dims}%`;
			drawContainer.appendChild(node);			
		}

		const pCWQuickUnion = new PCWQuickUnion(n+2);

		let percolated = false;

		interval = setInterval(() => {
			
			const sorted = Math.getRandomInt(1, n+1);
			const opened = pCWQuickUnion.connectNeighbors(sorted);
			const percolates = pCWQuickUnion.percolates();		

			if(opened && !percolated) {
				let node = document.getElementById(sorted);
				node.classList.add("grid-node-open");
				percolated = percolates;
			}

		}, freq);

	});
};

