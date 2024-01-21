export type Point = {
  x: number;
  y: number;
};

/**
 * A line segment between two points on the periphery of a circle.
 */
export type Chord = [Point, Point];
