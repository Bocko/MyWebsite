import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoHandlerService } from '../services/repo-handler.service';
import { RepoEntry } from '../interfaces/repo-entry';

@Component({
  selector: 'mw-repos',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './repos.component.html',
  styleUrl: './repos.component.scss'
})
export class ReposComponent {

  repoHandler: RepoHandlerService = inject(RepoHandlerService);
  repos: RepoEntry[] = [];

  constructor()
  {
    this.repoHandler.getAllRepos().then((repos: RepoEntry[]) => {
      this.repos = repos;
    });
  }

}
