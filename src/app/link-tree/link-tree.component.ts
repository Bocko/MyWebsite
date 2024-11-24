import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mw-link-tree',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './link-tree.component.html',
  styleUrl: './link-tree.component.scss'
})
export class LinkTreeComponent {

  links = 
  [
    {
      name: "Twitch",
      link: "https://www.twitch.tv/bockoofficial",
      icon: "fa-brands fa-twitch",
      color: "#9146FF",
      textColor: "#FFFFFF",
      logoColor: "#000000"
    },
    {
      name: "Youtube",
      link: "https://www.youtube.com/@BockoOfficial",
      icon: "fa-brands fa-youtube",
      color: "#FFFFFF",
      textColor: "#282828",
      logoColor: "#FF0000"
    },
  ];

}
