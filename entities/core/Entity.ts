import _ from "lodash";
import { formatDate } from "../../utils.js";
import {
  EntityBaseKey,
  EntityId,
  EntityKey,
  EParams,
  EParamsModel,
  FilterObject,
  GView,
  ViewData,
} from "./type.js";

export type EntityParams = { [key: string]: string };
export type EntityUpdater<V extends GView> = (
  entityData: ViewData<V>
) => ViewData<V>;

export class Entity<V extends GView, M extends EntityParams> {
  view: V;
  paramsModel: M;

  constructor(view: V, paramsModel: M) {
    this.view = view;
    this.paramsModel = paramsModel;
  }

  //View Functions

  getAll(params: EntityParams, filters?: FilterObject) {
    if (filters)
      for (let key in params) {
        let value: any = params[key];
        if (value instanceof Date) value = formatDate(value);

        filters[key] = `${this.paramsModel[key]}.${value}`;
      }
    return this.view.getAll(filters);
  }

  get(id: EntityId) {
    return this.view.get(id);
  }

  //Entity Cache Functions
  filterKey(params: EParams<this>): string {
    return JSON.stringify(this.baseKey(params));
  }
  baseKey(params: EParams<this>): EntityBaseKey {
    return [this.view.schema, this.view.view, this.view.select, params];
  }

  entityKey(id: EntityId | undefined): EntityKey {
    return [this.view.schema, this.view.view, this.view.select, null, id];
  }

  deepInvalidate() {}

  invalidate(params: EParams<this>) {}

  //Single Entity
  update(id: EntityId, updater: EntityUpdater<V>) {}

  //Single Entity
  remove(id: EntityId) {}

  syncDependency() {}
}
