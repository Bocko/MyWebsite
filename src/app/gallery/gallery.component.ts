import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LightgalleryComponent, LightgalleryModule } from 'lightgallery/angular';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { getSelectedFilterField, PhotoEntry, PhotoMetadata } from '../interfaces/photo-entry';
import lgZoom from 'lightgallery/plugins/zoom';
import lgHash from 'lightgallery/plugins/hash';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import { InitDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';
import { EnumToArrayPipe } from '../services/pipes';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'mw-gallery',
    imports: [LightgalleryModule, CommonModule, EnumToArrayPipe, FormsModule, RouterModule],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss'
})
export class GalleryComponent
{
  private activatedRoute = inject(ActivatedRoute);
  photoHandler: PhotoHandlerService = inject(PhotoHandlerService);
  PhotoMetadata = PhotoMetadata

  category = '';

  galleryList : PhotoEntry[] = [];
  filteredGalleryList :  PhotoEntry[] = [];

  lightGallery! : LightGallery;
  gallerySettings : LightgalleryComponent["settings"] = 
  {
    download: false,
    counter: true,
    infiniteZoom: true,
    actualSize: false,
    showZoomInOutIcons: true,
    customSlideName: true,
    plugins: [lgZoom, lgHash, lgFullscreen]
  };

  selectedFieldFilter: string = PhotoMetadata.NAME;
  selectedFieldSort: string = PhotoMetadata.DATE;
  isSortingReversed: boolean = true;

  constructor()
  {
    this.category = this.activatedRoute.snapshot.paramMap.get('galleryname') ?? '';

    this.photoHandler.getImageList(this.category).then((loadedGalleryList: PhotoEntry[]) => 
    {
      this.galleryList = loadedGalleryList;
      this.filteredGalleryList = JSON.parse(JSON.stringify(this.galleryList));
      this.refreshGallery();
    });
  }

//#region Gallery Methods

  onGalleryInit = (detail: InitDetail): void => 
  {
    this.lightGallery = detail.instance;
    this.refreshGallery();
  };

  refreshGallery()
  {
    // idk why I need the setTimeout here, but that is the only way to get the gallery to refresh properly
    setTimeout(() =>
    {
      this.lightGallery.refresh();
    }, 0);
  }

//#endregion Gallery Methods

//#region Filtering

  filterGalleries(text: string)
  {
    this.filteredGalleryList = JSON.parse(JSON.stringify(this.galleryList));

    if (text && this.selectedFieldFilter)
    {
      this.filteredGalleryList = this.filteredGalleryList.filter((photoEntry) =>
      {        
        return getSelectedFilterField(this.selectedFieldFilter, photoEntry).toLowerCase().includes(text.toLowerCase())
      });
    }

    this.sortGalleries();
  }

  clearGalleriesFilter()
  {
    (document.getElementById("filterInput") as HTMLInputElement).value = "";
    this.filterGalleries("");
  }

//#endregion Filtering

//#region Sorting

  sortGalleries()
  {
    this.filteredGalleryList = JSON.parse(JSON.stringify(this.filteredGalleryList));

    const selectedSort = this.selectedFieldSort;

    this.filteredGalleryList = this.filteredGalleryList.sort((photoA, photoB) =>
      {
        if (this.isSortingReversed)
        {
          return getSelectedFilterField(selectedSort, photoB).localeCompare(getSelectedFilterField(selectedSort, photoA))
        }
        else
        {
          return getSelectedFilterField(selectedSort, photoA).localeCompare(getSelectedFilterField(selectedSort, photoB))
        }
      });

    this.refreshGallery();
  }

  reverseSorting()
  {
    this.isSortingReversed = !this.isSortingReversed;
    const reverseButton = document.getElementById("sortReverseButton");
    if (this.isSortingReversed)
    {
      reverseButton?.classList.add("sortReversed");
    }
    else
    {
      reverseButton?.classList.remove("sortReversed");
    }
    this.sortGalleries();
  }

//#endregion Sorting
}