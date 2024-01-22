import { MinorCircularSegment } from './MinorCircularSegment';

import { distance } from '@rnacanvas/points';

describe('MinorCircularSegment class', () => {
  test('an arc length less than the chord length', () => {
    let chord = [{ x: 2, y: 3 }, { x: 6, y: 3 }];

    expect(distance(...chord)).toBeCloseTo(4);

    expect(() => new MinorCircularSegment(chord, { arcLength: 3 })).toThrow();
  });

  test('an arc length equal to the chord length', () => {
    let chord = [{ x: 2, y: 7 }, { x: 5, y: 11 }];

    expect(distance(...chord)).toBeCloseTo(5);

    expect(() => new MinorCircularSegment(chord, { arcLength: 5 })).toThrow();
  });

  test('an arc length resulting in a major circular segment', () => {
    let chord = [{ x: 9, y: -6 }, { x: 9, y: 1 }];

    expect(distance(...chord)).toBeCloseTo(7);

    let arcLength = (Math.PI * 7 / 2) + 3;

    expect(() => new MinorCircularSegment(chord, { arcLength })).toThrow();
  });

  test('an arc length resulting in a semicircle', () => {
    let chord = [{ x: -5, y: -10 }, { x: -9, y: -7 }];

    expect(distance(...chord)).toBeCloseTo(5);

    let arcLength = Math.PI * 5 / 2;

    expect(() => new MinorCircularSegment(chord, { arcLength })).toThrow();
  });

  test('chord length and arc length of zero', () => {
    let chord = [{ x: 2, y: 5 }, { x: 2, y: 5 }];

    expect(distance(...chord)).toBe(0);

    expect(() => new MinorCircularSegment(chord, { arcLength: 0 })).toThrow();
  });

  test('a minor circular segment with arc angle of 0.8 * pi', () => {
    let chord = [
      { x: 76.79898987322333, y: -13.201010126776673 },
      { x: 29.344726463336144, y: -37.38016502112646 },
    ];

    let minorCircularSegment = new MinorCircularSegment(chord, { arcLength: 70.37167544041137 });

    expect(minorCircularSegment.chordLength).toBeCloseTo(53.2591649125286);

    expect(minorCircularSegment.arcLength).toBeCloseTo(70.37167544041137);
    expect(minorCircularSegment.arcAngle).toBeCloseTo(0.8 * Math.PI);

    expect(minorCircularSegment.parentCircleRadius).toBeCloseTo(28);
    expect(minorCircularSegment.parentCircleDiameter).toBeCloseTo(2 * 28);
    expect(minorCircularSegment.parentCircleCircumference).toBeCloseTo(2 * Math.PI * 28);

    expect(minorCircularSegment.parentCircleCenterPoint.x).toBeCloseTo(57);
    expect(minorCircularSegment.parentCircleCenterPoint.y).toBeCloseTo(-33);
  });

  test('a minor circular segment with arc angle of 0.1 * pi', () => {
    let chord = [
      { x: -10.648232278140839, y: -135.64823227814082 },
      { x: 1.7544655127622022, y: -144.65931968523003 },
    ];

    let minorCircularSegment = new MinorCircularSegment(chord, { arcLength: 15.393804002589984 });

    expect(minorCircularSegment.chordLength).toBeCloseTo(15.330577573942625);

    expect(minorCircularSegment.arcLength).toBeCloseTo(15.393804002589984);
    expect(minorCircularSegment.arcAngle).toBeCloseTo(0.1 * Math.PI);

    expect(minorCircularSegment.parentCircleRadius).toBeCloseTo(49);
    expect(minorCircularSegment.parentCircleDiameter).toBeCloseTo(2 * 49);
    expect(minorCircularSegment.parentCircleCircumference).toBeCloseTo(2 * Math.PI * 49);

    expect(minorCircularSegment.parentCircleCenterPoint.x).toBeCloseTo(24);
    expect(minorCircularSegment.parentCircleCenterPoint.y).toBeCloseTo(-101);
  });
});
