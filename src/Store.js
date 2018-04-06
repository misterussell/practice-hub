import Cells from './collections/Cells';
import Tracking from './collections/LifeTracking';

let store = {
  cells: Cells(),
  tracking: Tracking(),
  changes: {}
};

export default store;
