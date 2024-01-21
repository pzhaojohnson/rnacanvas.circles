import { Semicircle } from './Semicircle';

describe('Semicircle class', () => {
  test('a semicircle with nonzero chord length', () => {
    let semicircle = new Semicircle([{ x: 6, y: -28 }, { x: -47, y: 88 }]);

    expect(semicircle.chordLength).toBeCloseTo(127.534309109353);

    expect(semicircle.arcLength).toBeCloseTo(Math.PI * 127.534309109353 / 2);
    expect(semicircle.arcAngle).toBe(Math.PI);

    expect(semicircle.parentCircleRadius).toBeCloseTo(127.534309109353 / 2);
    expect(semicircle.parentCircleDiameter).toBeCloseTo(127.534309109353);
    expect(semicircle.parentCircleCircumference).toBeCloseTo(Math.PI * 127.534309109353);

    expect(semicircle.parentCircleCenterPoint.x).toBeCloseTo((6 + (-47)) / 2);
    expect(semicircle.parentCircleCenterPoint.y).toBeCloseTo(((-28) + 88) / 2);
  });

  test('a semicircle with chord length of zero', () => {
    let semicircle = new Semicircle([{ x: 12, y: -8 }, { x: 12, y: -8 }]);

    expect(semicircle.chordLength).toBeCloseTo(0);

    expect(semicircle.arcLength).toBeCloseTo(0);
    expect(semicircle.arcAngle).toBe(Math.PI);

    expect(semicircle.parentCircleRadius).toBeCloseTo(0);
    expect(semicircle.parentCircleDiameter).toBeCloseTo(0);
    expect(semicircle.parentCircleCircumference).toBeCloseTo(0);

    expect(semicircle.parentCircleCenterPoint.x).toBeCloseTo(12);
    expect(semicircle.parentCircleCenterPoint.y).toBeCloseTo(-8);
  });
});
