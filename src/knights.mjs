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
    const shortestPath = this.helperQueue(
      queue,
      startingNode,
      endingNode,
      visited
    );
    return shortestPath;
  }

  helperQueue(queue, startingNode, endingNode, visited, path = null) {
    if (startingNode === endingNode) {
      return 'Found';
    }
    if (queue.length < 1) {
      return 'List is empty';
    }
    const currentNode = queue[0];
    const pos = `${currentNode.row},${currentNode.column}`;

    const isVisited = this.isVisited(pos, visited);
    if (isVisited === true) {
      return 'Hey';
    }
    visited.add(pos);
    console.log('---------------------------');

    // Give the edge of Bottom Right and Bottom Left for real knight move
    const knightMoveBottomRight =
      currentNode?.edgeBottom?.node1.edgeRight?.node1.edgeRight;
    const knightMoveBottomLeft =
      currentNode?.edgeBottom?.node1.edgeLeft?.node2.edgeLeft;

    // Give the edge of Top Right and Top Left for real knight move
    const knightMoveTopRight =
      currentNode?.edgeTop?.node2?.edgeRight?.node1?.edgeRight;

    const knightMoveTopLeft =
      currentNode?.edgeTop?.node2?.edgeLeft?.node2?.edgeLeft;
    // Give the edge of Right Top and Right Bottom for real knight move
    const knightMoveRightTop =
      currentNode?.edgeRight?.node1?.edgeTop?.node2?.edgeTop;

    const knightMoveRightBottom =
      currentNode?.edgeRight?.node1?.edgeBottom?.node1?.edgeBottom;
    console.log(`This is ${knightMoveRightTop}`);
    // Give the edge of Left Top and Left Bottom for real knight move
    const knightMoveLeftTop =
      currentNode?.edgeLeft?.node2?.edgeTop?.node2?.edgeTop?.node2;

    const knightMoveLeftBottom =
      currentNode?.edgeLeft?.node2?.edgeBottom?.node1?.edgeBottom;

    if (knightMoveBottomRight === undefined || knightMoveBottomRight === null) {
      console.log('No');
    } else {
      queue.push(knightMoveBottomRight.node1);
    }
    if (knightMoveBottomLeft === undefined || knightMoveBottomLeft === null) {
      console.log('NO');
    } else {
      queue.push(knightMoveBottomLeft.node2);
    }
    if (knightMoveTopRight === null || knightMoveTopRight === undefined) {
      console.log('No');
    } else {
      queue.push(knightMoveTopRight.node1);
    }
    if (knightMoveTopLeft === null || knightMoveTopLeft === undefined) {
      console.log('No');
    } else {
      queue.push(knightMoveTopLeft.node2);
    }
    if (knightMoveRightTop === undefined || knightMoveRightTop === null) {
      console.log('No');
    } else {
      queue.push(knightMoveRightTop.node2);
    }
    if (knightMoveRightBottom === null || knightMoveRightBottom === undefined) {
      console.log('NO');
    } else {
      queue.push(knightMoveRightBottom.node1);
    }
    if (knightMoveLeftTop === null || knightMoveLeftTop === undefined) {
      console.log('NO');
    } else {
      queue.push(knightMoveLeftTop.node2);
    }
    if (knightMoveLeftBottom === null || knightMoveLeftBottom === undefined) {
      console.log('NO');
    } else {
      queue.push(knightMoveLeftBottom.node1);
    }

    queue.shift();
    console.log(visited);
    this.helperQueue(queue, startingNode, endingNode, visited, path);
  }

  isVisited(pos, visited) {
    if (visited.has(pos)) {
      return true;
    }
    return false;
  }
}
