const initial = [150, 375, 640, 750, 828, 1080, 1200, 1400, 1600];
const all = [...initial, ...initial.map((item) => item * 2)];
const sorted = all.sort((a, b) => a / b);

export const IMG_DEVICE_SIZES = sorted;
