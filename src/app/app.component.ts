import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';

import { LightgalleryModule } from 'lightgallery/angular';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgHash from 'lightgallery/plugins/hash';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

@Component({
  selector: 'mw-root',
  standalone: true,
  imports: [LightgalleryModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  settings = {
    counter: true,
    download: false,
    plugins: [lgFullscreen, lgZoom, lgHash],
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    //console.log(index, prevIndex);
  };
}
