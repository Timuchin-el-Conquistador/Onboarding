import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import type { ButtonType } from '../../../types';
import { ButtonVariant } from '../../../types';
import { ButtonVariantType } from '../../../types/button.type';

@Component({
  selector: 'app-ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly label = input.required<string>();
  readonly type = input<ButtonType>('button');
  readonly variant = input<ButtonVariantType>(ButtonVariant.DEFAULT);
  readonly clicked = output<void>();

  readonly isDanger = computed(() => this.variant() === ButtonVariant.DANGER);

  onClick(): void {
    this.clicked.emit();
  }
}
