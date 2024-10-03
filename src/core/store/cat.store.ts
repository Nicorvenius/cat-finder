import { StateContext, Selector, Action, NgxsOnInit, StateToken, State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { CatService } from '../services/cat.service';
import { of } from 'rxjs';
import { CatImageDTO } from "../dto/cat-image.dto";

export interface CatStateModel {
  catImages: CatImageDTO[];
  filters: { selectedBreed: string | null; resultLimit: number };
  loading: boolean;
  page: number;
  error: string | null;
}

export class FetchCatImages {
  static readonly type = '[Cat] Fetch Cat Images';
  constructor(public filters: { selectedBreed: string | null; resultLimit: number; page: number }) {}
}

@Injectable()
export class CatState {
  constructor(private catService: CatService) {}

  @Selector()
  static getCatImages(state: CatStateModel) {
    return state.catImages;
  }

  @Selector()
  static getLoading(state: CatStateModel) {
    return state.loading;
  }

  @Selector()
  static getError(state: CatStateModel) {
    return state.error;
  }

  @Action(FetchCatImages)
  fetchCatImages(ctx: StateContext<CatStateModel>, { filters }: FetchCatImages) {
    const state = ctx.getState();
    ctx.patchState({ loading: true });

    return this.catService.fetchImages(filters).pipe(
      tap((newImages: CatImageDTO[]) => {
        const updatedImages = [...state.catImages || [], ...newImages];
        ctx.patchState({
          catImages: updatedImages,
          loading: false,
          page: filters.page
        });
      }),
      catchError((error) => {
        ctx.patchState({
          error: error.message,
          loading: false
        });
        return of(error);
      })
    );
  }
}
