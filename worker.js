import PCWQuickUnion from './components/PCWQuickUnion';
import {getRandomInt} from './components/PMath';

self.onmessage = function(e) {
	var {n, s} = e.data;

	let sumRatios = 0;

	const ratios = [];

	for (let i = 1; i <= s; i++) {

		let percolates = false;

		const pCWQuickUnion = new PCWQuickUnion(n+2);

		let counter = 0;

		while(!percolates) {
			const sorted = getRandomInt(1, n+1);
			const opened = pCWQuickUnion.connectNeighbors(sorted);
			percolates = pCWQuickUnion.percolates();
			if(opened) {
				counter++;
			}
		}

		const ratio = counter/n;
		ratios.push(ratio);
		sumRatios += ratio;		
	}

	const finalRatio = sumRatios/s;
	let varRatio = ratios.map((r) => Math.pow(r - finalRatio, 2)).reduce((a, b) => { return a + b}, 0);
	varRatio = varRatio/(s-1);
	const stddev = Math.sqrt(varRatio);
	console.log('Posting message back to main script', finalRatio, stddev);
	self.postMessage({finalRatio, stddev});
}