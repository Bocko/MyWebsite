import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { PhotoEntry, PhotoListEntry } from '../interfaces/photo-entry';
import lgZoom from 'lightgallery/plugins/zoom';
import lgHash from 'lightgallery/plugins/hash';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import { InitDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';

@Component({
  selector: 'mw-gallery',
  standalone: true,
  imports: [ LightgalleryModule, CommonModule ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  photoHandler: PhotoHandlerService = inject(PhotoHandlerService);
  galleryLists : PhotoListEntry[] = [];
  filteredGalleryLists :  PhotoListEntry[] = [];

  galleries: LightGallery[] = [];
  othersGallery!: LightGallery;
  settings = {
    download: false,
    counter: true,
    plugins: [lgZoom, lgHash, lgFullscreen]
  };

  constructor() 
  {
    this.photoHandler.getImageLists().then((galleryLists: PhotoListEntry[]) => 
    {
      this.galleryLists = galleryLists;
      this.filteredGalleryLists = JSON.parse(JSON.stringify(this.galleryLists));
    });
  }

  onGalleryInit = (detail: InitDetail): void => {
    detail.instance.refresh();
    this.galleries.push(detail.instance);
  };

  refreshGalleries() 
  {
    this.galleries.forEach(gallery => 
    {
      gallery.refresh();
    });
  }

  filterGalleries(text: string)
  {
    this.filteredGalleryLists = JSON.parse(JSON.stringify(this.galleryLists));

    if (text)
    {
      for (let i : number = 0; i < this.filteredGalleryLists.length; i++)
        {
          this.filteredGalleryLists[i].items = this.filteredGalleryLists[i].items.filter((photoEntry) =>
            photoEntry.name.toLowerCase().includes(text.toLowerCase()),
          );
        }
    }

    this.refreshGalleries();
  }
}
