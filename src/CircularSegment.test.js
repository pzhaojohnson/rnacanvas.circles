import { CircularSegment } from './CircularSegment';

import { distance } from '@rnacanvas/points';

describe('CircularSegment class', () => {
  test('chord length and arc length both zero', () => {
    let chord = [{ x: 11, y: 15 }, { x: 11, y: 15 }];

    expect(distance(...chord)).toBeCloseTo(0);

    let circularSegment = new CircularSegment(chord, { arcLength: 0 });

    // just treats it as a semicircle
    expect(circularSegment.arcAngle).toBe(Math.PI);

    expect(circularSegment.chordLength).toBeCloseTo(0);
    expect(circularSegment.arcLength).toBeCloseTo(0);

    expect(circularSegment.parentCircleRadius).toBeCloseTo(0);
    expect(circularSegment.parentCircleDiameter).toBeCloseTo(0);
    expect(circularSegment.parentCircleCircumference).toBeCloseTo(0);

    expect(circularSegment.parentCircleCenterPoint.x).toBeCloseTo(11);
    expect(circularSegment.parentCircleCenterPoint.y).toBeCloseTo(15);
  });

  test('very small chord and arc lengths', () => {
    let chord = [{ x: 23, y: -12 }, { x: 23, y: -12 + 1e-6 }];

    expect(distance(...chord)).toBeLessThan(1e-3);

    // still more than the chord length
    let arcLength = 1e-5;

    let circularSegment = new CircularSegment(chord, { arcLength });

    // just treats it as a semicircle
    expect(circularSegment.arcAngle).toBe(Math.PI);

    expect(circularSegment.chordLength).toBeCloseTo(0);
    expect(circularSegment.arcLength).toBeCloseTo(0);

    expect(circularSegment.parentCircleRadius).toBeCloseTo(0);
    expect(circularSegment.parentCircleDiameter).toBeCloseTo(0);
    expect(circularSegment.parentCircleCircumference).toBeCloseTo(0);

    expect(circularSegment.parentCircleCenterPoint.x).toBeCloseTo(23);
    expect(circularSegment.parentCircleCenterPoint.y).toBeCloseTo(-12);
  });

  test('arc length less than chord length', () => {
    let chord = [{ x: 5, y: 8 }, { x: 11, y: 8 }];

    expect(distance(...chord)).toBeCloseTo(6);

    expect(() => new CircularSegment(chord, { arcLength: 4.5 })).toThrow();
  });

  test('nonzero arc length equal to nonzero chord length', () => {
    let chord = [{ x: -2, y: 36 }, { x: -6, y: 39 }];

    expect(distance(...chord)).toBeCloseTo(5);

    expect(() => new CircularSegment(chord, { arcLength: 5 })).toThrow();
  });

  test('a minor circular segment', () => {
    let chord = [
      { x: 80.93362879187305, y: 159.25194566517848 },
      { x: 84.80118193277625, y: 196.04925579380460 },
    ];

    let circularSegment = new CircularSegment(chord, { arcLength: 38.746309394274114 });

    expect(circularSegment.chordLength).toBeCloseTo(36.99999999999999);

    expect(circularSegment.arcLength).toBeCloseTo(38.746309394274114);
    expect(circularSegment.arcAngle).toBeCloseTo(Math.PI / 3);

    expect(circularSegment.parentCircleRadius).toBeCloseTo(37);
    expect(circularSegment.parentCircleDiameter).toBeCloseTo(2 * 37);
    expect(circularSegment.parentCircleCircumference).toBeCloseTo(2 * Math.PI * 37);

    expect(circularSegment.parentCircleCenterPoint.x).toBeCloseTo(51);
    expect(circularSegment.parentCircleCenterPoint.y).toBeCloseTo(181);
  });

  test('a major circular segment', () => {
    let chord = [
      { x: 0.8213150938532223, y: 91.54544226058628 },
      { x: 2.938483537985963, y: 80.35593794109866 },
    ];

    let circularSegment = new CircularSegment(chord, { arcLength: 126.71090369478831 });

    expect(circularSegment.chordLength).toBeCloseTo(11.388037984510925);

    expect(circularSegment.arcLength).toBeCloseTo(126.71090369478831);
    expect(circularSegment.arcAngle).toBeCloseTo(5.5 * Math.PI / 3);

    expect(circularSegment.parentCircleRadius).toBeCloseTo(22);
    expect(circularSegment.parentCircleDiameter).toBeCloseTo(2 * 22);
    expect(circularSegment.parentCircleCircumference).toBeCloseTo(2 * Math.PI * 22);

    expect(circularSegment.parentCircleCenterPoint.x).toBeCloseTo(-19);
    expect(circularSegment.parentCircleCenterPoint.y).toBeCloseTo(82);
  });

  test('a semicircle', () => {
    let chord = [
      { x: 91, y: 406 },
      { x: 1034, y: -3 },
    ];

    let circularSegment = new CircularSegment(chord, { arcLength: 1614.5845547603678 });

    expect(circularSegment.chordLength).toBeCloseTo(1027.876451719758);

    expect(circularSegment.arcLength).toBeCloseTo(1614.5845547603678);
    expect(circularSegment.arcAngle).toBe(Math.PI);

    expect(circularSegment.parentCircleRadius).toBeCloseTo(1027.876451719758 / 2);
    expect(circularSegment.parentCircleDiameter).toBeCloseTo(1027.876451719758);
    expect(circularSegment.parentCircleCircumference).toBeCloseTo(Math.PI * 1027.876451719758);

    expect(circularSegment.parentCircleCenterPoint.x).toBeCloseTo((91 + 1034) / 2);
    expect(circularSegment.parentCircleCenterPoint.y).toBeCloseTo((406 + (-3)) / 2);
  });

  test('a minor circular segment just slightly smaller than a semicircle', () => {
    let chord = [
      { x: 91, y: 406 },
      { x: 1034, y: -3 },
    ];

    let chordLength = distance(...chord);
    expect(chordLength).toBeCloseTo(1027.876451719758);

    let semicircularArcLength = Math.PI * chordLength / 2;
    expect(semicircularArcLength).toBeCloseTo(1614.5845547603678);

    let circularSegment = new CircularSegment(chord, { arcLength: semicircularArcLength - 1e-5 });

    // just treats as a semicircle
    expect(circularSegment.arcAngle).toBe(Math.PI);

    expect(circularSegment.chordLength).toBeCloseTo(1027.876451719758);
    expect(circularSegment.arcLength).toBeCloseTo(1614.5845547603678);

    expect(circularSegment.parentCircleRadius).toBeCloseTo(1027.876451719758 / 2);
    expect(circularSegment.parentCircleDiameter).toBeCloseTo(1027.876451719758);
    expect(circularSegment.parentCircleCircumference).toBeCloseTo(Math.PI * 1027.876451719758);

    expect(circularSegment.parentCircleCenterPoint.x).toBeCloseTo((91 + 1034) / 2);
    expect(circularSegment.parentCircleCenterPoint.y).toBeCloseTo((406 + (-3)) / 2);
  });

  test('a major circular segment just slightly larger than a semicircle', () => {
    let chord = [
      { x: 91, y: 406 },
      { x: 1034, y: -3 },
    ];

    let chordLength = distance(...chord);
    expect(chordLength).toBeCloseTo(1027.876451719758);

    let semicircularArcLength = Math.PI * chordLength / 2;
    expect(semicircularArcLength).toBeCloseTo(1614.5845547603678);

    let circularSegment = new CircularSegment(chord, { arcLength: semicircularArcLength + 1e-5 });

    // just treats as a semicircle
    expect(circularSegment.arcAngle).toBe(Math.PI);

    expect(circularSegment.chordLength).toBeCloseTo(1027.876451719758);
    expect(circularSegment.arcLength).toBeCloseTo(1614.5845547603678);

    expect(circularSegment.parentCircleRadius).toBeCloseTo(1027.876451719758 / 2);
    expect(circularSegment.parentCircleDiameter).toBeCloseTo(1027.876451719758);
    expect(circularSegment.parentCircleCircumference).toBeCloseTo(Math.PI * 1027.876451719758);

    expect(circularSegment.parentCircleCenterPoint.x).toBeCloseTo((91 + 1034) / 2);
    expect(circularSegment.parentCircleCenterPoint.y).toBeCloseTo((406 + (-3)) / 2);
  });
});
