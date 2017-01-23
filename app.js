import PCWQuickUnion from './components/PCWQuickUnion.js';
import MyWorker from "worker-loader!./worker.js";
import {getRandomInt} from './components/PMath';

window.onload = () => {

	//var MyWorker = require();

	var worker = new MyWorker();
	worker.onmessage = (event) => {
		var {finalRatio, stddev} = event.data;
		document.querySelector(".finalRatio").innerHTML = `Average: <em>${finalRatio}</em>`;
		document.querySelector(".stddev").innerHTML = `Standard Deviation: <em>${stddev}</em>`;
	};

	const run = document.querySelector(".run");

	const simulate = document.querySelector(".simulate");

	let freq = 1000;

	let interval = null;
	
	run.addEventListener("submit", (event) => {

		event.preventDefault();

		if(interval) clearInterval(interval);
		
		const drawContainer = document.querySelector(".percolation-view-container");
		const dim = parseInt(document.querySelector(".n").value);
		const freqInput = parseInt(document.querySelector(".f").value);
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
		const pCWQuickUnionBS = new PCWQuickUnion(n+2, false);

		let percolated = false;

		interval = setInterval(() => {
			
			const sorted = getRandomInt(1, n+1);
			const opened = pCWQuickUnion.connectNeighbors(sorted);
			pCWQuickUnionBS.connectNeighbors(sorted);
			const percolates = pCWQuickUnion.percolates();		

			if(opened && !percolated) {
				let node = document.getElementById(sorted);
				node.classList.add("grid-node-open");
				percolated = percolates;
			}

			if (percolated) {

				for(let i = 1; i <= n; i++) {
					if (pCWQuickUnionBS.isConnected(i, sorted)) {
						const nodeFull = document.getElementById(i);
						nodeFull.classList.add("grid-node-full");
					}
				}

				clearInterval(interval);
			}

		}, freq);

		

	});

	simulate.addEventListener("submit", (event) => {

		event.preventDefault();
		
		const dim = parseInt(document.querySelector(".n_r").value);
		const s = parseInt(document.querySelector(".s").value);
		worker.postMessage({n: dim*dim,s});
	});
};

