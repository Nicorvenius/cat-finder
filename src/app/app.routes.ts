import { Routes } from '@angular/router';
import { CatSearchComponent } from "./components/cat-search/cat-search.component";

export const routes: Routes = [
  { path: '', component: CatSearchComponent },
  { path: '**', redirectTo: '' }
];
