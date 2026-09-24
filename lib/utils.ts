import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as [number, number, number, number];