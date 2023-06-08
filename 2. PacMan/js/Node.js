export default function Node(x, y, is_wall) {

    this.x = x;
    this.y = y;
    this.is_wall = is_wall;

    this.g = 0; // cost from start
    this.h = 0; // cost to end (장애물 X 예상거리)
    this.f = 0; // total cost
}