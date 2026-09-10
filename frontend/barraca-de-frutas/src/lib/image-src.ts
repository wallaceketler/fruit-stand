import type { StaticImageData } from 'next/image'

export function imageSrc(image: StaticImageData | string): string {
  return typeof image === 'string' ? image : image.src
}
