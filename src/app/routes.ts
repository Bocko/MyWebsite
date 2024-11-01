import {Routes} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReposComponent } from './repos/repos.component';

const routeConfig: Routes = [
    {
      path: '',
      component: AboutComponent,
      title: 'About Me',
    },
    {
      path: 'gallery',
      component: GalleryComponent,
      title: 'Photo Gallery',
    },
    {
      path: 'repos',
      component: ReposComponent,
      title: 'My Repositories',
    },
    {
      path: '**',
      redirectTo : ''
    }
  ];

export default routeConfig;