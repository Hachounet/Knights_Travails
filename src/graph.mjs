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
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const concatActualElement = i.toString().concat(j.toString());

        const jNext = j + 1;
        const concatNextElementInRow = i.toString().concat(jNext.toString());

        const previousRow = i - 1;
        const concatPreviousRow = previousRow.toString().concat(j.toString());

        const nextRow = i + 1;
        const concatNextRow = nextRow.toString().concat(j.toString());

        this.addEdge(concatActualElement, concatNextElementInRow);
        this.addEdge(concatActualElement, concatPreviousRow);
        this.addEdge(concatActualElement, concatNextRow);
      }
    }
  }

  bfs(source, destination) {
    const queue = [source];

    const visited = new Set();
    let knightMoves = 0;
    while (queue.length !== 0) {
      let current = queue.shift();

      while (visited.has(current)) {
        current = queue.shift();
      }
      if (current === destination) {
        console.log('Ive found the position.');
        console.log(`This is number of moves before found : ${knightMoves}`);
        return;
      }
      knightMoves += 1;

      const row = Number(current.charAt(0));
      const column = Number(current.charAt(1));

      visited.add(current);
      console.log(visited);

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
