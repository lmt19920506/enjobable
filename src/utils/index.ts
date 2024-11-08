/**
 * eslint-disable
 */

// 生产id
export const generateId = () => {
  const s = [];
  const hexDigits: any = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  const uuid = s.join("");
  return uuid;
};

// 返回图片路径
export const getImgPath = (path: string) => {
  return new URL(path, import.meta.url).href;
};

// 颜色16进制转rgb
export const hexToRgba = (hex: string, opacity: number) => {
  // 判断 hex 值是否合法
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
    return null;
  }

  // 去掉 # 号并将字符串分割成三部分
  hex = hex.substring(1);
  let r, g, b;

  // 处理三种颜色格式：#RGB 和 #RRGGBB
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  //  console.log('rgba---', `rgba(${r}, ${g}, ${b}, ${opacity})`)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// 从链接后面的最后一个斜杆截取参数
export const getLastPathSegment = (str) => {
  const matches = str.match(/([^/]*)\/*$/);
  return matches ? matches[1] : "";
};
