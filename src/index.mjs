/* eslint-disable import/extensions */
/* eslint-disable no-console */

import Knights from './knights.mjs';

function DriverScript() {
  const KnightsAlgo = new Knights();
  KnightsAlgo.buildGraph();
  KnightsAlgo.knightMoves([0, 0], [7, 7]);
}
DriverScript();
