/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */

import Edge from './edge.mjs';
import Node from './node.mjs';
/* eslint-disable no-console */
export default class Knights {
  constructor() {
    this.nodes = [];
  }

  buildGraph() {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const newNode = new Node(i, j);
        this.nodes.push(newNode);
      }
    }
    this.nodes.forEach((node) => {
      if (node.row > 0 && node.edgeTop === null) {
        const nodeTop = this.nodes.find(
          (value) => value.row === node.row - 1 && value.column === node.column
        );

        const newEdge = new Edge(node, nodeTop);
        node.edgeTop = newEdge;
        nodeTop.edgeBottom = newEdge;
      }
      if (node.column > 0 && node.edgeLeft === null) {
        const nodeLeft = this.nodes.find(
          (value) => value.row === node.row && value.column === node.column - 1
        );
        const newEdge = new Edge(node, nodeLeft);
        node.edgeLeft = newEdge;
        nodeLeft.edgeRight = newEdge;
      }
    });
  }

  knightMoves(start, end) {
    const visited = new Set();
    const row = start[0];
    const col = start[1];
    const endingRow = end[0];
    const endingCol = end[1];
    const startingNode = this.nodes.find(
      (value) => value.row === row && value.column === col
    );
    const endingNode = this.nodes.find(
      (value) => value.row === endingRow && value.column === endingCol
    );
    const queue = [startingNode];
    const counter = this.helperQueue(queue, startingNode, endingNode, visited);
    return counter;
  }

  helperQueue(queue, startingNode, endingNode, visited) {
    if (startingNode === endingNode) {
      return 'Found';
    }
    const currentNode = queue[0];
    const pos = `${currentNode.row},${currentNode.column}`;
    const isVisited = this.isVisited(pos, visited);
    if (isVisited === true) {
      return 0;
    }

    visited.add(pos);

    if (currentNode.edgeBottom !== null) {
      queue.push(currentNode.edgeBottom.node1);
    }
    if (currentNode.edgeTop !== null) {
      queue.push(currentNode.edgeTop.node1);
    }
    if (currentNode.edgeLeft !== null) {
      queue.push(currentNode.edgeLeft.node1);
    }
    if (currentNode.edgeRight !== null) {
      queue.push(currentNode.edgeRight.node1);
    }
    queue.shift();
    this.helperQueue(queue, visited);
  }

  isVisited(pos, visited) {
    if (visited.has(pos)) {
      return true;
    }
    return false;
  }
}
