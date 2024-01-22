import { MajorCircularSegment } from './MajorCircularSegment';

import { distance } from '@rnacanvas/points';

describe('MajorCircularSegment class', () => {
  test('an arc length resulting in a minor circular segment', () => {
    let chord = [{ x: 1, y: 8 }, { x: 4, y: 12 }];

    expect(distance(...chord)).toBeCloseTo(5);

    let arcLength = (Math.PI * 5 / 2) - 1;

    expect(() => new MajorCircularSegment(chord, { arcLength })).toThrow();
  });

  test('an arc length resulting in a semicircle', () => {
    let chord = [{ x: 5, y: 11 }, { x: 12, y: 11 }];

    expect(distance(...chord)).toBeCloseTo(7);

    let arcLength = Math.PI * 7 / 2;

    expect(() => new MajorCircularSegment(chord, { arcLength })).toThrow();
  });

  test('an arc length less than the chord length', () => {
    let chord = [{ x: 8, y: -2 }, { x: 8, y: -8 }];

    expect(distance(...chord)).toBeCloseTo(6);

    expect(() => new MajorCircularSegment(chord, { arcLength: 4.5 })).toThrow();
  });

  test('chord length of zero and nonzero arc length', () => {
    let chord = [{ x: 3, y: 2 }, { x: 3, y: 2 }];

    expect(distance(...chord)).toBeCloseTo(0);

    expect(() => new MajorCircularSegment(chord, { arcLength: 6 })).toThrow();
  });

  test('arc length of zero and nonzero chord length', () => {
    let chord = [{ x: 3, y: 2 }, { x: 10, y: 2 }];

    expect(distance(...chord)).toBeCloseTo(7);

    expect(() => new MajorCircularSegment(chord, { arcLength: 0 })).toThrow();
  });

  test('a major circular segment with arc angle of 7 * pi / 4', () => {
    let chord = [
      { x: 24.85640646055102, y: -38 },
      { x: 15.141104721640325, y: -45.4548132206251 },
    ];

    let majorCircularSegment = new MajorCircularSegment(chord, { arcLength: 87.96459430051421 });

    expect(majorCircularSegment.chordLength).toBeCloseTo(12.245869835682877);

    expect(majorCircularSegment.arcLength).toBeCloseTo(87.96459430051421);
    expect(majorCircularSegment.arcAngle).toBeCloseTo(7 * Math.PI / 4);

    expect(majorCircularSegment.parentCircleRadius).toBeCloseTo(16);
    expect(majorCircularSegment.parentCircleDiameter).toBeCloseTo(2 * 16);
    expect(majorCircularSegment.parentCircleCircumference).toBeCloseTo(2 * Math.PI * 16);

    expect(majorCircularSegment.parentCircleCenterPoint.x).toBeCloseTo(11);
    expect(majorCircularSegment.parentCircleCenterPoint.y).toBeCloseTo(-30);
  });

  test('a major circular segment with arc angle of 10 * pi / 9', () => {
    let chord = [
      { x: -220.8944443027283, y: -69.89444430272833 },
      { x: -46.916787691932285, y: 178.5713992036441 },
    ];

    let majorCircularSegment = new MajorCircularSegment(chord, { arcLength: 537.5614096142535 });

    expect(majorCircularSegment.chordLength).toBeCloseTo(303.3207879277601);

    expect(majorCircularSegment.arcLength).toBeCloseTo(537.5614096142535);
    expect(majorCircularSegment.arcAngle).toBeCloseTo(10 * Math.PI / 9);

    expect(majorCircularSegment.parentCircleRadius).toBeCloseTo(154);
    expect(majorCircularSegment.parentCircleDiameter).toBeCloseTo(2 * 154);
    expect(majorCircularSegment.parentCircleCircumference).toBeCloseTo(2 * Math.PI * 154);

    expect(majorCircularSegment.parentCircleCenterPoint.x).toBeCloseTo(-112);
    expect(majorCircularSegment.parentCircleCenterPoint.y).toBeCloseTo(39);
  });
});
