import { OrderedMap } from 'immutable';

import { lumberSize } from './constants';

const initialCut = {
  label: '',
  size: lumberSize,
  color: {
    r: 255,
    g: 240,
    b: 215,
    a: 1,
  },
};

export default class CutStore {

  constructor() {
    this.cuts = OrderedMap(); // cuts: OrderedMap[number, Cut]
    this.nextId = 0;
  }

  updateLabelOf(id, label) {
    this.cuts = this.cuts.update(id, cut => ({
      ...cut,
      label,
    }));
    return this;
  }

  updateSizeOf(id, size) {
    this.cuts = this.cuts.update(id, cut => ({
      ...cut,
      size,
    }));
    return this;
  }

  updateColorOf(id, color) {
    this.cuts = this.cuts.update(id, cut => ({
      ...cut,
      color,
    }));
    return this;
  }

  remove(id) {
    this.cuts = this.cuts.delete(id);
    return this;
  }

  add() {
    this.cuts = this.cuts.set(this.nextId, initialCut);
    this.nextId = this.nextId + 1;
    return this;
  }

  copy(id) {
    const cut = this.cuts.get(id);
    if (typeof cut !== 'undefined') {
      this.cuts = this.cuts.set(this.nextId, cut);
      this.nextId = this.nextId + 1;
    }
    return this;
  }

  all() {
    return this.cuts.entrySeq().map((kv) => ({
      id: kv[0],
      ...kv[1],
    }));
  }
}
