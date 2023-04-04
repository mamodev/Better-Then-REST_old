// Entity1 depends on Entity2
// When mututating Entity2 => Entity1 must invalidate

import { GEntity } from './core/type';

const entityDependency = new Map<GEntity, GEntity[]>();

function addDependency(entity: GEntity, dependsOn: GEntity) {
  const dependency = entityDependency.get(dependsOn) ?? [];
  entityDependency.set(dependsOn, [entity, ...dependency]);
}

//Here add dependency

export default entityDependency;
