expect.extend({
  arraysToBeEqual(actual, received) {
    const pass = received.length === actual.length && received.every((r,i) => r === actual[i]);
    const message =
      () => `expected ${received} ${pass ? 'not ' : ''} to be ${actual}`;
    return {message, pass};
  }
});

let PCWQuickUnion = null;

beforeAll(function() {
	PCWQuickUnion = require('../components/PCWQuickUnion').default;
})

test('should construct vector [1,2]', () => {
    
    expect(new PCWQuickUnion(2).id).arraysToBeEqual([undefined, 1, 2]);
});

test('should all sites been closed except n and n-1 after construction', () => {
    
    expect(new PCWQuickUnion(5).open).arraysToBeEqual([undefined, false, false, false, true, true]);
});

test('should return 3 when finding 3 in a recently created array with size 5', () => {
	const qf = new PCWQuickUnion(5);
	expect(qf.root(3)).toBe(3);
	expect(qf.counter).toBe(5);
});


test('should return 3 after union (3,1) when finding 3', () => {
	const qf = new PCWQuickUnion(5);
	expect(qf.union(3,1).root(3)).toBe(3); 
	expect(qf.counter).toBe(4);
	expect(qf.isConnected(3,1)).toBeTruthy();
	expect(qf.isConnected(1,3)).toBeTruthy();

})

test('should return 1 after unions (3,1) and (5,3) when finding 5', () => {
	const qf = new PCWQuickUnion(5);
	expect(qf.union(3,1).union(5,3).root(5)).toBe(3); 
	expect(qf.counter).toBe(3);
	expect(qf.isConnected(3,5)).toBeTruthy();
	expect(qf.isConnected(1,5)).toBeTruthy();
})

test('should return neighbors of sites', () => {
	const qf = new PCWQuickUnion(27);
	expect(qf.getAllNeighbors(1)).arraysToBeEqual([26,6,2]);
	expect(qf.getAllNeighbors(3)).arraysToBeEqual([26,8,2,4]);
	expect(qf.getAllNeighbors(5)).arraysToBeEqual([26,10,4]);
	expect(qf.getAllNeighbors(25)).arraysToBeEqual([20,27,24]);
	expect(qf.getAllNeighbors(23)).arraysToBeEqual([18,27,22,24]);
	expect(qf.getAllNeighbors(21)).arraysToBeEqual([16,27,22]);
	expect(qf.getAllNeighbors(13)).arraysToBeEqual([8,18,12,14]);

}) 

test('percolate between sites in a recently created array', () => {
	const qf = new PCWQuickUnion(11);
	expect(qf.percolates(10, 11)).toBeFalsy();
})

test('connection between sites in a recently created array', () => {
	const qf = new PCWQuickUnion(11);
	qf.connectNeighbors(2);
	expect(qf.isConnected(10, 2)).toBeTruthy();
	expect(qf.isConnected(10, 3)).toBeFalsy();
	expect(qf.isConnected(2, 3)).toBeFalsy();

})

test('percolates test', () => {
	const qf = new PCWQuickUnion(11);
	qf.connectNeighbors(2);
	qf.connectNeighbors(5);
	qf.connectNeighbors(8);
	expect(qf.percolates()).toBeTruthy();
})

