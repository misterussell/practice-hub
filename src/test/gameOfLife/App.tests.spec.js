import { expect } from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('The app component should:', () => {
  
  it('render without crashing', () => {
    const div = document.createElement('div');
    expect(ReactDom.render(<App />, div)).to.not.throw();
  }

}
