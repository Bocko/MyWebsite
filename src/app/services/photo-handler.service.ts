import { Injectable } from '@angular/core';
import { PhotoEntry, PhotoListEntry } from '../interfaces/photo-entry';

@Injectable({
  providedIn: 'root'
})
export class PhotoHandlerService 
{
  async getImageLists(): Promise<PhotoListEntry[]>
  {
    const data = await fetch('/assets/imgs/img-list.json');
    return (await data.json()) ?? {};
  }
}
