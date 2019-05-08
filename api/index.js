import images from './images'

const listImages = () => images;
const getImageById = (id) => images.find((image) => image.id === id);
const addImage = (uri) => images.push({
  id: images.length + 1,
  uri,
  score: 0
});
const deleteImageById = (id) => {
  images = images.filter((image) => image.id !== id);
}

export {
  listImages,
  getImageById,
  addImage,
  deleteImageById,
}
