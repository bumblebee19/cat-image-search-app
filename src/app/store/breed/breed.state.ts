import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { LoadBreeds } from "./breed.actions";
import { BreedService } from "src/app/services/breed.service";
import { BreedStateModel } from "src/app/models/breed.model";

@Injectable()

@State<BreedStateModel>({
	name: 'breed',
	defaults: {
		breeds: [],
	},
})

export class BreedState {
	constructor(private breedService: BreedService) { }

	@Selector()
	static getBreeds(state: BreedStateModel) {
		return state.breeds;
	}

	@Action(LoadBreeds)
	loadBreeds({ patchState }: StateContext<BreedStateModel>) {
		return this.breedService.getBreeds().pipe(
			tap((breeds) => patchState({ breeds })),
			catchError((error) => throwError(error))
		);
	}
}
