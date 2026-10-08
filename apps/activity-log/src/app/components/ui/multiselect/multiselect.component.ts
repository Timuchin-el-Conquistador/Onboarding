import {
  Combobox,
  ComboboxPopup,
  ComboboxWidget,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import {
  afterRenderEffect,
  Component,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-ui-multiselect:not([theme="basic-material"])',
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
  imports: [
    Combobox,
    ComboboxPopup,
    ComboboxWidget,
    Listbox,
    Option,
    OverlayModule,
  ],
})
export class MultiSelectComponent {
  readonly listbox = viewChild(Listbox);

  readonly popupExpanded = signal(false);
  readonly selectedValues = signal<string[]>([]);

  readonly displayIcon = computed(() => {
    const values = this.selectedValues();
    const label = this.labels.find((label) => label.value === values[0]);
    return label ? label.icon : 'filter_alt';
  });

  readonly displayValue = computed(() => {
    const values = this.selectedValues();
    if (values.length === 0) {
      return 'Filter by event';
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} + ${values.length - 1} more`;
  });

  readonly labels = [
    { value: 'CREATE_TODO', icon: 'add_task' },
    { value: 'CREATE_TASK', icon: 'note_add' },
    { value: 'UPDATE_TASK', icon: 'edit_note' },
    { value: 'DELETE_TASK', icon: 'delete' },
    { value: 'DELETE_TODO', icon: 'delete_forever' },
  ];

  constructor() {
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }
}
