export function proxyImage(image: string | null = "") : string {
  return `${import.meta.env.VITE_CONSUMET_URL}/utils/image-proxy?url=${image}&headers={}`
}

export function proxyM3U8(url: string = "") : string {
  return `${import.meta.env.VITE_CONSUMET_URL}/utils/m3u8-proxy/${new URL(url).host}/${Buffer.from(url).toString("base64")}`
}