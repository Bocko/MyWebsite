import { Component } from '@angular/core';
import { TimelineComponent } from "../timeline/timeline.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mw-about',
  standalone: true,
  imports: [ TimelineComponent, RouterModule ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  workTimelineEntries = 
  [
    
    {
      logoPath: './assets/logos/zos-logo.png',
      title: 'Tools Engineer',
      companyName: 'Zenimax Online Studios Hungary',
      periodStart: '2023 April',
      periodEnd: 'Present'
    },
    {
      logoPath: './assets/logos/nms-logo.jpg',
      title: 'Tools Engineer',
      companyName: 'Nemesys Games',
      periodStart: '2022 September',
      periodEnd: '2023 April'
    }
  ];

  eduTimelineEntries = 
  [
    {
      logoPath: './assets/logos/bme-logo.png',
      title: 'Bsc/Bprof — Computer Science Operational Engineer',
      companyName: 'Budapest University of Technology and Economics',
      periodStart: '2019 September',
      periodEnd: '2022 June'
    }
  ];
}
