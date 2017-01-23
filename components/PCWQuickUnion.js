export default class PCWQuickUnion {
    
    constructor(n, bw = true) {
        this.bw = bw;
        this.dim = Math.sqrt(n-2);
        this.nodeZeroId = n-1;
        this.nodeEndId = n;
        this.sw = [];
        this.id = [];
        this.open = [];
        for(let i = 1; i <= n; i++ ) {
            this.sw[i] = 1;
            this.id[i] = i;
            this.open[i] = false;
        }

        this.open[this.nodeZeroId] = bw;
        this.open[this.nodeEndId] = bw;
        
        this.counter = n;
    }
    //Find component name
    root (p) { 
        while (p != this.id[p]) {
            this.id[p] = this.id[this.id[p]];
            p = this.id[p];
        } 
        return p;
    }

    openSite(p) {
        this.open[p] = true;
    }

    isOpened(p) {
        return this.open[p];
    }

    connectNeighbors(p) {
        if(!this.isOpened(p)) {
            this.openSite(p);
            this.getAllNeighbors(p).forEach((site) => {
                if (this.isOpened(site)) {
                    this.union(p, site);
                }
            });

            return true;
        }
        return false;
        
    }

    percolates() {
        return this.isConnected(this.nodeZeroId, this.nodeEndId);
    }


    getAllNeighbors(p) {
        const line = Math.ceil(p/this.dim);
        const column = (p % this.dim === 0) ? this.dim : p % this.dim;
        const neighbors = [];
        if (line > 1) {
            const nPreviousLine = this.dim*(line-2) + column;
            neighbors.push(nPreviousLine);
        } else {
            neighbors.push(this.nodeZeroId);
        }
        if (line < this.dim) {
            const nNextLine = this.dim*(line) + column;
            neighbors.push(nNextLine);           
        } else {
            neighbors.push(this.nodeEndId);
        }
        if (column > 1) {
            const nPreviousColumn = this.dim*(line-1) + column - 1;
            neighbors.push(nPreviousColumn);
        }
        if (column < this.dim) {
            const nNextColumn = this.dim*(line-1) + column + 1;
            neighbors.push(nNextColumn);
        }
        return neighbors;
    }

    union(p,q) {
        
        let rP = this.root(p);
        let rQ = this.root(q);

        if (rP !== rQ) {        
            if (this.sw[rP] < this.sw[rQ]) {
                this.id[rP] = rQ; //root of p <= root of q
                this.sw[rQ] += this.sw[rP]; //q tree size += p tree size
            } else {
                this.id[rQ] = rP; //root of q <= root of p
                this.sw[rP] += this.sw[rQ]; //p tree size += q tree size
            }
            
            this.counter--;
        }

        return this;
    }

    isConnected(p, q) {
        return this.root(p) === this.root(q);
    }

}

