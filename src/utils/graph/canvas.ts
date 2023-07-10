//Calculate Linear Gradient Angle and Cut Points
export function linearGradient(w: number, h: number, deg: number) {
  let sectorCount = '';
  const caseAngle1 = Math.round((Math.atan(w / h) * 180) / Math.PI);
  const caseAngle2 = Math.round(180 - caseAngle1);
  const caseAngle3 = Math.round(180 + caseAngle1);
  const caseAngle4 = Math.round(360 - caseAngle1);
  let bx = 0,
    tx = 0,
    wh = 0,
    hh = 0,
    ty = 0,
    by = 0,
    angInRad = 0,
    count1 = 0;

  bx = tx = wh = w / 2;
  hh = h / 2;
  ty = h;
  by = 0;
  angInRad = (deg * Math.PI) / 180;

  if (deg == caseAngle1) {
    tx = 0;
    bx = w;
  } else if (deg == caseAngle2) {
    tx = 0;
    ty = 0;
    bx = w;
    by = h;
  } else if (deg == caseAngle3) {
    tx = w;
    ty = 0;
    bx = 0;
    by = h;
  } else if (deg == caseAngle4) {
    tx = w;
    ty = h;
    bx = 0;
    by = 0;
  } else {
    const mtan = Math.tan(angInRad);

    if (0 < deg && deg < caseAngle1) {
      count1 = (mtan * h) / 2;
      tx = wh - count1;
      bx = wh + count1;
      sectorCount = 'Sector 1';
    } else if (caseAngle1 < deg && deg < caseAngle2) {
      count1 = wh / mtan;
      tx = 0;
      ty = hh + count1;
      bx = w;
      by = hh - count1;
      sectorCount = 'Sector 2';
    } else if (caseAngle2 < deg && deg < caseAngle3) {
      count1 = (mtan * h) / 2;
      tx = wh + count1;
      ty = 0;
      bx = wh - count1;
      by = h;
      sectorCount = 'Sector 3';
    } else if (caseAngle3 < deg && deg < caseAngle4) {
      count1 = wh / mtan;
      tx = w;
      ty = hh - count1;
      bx = 0;
      by = hh + count1;
      sectorCount = 'Sector 4';
    } else if (caseAngle4 < deg && deg < 361) {
      count1 = (mtan * h) / 2;
      tx = wh - count1;
      ty = h;
      bx = wh + count1;
      by = 0;
      sectorCount = 'Sector 5';
    }
  }
  return { tx: tx, ty: ty, bx: bx, by: by };
}
