import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, debounceTime, distinctUntilChanged, fromEvent, startWith, takeUntil } from 'rxjs';
import { Breed } from 'src/app/models/breed.model';
import { CatImage } from 'src/app/models/cat-image.model';
import { LoadBreeds } from 'src/app/store/breed/breed.actions';
import { BreedState } from 'src/app/store/breed/breed.state';
import { LoadCatImages } from 'src/app/store/cat-image/cat-image.actions';
import { CatImageState } from 'src/app/store/cat-image/cat-image.state';

@Component({
  selector: 'app-cat-image-list',
  templateUrl: './cat-image-list.component.html',
  styleUrls: ['./cat-image-list.component.css'],
})

export class CatImageListComponent implements OnInit, OnDestroy {

  @Select(CatImageState.getCatImages) images$!: Observable<CatImage[]>;
  @Select(BreedState.getBreeds) breeds$!: Observable<Breed[]>;

  public searchForm: FormGroup = new FormGroup({
    selectedBreeds: new FormControl([]),
    limit: new FormControl(10)
  });

  private destroy$: Subject<void> = new Subject<void>();

  public gridCols: number = this.getGridCols();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadBreeds());

    this.searchForm.valueChanges.pipe(
      startWith(this.searchForm.value),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.onSearch();
    });

    fromEvent(window, 'resize').pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.gridCols = this.getGridCols();
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSearch(): void {
    const { selectedBreeds, limit } = this.searchForm.value;
    const selectedBreedIds = selectedBreeds.join(',');
    this.store.dispatch(new LoadCatImages(selectedBreedIds, limit));
  }

  private getGridCols(): number {
    const screenWidth = window.innerWidth;
    switch (true) {
      case screenWidth >= 1200:
        return 4;
      case screenWidth >= 800:
        return 3;
      case screenWidth >= 600:
        return 2;
      default:
        return 1;
    }
  }

}

