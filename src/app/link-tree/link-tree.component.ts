import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'mw-link-tree',
    imports: [CommonModule, RouterModule],
    templateUrl: './link-tree.component.html',
    styleUrl: './link-tree.component.scss'
})
export class LinkTreeComponent {

  links = 
  [
    {
      name: "Web",
      link: "https://lgbotond.com",
      icon: "fa-solid fa-globe",
      color: "#25D7AA",
      textColor: "#000",
      logoColor: "#CC2936"
    },
    {
      name: "Github",
      link: "https://github.com/Bocko",
      icon: "fa-brands fa-github",
      color: "#333",
      textColor: "#FFF",
      logoColor: "#FFF"
    },
    {
      name: "Email",
      link: "mailto:lgbotond@gmail.com",
      icon: "fa-regular fa-envelope",
      color: "#d44638",
      textColor: "#e5e4e2",
      logoColor: "#282828"
    },
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
    {
      name: "Bluesky",
      link: "https://bsky.app/profile/lgbotond.com",
      icon: "fa-brands fa-bluesky",
      color: "#080A0C",
      textColor: "#FFFFFF",
      logoColor: "#08F"
    },
    {
      name: "Discord",
      link: "https://discordapp.com/users/322079896341839872",
      icon: "fa-brands fa-discord",
      color: "#7289DA",
      textColor: "#2C2F33",
      logoColor: "#FFFFFF"
    },
    {
      name: "Steam",
      link: "https://steamcommunity.com/id/BockoOfficial/",
      icon: "fa-brands fa-steam",
      color: "#171D25",
      textColor: "#DCDEDF",
      logoColor: "#DCDEDF"
    },
    {
      name: "Speedrun",
      link: "https://www.speedrun.com/users/Bocko",
      icon: "fa-solid fa-trophy",
      color: "#199C77",
      textColor: "#FFFFFF",
      logoColor: "#FFD95C"
    }
  ];

}
