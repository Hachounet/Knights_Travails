/* eslint-disable no-console */
import Graph from './graph.mjs';

const newGraph = new Graph();
newGraph.populateGraph();
newGraph.populateEdges();

newGraph.bfs('00', '77');
