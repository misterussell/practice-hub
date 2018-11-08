import Cells from './collections/Cells';
import Tracking from './collections/LifeTracking';

import MobXCell from './models/mobXCell';

let store = {
  cells: Cells(),
  tracking: Tracking(),
  changes: {}
};

export default store;
