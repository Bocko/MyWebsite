import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryComponent, LightgalleryModule } from 'lightgallery/angular';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { PhotoListEntry } from '../interfaces/photo-entry';
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
  gallerySettings: LightgalleryComponent["settings"][] = [];
  othersGallery!: LightGallery;

  constructor()
  {
    this.photoHandler.getImageLists().then((galleryLists: PhotoListEntry[]) => 
    {
      this.galleryLists = galleryLists;
      this.createGallerySettings();
      this.filteredGalleryLists = JSON.parse(JSON.stringify(this.galleryLists));
    });
  }

  createGallerySettings()
  {
    for (let i = 0; i < this.galleryLists.length; i++) {
      const settings : LightgalleryComponent["settings"] = 
      {
        galleryId: this.galleryLists[i].name,
        download: false,
        counter: true,
        infiniteZoom: true,
        actualSize: false,
        showZoomInOutIcons: true,
        plugins: [lgZoom, lgHash, lgFullscreen]
      };
      
      this.gallerySettings.push(settings);      
    }
  }

  onGalleryInit = (detail: InitDetail): void => {
    detail.instance.settings.galleryId = this.galleries.length.toString();
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
