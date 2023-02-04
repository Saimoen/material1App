import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public options: string[] = ['Paris', 'Nice', 'Nîmes'];
  public filteredOptions?: Observable<string[]>;
  @ViewChild('food', { static: true }) public el?: MatSelectionList;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      input: ['', Validators.required],
      checkbox: [''],
      radio: [''],
      toggle: [''],
      select: [''],
      slider: [''],
      date: [''],
      start: [''],
      end: [''],
      autocomplete: [''],
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [''],
      checkbox: [''],
      radio: [''],
      toggle: [''],
      select: [''],
      slider: [''],
      date: [''],
      start: [''],
      end: [''],
      autocomplete: [''],
    });

    this.filteredOptions = this.form.get('autocomplete')?.valueChanges.pipe(
      startWith(''),
      map((v: string) =>
        this.options.filter((option) =>
          option.toLowerCase().includes(v.toLowerCase())
        )
      )
    );

    this.el?.selectionChange.subscribe((v) => this.el?.selectedOptions.select);
  }
}
