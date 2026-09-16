import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { APP_ICONS, type AppIconName } from '../../../types';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  imports: [MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<AppIconName>();
  readonly label = input<string>('');
  readonly size = input<number>(18);

  readonly icon = computed(() => APP_ICONS[this.name()]);
  readonly accessibleLabel = computed(() => this.label() || this.name());
}
