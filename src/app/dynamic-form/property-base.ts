/**
 * Created by jayhamilton on 2/3/17.
 */
export class PropertyBase<T> {
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  value?: T;
  options?:any;


  constructor(
    props: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      options?:any
    } = {}
  ) {
    this.key = props.key || '';
    this.label = props.label || '';
    this.required = !props.required;
    this.order = props.order === undefined ? 1 : props.order;
    this.controlType = props.controlType || '';
    this.value = props.value;
    this.options = props.options
  }
}
