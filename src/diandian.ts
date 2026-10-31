const DIANDIAN_BASE_URL = "https://mysite-1316679115.cos.ap-guangzhou.myqcloud.com/images";

// 图片按 diandian_pose数字.jpg 连续命名；以后上传新照片后更新总数即可。
const DIANDIAN_PHOTO_COUNT = 15;

// 同名替换照片时更新对应版本，避免浏览器继续使用旧图缓存。
const DIANDIAN_PHOTO_VERSIONS: Record<number, string> = {
  2: "5b725a9eca2a6e027628586eae68add3",
  10: "76608f807ba3b423d84df817b2731f9c",
  11: "1f14d62d0f931a83fdfc6317f7dfd6f2",
  12: "aab2a4f513741fa52fa6d0755cad930a",
  13: "5c78d9617ffebd33e776ab6fd8628b02",
  14: "021e42e140ee977fb10ea65d9b1b440a",
  15: "a3137750909dd78e051729a29575ad55",
};

export const diandianImages = Array.from({ length: DIANDIAN_PHOTO_COUNT }, (_, index) => ({
  src: `${DIANDIAN_BASE_URL}/diandian_pose${index + 1}.jpg${
    DIANDIAN_PHOTO_VERSIONS[index + 1] ? `?v=${DIANDIAN_PHOTO_VERSIONS[index + 1]}` : ""
  }`,
  alt: `我的猫：点点，第 ${index + 1} 张照片`,
}));
