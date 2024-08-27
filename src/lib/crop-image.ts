export const getCroppedImg = async (imageSrc: string, crop: any): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Set the canvas size to the crop size
  canvas.width = crop.width;
  canvas.height = crop.height;

  // Draw the cropped area of the image directly onto the canvas
  ctx.drawImage(
    image,
    crop.x, crop.y,
    crop.width, crop.height,
    0, 0,
    crop.width, crop.height
  );

  // Resize to the nearest smaller dimension
  const resizedCanvas = document.createElement('canvas');
  const resizedCtx = resizedCanvas.getContext('2d');

  const sizeOptions = [1024, 768, 512, 256];
  const closestSize = sizeOptions.find((size) => size <= crop.width) || 256;

  resizedCanvas.width = closestSize;
  resizedCanvas.height = closestSize;

  resizedCtx?.drawImage(canvas, 0, 0, closestSize, closestSize);

  return new Promise((resolve) => {
    resizedCanvas.toBlob((file) => {
      resolve(file as File);
    }, 'image/jpeg');
  });
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // workaround for CORS issues
    image.src = url
  })
