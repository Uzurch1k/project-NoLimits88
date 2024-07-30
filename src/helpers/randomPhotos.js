export const getRandomPhotos = (photos, defaultPhotos, count) => {
  const combinedPhotos =
    photos.length > 3 ? photos : [...photos, ...defaultPhotos];

  const shuffled = combinedPhotos.slice().sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
};
