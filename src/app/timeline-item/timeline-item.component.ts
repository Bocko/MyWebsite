import { Component, Input } from '@angular/core';

@Component({
  selector: 'mw-timeline-item',
  standalone: true,
  imports: [],
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss'
})
export class TimelineItemComponent {
  @Input() logoPath! : string
  @Input() workTitle! : string ;
  @Input() companyName! : string;
  @Input() workPeriodStart! : string;
  @Input() workPeriodEnd! : string;
}
