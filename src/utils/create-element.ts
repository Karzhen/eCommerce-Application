import { Tag } from '@/interface';

export default function createElement(tag: Tag, option: Partial<HTMLElement>) {
  const ELEMENT = Object.assign(document.createElement(tag), option);
  return ELEMENT;
}
