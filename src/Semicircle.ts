import type { Chord } from './Chord';

import { distance } from '@rnacanvas/points';

import { midpoint } from '@rnacanvas/points';

export type Point = {
  x: number;
  y: number;
};

export class Semicircle {
  /**
   * The arc of the semicircle is interpreted to go from the first point of the chord
   * to the second point of the chord in the direction of increasing angles
   * (i.e., counterclockwise in the standard Cartesian coordinate system).
   */
  constructor(private chord: Chord) {}

  get chordLength(): number {
    return distance(this.chord[0], this.chord[1]);
  }

  get arcLength(): number {
    return Math.PI * this.chordLength / 2;
  }

  get arcAngle(): number {
    return Math.PI;
  }

  get parentCircleRadius(): number {
    return this.chordLength / 2;
  }

  get parentCircleDiameter(): number {
    return 2 * this.parentCircleRadius;
  }

  get parentCircleCircumference(): number {
    return 2 * Math.PI * this.parentCircleRadius;
  }

  get parentCircleCenterPoint(): Point {
    return midpoint(this.chord[0], this.chord[1]);
  }
}
