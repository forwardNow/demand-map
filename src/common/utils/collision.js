export function isTwoCirclesOverlap({ x, y, r = 0 }, { x2, y2, r2 = 0 }) {
  const centerDistance = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
  return centerDistance < (r + r2);
}

export function isThisCircleOverlapWithOtherCircles({ x, y, r = 0 }, otherCircles) {
  const overlapCircle = findTheCircleThatOverlapsAnotherCircle({ x, y, r }, otherCircles);

  return Boolean(overlapCircle);
}

export function findTheCircleThatOverlapsAnotherCircle({ x, y, r = 0 }, otherCircles) {
  return otherCircles
    .find(({x: x2, y: y2, r: r2 = 0}) => isTwoCirclesOverlap({x, y, r}, {x2, y2, r2}));
}