import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { LoadCatImages, LoadCatImagesSuccess, LoadCatImagesFail } from './cat-image.actions';
import { CatImageService } from 'src/app/services/cat-image.service';
import { CatImageStateModel } from 'src/app/models/cat-image.model';

@Injectable()

@State<CatImageStateModel>({
	name: 'catImage',
	defaults: {
		images: [],
	},
})

export class CatImageState {
	constructor(private catImageService: CatImageService) { }

	@Selector()
	static getCatImages(state: CatImageStateModel) {
		return state.images;
	}

	@Action(LoadCatImages)
	loadCatImages(ctx: StateContext<CatImageStateModel>, { breedIds, limit }: LoadCatImages) {
		return this.catImageService.getCatImages(breedIds, limit).pipe(
			tap((images) => {
				ctx.dispatch(new LoadCatImagesSuccess(images));
			}),
			catchError((error) => {
				return ctx.dispatch(new LoadCatImagesFail(error));
			})
		);
	}

	@Action(LoadCatImagesSuccess)
	loadCatImagesSuccess(ctx: StateContext<CatImageStateModel>, { images }: LoadCatImagesSuccess) {
		ctx.patchState({ images });
	}

	@Action(LoadCatImagesFail)
	loadCatImagesFail(ctx: StateContext<CatImageStateModel>, { error }: LoadCatImagesFail) {
		console.error('Failed to load cat images:', error);
		return throwError(error);
	}

}
