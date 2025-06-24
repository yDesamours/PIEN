export class BoxArgument {
  component = "";
  data = {};
  id = 0;
  order = 0;
  constructor(component, data, id, order) {
    this.data = data;
    this.component = component;
    this.id = id;
    this.order = order;
  }
}
