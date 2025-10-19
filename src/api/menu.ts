import { apiFetch } from './client';
import { MenuSection } from '../data/menu';

export async function fetchMenus(): Promise<MenuSection[]> {
  return apiFetch<MenuSection[]>('/menus?_sort=title');
}
