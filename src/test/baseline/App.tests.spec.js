import React from 'react';
import chai, { expect } from 'chai';
import { Router } from 'react-router-dom';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import App from '../../App';

describe('The app component should:', () => {

  // it('should exist', () => {
  //   const app = mount(<App />);
  //   expect(app).to.exist;
  //   error:Invariant Violation: You should not use <Link> outside a <Router>
  //   - need to resolve this
  // });

});
