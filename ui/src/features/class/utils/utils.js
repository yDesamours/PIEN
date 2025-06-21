export class BoxArgument {
  component = "";
  data = {};
  id = 0;
  constructor(component, data, id) {
    this.data = data;
    this.component = component;
    this.id = id;
  }
}
