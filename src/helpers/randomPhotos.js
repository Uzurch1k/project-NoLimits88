export const getRandomPhotos = (photos, defaultPhotos, count) => {
  const combinedPhotos = [...photos, ...defaultPhotos].slice(0, count);
  const shuffled = combinedPhotos.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
