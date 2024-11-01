import { Injectable } from '@angular/core';
import { PhotoEntry } from '../interfaces/photo-entry';

@Injectable({
  providedIn: 'root'
})
export class PhotoHandlerService 
{
  async getPlaneEntries(): Promise<PhotoEntry[]>
  {
    const data = await fetch('/assets/imgs/planespotting/img-list.json');
    return (await data.json()) ?? {};
  }

  async getOtherEntries(): Promise<PhotoEntry[]>
  {
    const data = await fetch('/assets/imgs/other/img-list.json');
    return (await data.json()) ?? {};
  }
}
