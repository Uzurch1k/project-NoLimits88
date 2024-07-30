export const getRandomPhotos = (photos, defaultPhotos, count) => {
  const combinedPhotos = [...photos, ...defaultPhotos];

  const shuffled = combinedPhotos.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
