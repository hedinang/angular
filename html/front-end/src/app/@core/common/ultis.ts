import { Capabilities } from 'protractor';

export class Ultis { }

export function isArray(value: any): boolean {
  return value && Array.isArray(value);
}

export function isArrayHasData(value: any): boolean {
  return isArray(value) && value.length > 0;
}

export function dashToCame(value: string): string {
  return value.replace(/([A-Z])/g, (val) => '-' + val.toLowerCase());
}

export function cameToDash(value: string): string {
  return value.replace(/(\-[a-z])/g, (val) => val.toUpperCase().replace('-', ''));
}

export function getRandomColor() {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return color;
}

export function compareDay(day1: Date, day2: Date) {
  let result = false;
  if (day1.getFullYear === day2.getFullYear && day1.getMonth === day2.getMonth && day1.getDate() === day2.getDate()) {
    result = true;
  }
  return result;
}

export function isRealValue(value: number | string | object): boolean {
  if (typeof value === 'string') {
    return value && value.trim() === '';
  }
  if (typeof value === 'number') {
    return value === 0 || isNaN(value);
  }
  if (typeof value === 'object') {
    if (isArray(value)) {
      return isArrayHasData(value);
    }
    return value !== null && value !== undefined;
  }
}

export function toUTCTime(date: Date): Date {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(),
    date.getUTCSeconds());
}

export function toLocalTime(date: Date) {
  return new Date(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
}

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function toUpperCase(value: string): string {
  return value.toUpperCase();
}

export function toCapitalize(value: string): string {
  return value.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
}
