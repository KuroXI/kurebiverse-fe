import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Buffer } from "buffer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function proxyImage(image: string | null = "") : string {
  return `${import.meta.env.VITE_CONSUMET_URL}/utils/image-proxy?url=${image}&headers={}`
}

export function proxyM3U8(url: string) : string {
  if (!url) return "";

  const { host } = new URL(url);
  const buffer = Buffer.from(url).toString("base64");

  return `${import.meta.env.VITE_CONSUMET_URL}/utils/m3u8-proxy/${host}/${buffer}`
}

export function cleanDescription(description: string) : string {
  return description.replace(/\(Source:[\s\S]*$/g, '').replace(/<[^>]*>/g, '');
}

export function progressBar(start : number, total : number) : number {
  return Math.floor((start / total) * 100);
}

export function parseTime(time: number) {
  const days = Math.floor(time / 1000 / 60 / 60 / 24);
  time -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(time / 1000 / 60 / 60);
  time -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(time / 1000 / 60);
  time -= minutes * 1000 * 60;
  const seconds = Math.floor(time / 1000);
  let format = '';

  if (days >= 1) format += `${days}:`;
  if (hours >= 1) format += `${hours}:`;
  if (minutes >= 1) format += `${hours > 0 && minutes < 10 ? "0" : ""}${minutes}:`;
  if (seconds >= 1) format += `${minutes > 0 && seconds < 10 ? "0" : ""}${seconds}`;

  return format;
}