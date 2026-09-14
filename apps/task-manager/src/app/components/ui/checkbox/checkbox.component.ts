import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  readonly id = input.required<string>();
  readonly checked = input(false);
  readonly label = input('');

  readonly checkedChange = output<boolean>();

  readonly ariaLabel = computed(
    () => this.label() || (this.checked() ? 'Finished Task' : 'Pending Task'),
  );

  onChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(checked);
  }
}
