import { StateContext, Selector, Action, NgxsOnInit, StateToken, State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { CatService } from '../services/cat.service';
import { of } from 'rxjs';
import { CatImageDTO } from "../dto/cat-image.dto";

export interface CatStateModel {
  catImages: CatImageDTO[] | null;
  filters: CatFilterStateModel;
  loading: boolean;
  error: string | null;
}

export interface CatFilterStateModel {
  selectedBreed: string | null;
  resultLimit: number;
  page: number;
  isEnd: boolean;
}

export class FetchCatImages {
  static readonly type = '[Cat] Fetch Cat Images';
  constructor(public page: {page: number}) {}
}

export class SetFilter {
  static readonly type = '[Cat] Set Filter';
  constructor(public filters: { selectedBreed: string | null; resultLimit: number; page: number }) {}
}

@State<CatStateModel>({
  name: 'cat',
  defaults: {
    filters: {
      selectedBreed: null,
      resultLimit: 20,
      page: 1,
      isEnd: false,
    },
    catImages: null,
    loading: false,
    error: null,
  }
})
@Injectable()
export class CatState {
  constructor(private catService: CatService) {}

  @Selector()
  static getCatImages(state: CatStateModel) {
    return state.catImages;
  }

  @Selector()
  static getPageNumber(state: CatStateModel) {
    return state.filters.page;
  }

  @Selector()
  static getIsEnd(state: CatStateModel) {
    return state.filters.isEnd;
  }

  @Selector()
  static getLoading(state: CatStateModel) {
    return state.loading;
  }

  @Selector()
  static getError(state: CatStateModel) {
    return state.error;
  }

  @Action(SetFilter)
  setFilter(ctx: StateContext<CatStateModel>, { filters }: SetFilter){
    ctx.patchState({ loading: true });

    return this.catService.fetchImages(filters).pipe(
      tap((newImages: CatImageDTO[]) => {
        ctx.patchState({
          catImages: newImages,
          loading: false,
          filters: {
            ...filters,
            isEnd: newImages.length < filters.resultLimit
          }
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

  @Action(FetchCatImages)
  fetchCatImages(ctx: StateContext<CatStateModel>, { page }: FetchCatImages) {
    const state = ctx.getState();

    if (state.filters.isEnd) {
      return;
    }

    const {selectedBreed, resultLimit} = state.filters;

    const filters = {selectedBreed,resultLimit, ...page};
    ctx.patchState({ loading: true });

    return this.catService.fetchImages(filters).pipe(
      tap((newImages: CatImageDTO[]) => {
        const updatedImages = [...state.catImages || [], ...newImages];
        ctx.patchState({
          catImages: updatedImages,
          loading: false,
          filters: {
            ...filters,
            isEnd: newImages.length < filters.resultLimit
          }
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
