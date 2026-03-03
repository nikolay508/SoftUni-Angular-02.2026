import { Component } from '@angular/core';
import { of, from } from 'rxjs';
import { map, filter, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs-demo',
  imports: [],
  templateUrl: './rxjs-demo.component.html',
  styleUrl: './rxjs-demo.component.css',
})
export class RxjsDemoComponent {
  results: string[] = [];

  clearResults(): void {
    this.results = [];
  }

  demo1(): void {
    this.clearResults();
    this.results.push('of() + subscribe() demonstation');

    of(1, 2, 3, 4, 5).subscribe((value) => {
      this.results.push(`Received ${value}`);
    });
  }

  demo2(): void {
    this.clearResults();
    this.results.push('pipe() + filter() + map() demonstation');

    from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .pipe(
        filter((n) => n % 2 === 1),
        map((n) => n + ' euro'),
      )
      .subscribe((value) => {
        this.results.push(`Result: ${value}`);
      });
  }

  demo3(): void {
    this.clearResults();
    this.results.push('pipe() + filter() + map() demonstation');

    from([1, 2, 3, 4, 5])
      .pipe(
        tap((n) => console.log(`Before ${n}euro`)),
        map((n) => (n * 1.95) + ' lev'),
        tap((n) => console.log(`After ${n}`)),
      )
      .subscribe((value) => {
        this.results.push(`Convert: ${value}`);
      });
  }
}
