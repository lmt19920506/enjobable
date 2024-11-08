// 获取div旋转角度后，四个点的新位置，以及容器的top，left值和width和height

export const getRotatedCorners = (left, top, width, height, rotateAngle) => {
  // 角度转弧度
  rotateAngle = rotateAngle * (Math.PI / 180);

  // 中心点
  var centerX = left + width / 2;
  var centerY = top + height / 2;

  // 初始四个角
  var topLeft = { x: left, y: top };
  var topRight = { x: left + width, y: top };
  var bottomLeft = { x: left, y: top + height };
  var bottomRight = { x: left + width, y: top + height };

  // 旋转四个角
  topLeft.x -= centerX;
  topLeft.y -= centerY;
  topRight.x -= centerX;
  topRight.y -= centerY;
  bottomLeft.x -= centerX;
  bottomLeft.y -= centerY;
  bottomRight.x -= centerX;
  bottomRight.y -= centerY;

  var cos = Math.cos(rotateAngle);
  var sin = Math.sin(rotateAngle);

  let topLeftX = cos * topLeft.x - sin * topLeft.y + centerX;
  let topLeftY = sin * topLeft.x + cos * topLeft.y + centerY;

  let topRightX = cos * topRight.x - sin * topRight.y + centerX;
  let topRightY = sin * topRight.x + cos * topRight.y + centerY;

  let bottomLeftX = cos * bottomLeft.x - sin * bottomLeft.y + centerX;
  let bottomLeftY = sin * bottomLeft.x + cos * bottomLeft.y + centerY

  let bottomRightX = cos * bottomRight.x - sin * bottomRight.y + centerX
  let bottomRightY = sin * bottomRight.x + cos * bottomRight.y + centerY

  let xArr = [topLeftX, topRightX, bottomRightX, bottomLeftX]
  let yArr = [topLeftY, topRightY, bottomRightY, bottomLeftY]
  let minX = Math.min.apply(null, xArr)
  let minY = Math.min.apply(null, yArr)
  let maxX = Math.max.apply(null, xArr)
  let maxY = Math.max.apply(null, yArr)

  let rect = {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  }
  // console.log('rect---', rect)
  // 应用旋转矩阵
  var newTopLeft = {
    x: topLeftX,
    y: topLeftY,
  };
  var newTopRight = {
    x: topRightX,
    y: topRightY,
  };
  var newBottomLeft = {
    x: bottomLeftX,
    y: bottomLeftY,
  };
  var newBottomRight = {
    x: bottomRightX,
    y: bottomRightY,
  };



  return {
    rect,
    topLeft: newTopLeft,
    topRight: newTopRight,
    bottomLeft: newBottomLeft,
    bottomRight: newBottomRight,
  };
}
