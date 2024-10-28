import { Component } from '@angular/core';
import { TimelineComponent } from "../timeline/timeline.component";

@Component({
  selector: 'mw-about',
  standalone: true,
  imports: [ TimelineComponent ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  workTimelineEntries = 
  [
    {
      logoPath: './assets/logos/exampleLogo.png',
      title: 'Tools Engineer',
      companyName: 'Nemesys Games',
      periodStart: '2022 September',
      periodEnd: '2023 April'
    },
    {
      logoPath: './assets/logos/exampleLogo.png',
      title: 'Tools Engineer',
      companyName: 'Zenimax Online Studios Hungary',
      periodStart: '2023 April',
      periodEnd: 'Present'
    }
  ];

  eduTimelineEntries = 
  [
    {
      logoPath: './assets/logos/exampleLogo.png',
      title: 'Tools Engineer',
      companyName: 'Nemesys Games',
      periodStart: '2022 September',
      periodEnd: '2023 April'
    }
  ];
}
