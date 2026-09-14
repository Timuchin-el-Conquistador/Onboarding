import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type IconButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  readonly label = input.required<string>();
  readonly type = input<IconButtonType>('button');
  readonly buttonClass = input('class');
  readonly action = output<void>();

  readonly nativeType = computed<IconButtonType>(() => this.type());

  onClick(): void {
    this.action.emit();
  }
}
