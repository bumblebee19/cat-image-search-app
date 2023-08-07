import { CatImage } from 'src/app/models/cat-image.model';

export class LoadCatImages {
	static readonly type = '[CatImage] Load Cat Images';

	constructor(public breedIds: string, public limit: number) { }
}

export class LoadCatImagesSuccess {
	static readonly type = '[CatImage] Load Cat Images Success';

	constructor(public images: CatImage[]) { }
}

export class LoadCatImagesFail {
	static readonly type = '[CatImage] Load Cat Images Fail';

	constructor(public error: any) { }
}
