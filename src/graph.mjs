/* eslint-disable no-console */
export default class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      return;
    }
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }

  populateGraph() {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const concat = i.toString().concat(j.toString());
        this.addVertex(concat);
      }
    }
  }

  populateEdges() {
    const valuesToRow = [+1, +1, -1, -1, +2, +2, -2, -2];
    const valuesToColumn = [-2, +2, -2, +2, +1, -1, -1, +1];

    const array = Object.keys(this.adjacencyList);

    array.forEach((key) => {
      const rowStr = key.slice(0, 1);
      const columnStr = key.slice(1);

      for (let i = 0; i < valuesToRow.length; i += 1) {
        const calcRow = Number(rowStr) + valuesToRow[i];
        const calcColumn = Number(columnStr) + valuesToColumn[i];

        const concat = calcRow.toString().concat(calcColumn.toString());

        this.addEdge(key, concat);
      }
    });
  }

  bfs(source, destination) {
    const queue = [source];
    const result = [];
    const visited = new Set();
    let knightMoves = 0;
    while (queue.length !== 0) {
      let max = queue[0];
      for (let i = 0; i < queue.length; i += 1) {
        if (queue[i] > max) {
          max = queue[i];
        }
      }
      let current = max;

      while (visited.has(current)) {
        current = queue.shift();
      }
      console.log(visited);
      if (current === destination) {
        console.log('Ive found the position.');
        console.log(`This is number of moves before found : ${knightMoves}`);
        return;
      }
      knightMoves += 1;

      visited.add(current);

      const neighbor = this.adjacencyList[current];

      neighbor.forEach((value) => {
        if (visited.has(value)) {
          return;
        }

        queue.push(value);
      });
    }
  }
}
