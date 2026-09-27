const DIANDIAN_BASE_URL = "https://mysite-1316679115.cos.ap-guangzhou.myqcloud.com/images";

// 图片按 diandian_pose数字.jpg 连续命名；以后上传新照片后更新总数即可。
const DIANDIAN_PHOTO_COUNT = 15;

// 同名替换照片时更新对应版本，避免浏览器继续使用旧图缓存。
const DIANDIAN_PHOTO_VERSIONS: Record<number, string> = {
  2: "5b725a9eca2a6e027628586eae68add3",
};

export const diandianImages = Array.from({ length: DIANDIAN_PHOTO_COUNT }, (_, index) => ({
  src: `${DIANDIAN_BASE_URL}/diandian_pose${index + 1}.jpg${
    DIANDIAN_PHOTO_VERSIONS[index + 1] ? `?v=${DIANDIAN_PHOTO_VERSIONS[index + 1]}` : ""
  }`,
  alt: `我的猫：点点，第 ${index + 1} 张照片`,
}));
