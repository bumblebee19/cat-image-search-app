export interface CatImage {
	id: string;
	url: string;
	breedId: string;
}

export interface CatImageStateModel {
	images: CatImage[];
}