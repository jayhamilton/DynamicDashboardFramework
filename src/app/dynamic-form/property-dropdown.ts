
import { PropertyBase } from './property-base';

export class DropdownProperty extends PropertyBase<string> {
  override controlType = 'dropdown';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = '';
  }
}
