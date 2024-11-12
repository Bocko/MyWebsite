import { Injectable } from '@angular/core';
import { RepoEntry } from '../interfaces/repo-entry';

@Injectable({
  providedIn: 'root'
})
export class RepoHandlerService {

  url: string = "https://api.github.com/users/Bocko/repos";

  constructor() { }
  
  async getAllRepos(): Promise<RepoEntry[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
