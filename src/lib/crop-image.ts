export const getCroppedImg = async (imageSrc: string, crop: any): Promise<File> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))
  
  // set each dimension to double the largest dimension to ensure safe area for the image
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location to ensure the image is drawn in the center
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width/height to final desired crop size - this will clear existing context
  canvas.width = crop.width
  canvas.height = crop.height

  // paste generated rotated image with correct offsets for x, y, crop values
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - crop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - crop.y)
  )

  // Resize to the nearest smaller dimension
  const resizedCanvas = document.createElement('canvas')
  const resizedCtx = resizedCanvas.getContext('2d')

  const sizeOptions = [1024, 768, 512, 256]
  const closestSize = sizeOptions.find((size) => size <= crop.width) || 256

  resizedCanvas.width = closestSize
  resizedCanvas.height = closestSize

  resizedCtx?.drawImage(canvas, 0, 0, closestSize, closestSize)

  return new Promise((resolve) => {
    resizedCanvas.toBlob((file) => {
      resolve(file as File)
    }, 'image/jpeg')
  })
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // workaround for CORS issues
    image.src = url
  })
