import type { Chord } from './Chord';

import { distance } from '@rnacanvas/points';

import { displacement } from '@rnacanvas/points';

import { direction } from '@rnacanvas/vectors';

export type Point = {
  x: number;
  y: number;
};

/**
 * Should not be used to represent major circular segments with zero or otherwise very small areas
 * or with very small chord lengths
 * (to avoid division operations that could cause number overflow).
 */
export class MajorCircularSegment {
  readonly arcAngle: number;

  /**
   * The arc of the major circular segment is interpreted to go from the first point of the chord
   * to the second point of the chord in the direction of increasing angles
   * (i.e., counterclockwise in the standard Cartesian coordinate system).
   *
   * Throws if the provided chord and arc length do not result in a major circular segment
   * or if the provided chord has length of zero (which would result in a complete circle).
   */
  constructor(private chord: Chord, private moreProps: { arcLength: number }) {
    let { arcLength } = moreProps;

    let chordLength = distance(chord[0], chord[1]);

    if (chordLength == 0) {
      throw new Error('Chord length cannot be zero.');
    }

    if (arcLength <= Math.PI * chordLength / 2) {
      throw new Error('Arc length is too small.');
    }

    // the angle between the arc and chord where they meet (within the major circular segment)
    // (pi seems to work well as an initial guess)
    let incidentAngle = Math.PI;

    // 20 iterations seems to work well
    let iterations = 20;

    // Newton's method of approximation
    for (let i = 0; i < iterations; i++) {
      let y = ((arcLength / chordLength) * Math.sin(Math.PI - incidentAngle)) - incidentAngle;
      let yPrime = -((arcLength / chordLength) * Math.cos(Math.PI - incidentAngle)) - 1;
      incidentAngle -= y / yPrime;
    }

    this.arcAngle = 2 * incidentAngle;
  }

  get chordLength(): number {
    return distance(this.chord[0], this.chord[1]);
  }

  get arcLength(): number {
    return this.moreProps.arcLength;
  }

  get parentCircleRadius(): number {
    return this.arcLength / this.arcAngle;
  }

  get parentCircleDiameter(): number {
    return 2 * this.parentCircleRadius;
  }

  get parentCircleCircumference(): number {
    return 2 * Math.PI * this.parentCircleRadius;
  }

  get parentCircleCenterPoint(): Point {
    let a = direction(displacement(this.chord[0], this.chord[1]));

    a -= (this.arcAngle - Math.PI) / 2;

    let r = this.parentCircleRadius;

    return {
      x: this.chord[0].x + (r * Math.cos(a)),
      y: this.chord[0].y + (r * Math.sin(a)),
    };
  }
}
