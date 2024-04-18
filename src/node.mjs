export default class Node {
  constructor(
    row = null,
    column = null,
    edgeTop = null,
    edgeBottom = null,
    edgeLeft = null,
    edgeRight = null
  ) {
    this.row = row;
    this.column = column;
    this.edgeTop = edgeTop;
    this.edgeBottom = edgeBottom;
    this.edgeLeft = edgeLeft;
    this.edgeRight = edgeRight;
  }
}
