import type { Chord } from './Chord';

import { MinorCircularSegment } from './MinorCircularSegment';

import { MajorCircularSegment } from './MajorCircularSegment';

import { Semicircle } from './Semicircle';

import { distance } from '@rnacanvas/points';

export type Point = {
  x: number;
  y: number;
};

/**
 * Can represent a minor or major circular segment or a semicircle.
 *
 * To avoid possible division operations resulting in number overflow,
 * this class will represent circular segments with very small areas as simply semicircles.
 *
 * (Practically-speaking, circular segments with very small areas will appear as having zero size
 * when displayed on a screen no matter how they are calculated.)
 *
 * This class also should not be used to represent circular segments that are very close to being full circles
 * (i.e., have very small chord lengths relative to arc length)
 * or that have extremely large parent circles
 * (i.e., have an arc length that is only very slightly larger than their chord length)
 * again due to the possibility of mathematical operations that could result in number overflow.
 */
export class CircularSegment {
  private wrappedCircularSegment: MinorCircularSegment | MajorCircularSegment | Semicircle;

  /**
   * Throws if the arc length is less than or equal to the chord length (and the chord length is nonzero).
   *
   * Arc length and chord length are allowed to both be zero at the same time, though.
   */
  constructor(private chord: Chord, private moreProps: { arcLength: number }) {
    let { arcLength } = moreProps;

    let chordLength = distance(chord[0], chord[1]);

    // note that the arc length is allowed to equal the chord length when they are both zero
    if (chordLength > 0 && arcLength <= chordLength) {
      throw new Error('Arc length is too small.');
    }

    let isVerySmall = chordLength < 1e-3 && arcLength < 1e-3;

    let semicircularArcLength = Math.PI * chordLength / 2;

    // probably safest to just treat as a semicircle if it is close
    let isCloseToSemicircular = Math.abs(arcLength - semicircularArcLength) < 1e-3;

    if (isVerySmall) {
      this.wrappedCircularSegment = new Semicircle(chord);
    } else if (isCloseToSemicircular) {
      this.wrappedCircularSegment = new Semicircle(chord);
    } else if (arcLength < semicircularArcLength) {
      this.wrappedCircularSegment = new MinorCircularSegment(chord, { arcLength });
    } else {
      this.wrappedCircularSegment = new MajorCircularSegment(chord, { arcLength });
    }
  }

  get chordLength(): number {
    return this.wrappedCircularSegment.chordLength;
  }

  get arcLength(): number {
    return this.moreProps.arcLength;
  }

  get arcAngle(): number {
    return this.wrappedCircularSegment.arcAngle;
  }

  get parentCircleRadius(): number {
    return this.wrappedCircularSegment.parentCircleRadius;
  }

  get parentCircleDiameter(): number {
    return this.wrappedCircularSegment.parentCircleDiameter;
  }

  get parentCircleCircumference(): number {
    return this.wrappedCircularSegment.parentCircleCircumference;
  }

  get parentCircleCenterPoint(): Point {
    return this.wrappedCircularSegment.parentCircleCenterPoint;
  }
}
