import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Theme } from '../../../shared/interfaces/themes-interfaces/theme';
import { ThemeItemComponent } from '../../../shared/components/theme-item/theme-item.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoading, selectThemesSortedBySubscribers } from '../../../core/store/themes/themes.selectors';
import { loadThemes, loadThemesSuccess } from '../../../core/store/themes/themes.actions';

@Component({
  selector: 'app-themes-list',
  imports: [ThemeItemComponent, AsyncPipe],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css'
})
export class ThemesListComponent implements OnInit{
  themes$: Observable<Theme[]>;
  isLoading$: Observable<boolean>;

  constructor(private apiService: ApiService, private store: Store){
    this.themes$ = this.store.select(selectThemesSortedBySubscribers);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadThemes());

    this.apiService.getThemes().subscribe((themes) => {
      this.store.dispatch(loadThemesSuccess({ themes }));
    })
  }
}
