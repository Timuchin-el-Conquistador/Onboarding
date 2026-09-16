import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  readonly id = input<string>();
  readonly checked = input(false);
  readonly label = input('');
  readonly changed = output<boolean>();

  readonly ariaLabel = computed(
    () => this.label() || (this.checked() ? 'Finished Task' : 'Pending Task'),
  );

  onChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.changed.emit(checked);
  }
}
