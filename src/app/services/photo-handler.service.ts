import { Injectable } from '@angular/core';
import { CategoryEntry, PhotoEntry } from '../interfaces/photo-entry';

@Injectable({
  providedIn: 'root'
})
export class PhotoHandlerService 
{
  async getImageList(category: string): Promise<PhotoEntry[]>
  {
    const data = await fetch('/assets/imgs/' + category.toLowerCase() + '-img-list.json');
    return (await data.json()) ?? {};
  }

  async getGalleryCategories(): Promise<CategoryEntry[]>
  {
    const data = await fetch('/assets/imgs/img-categories.json');
    return (await data.json()) ?? {};
  }
}
