import React from 'react';
import AppStart from "./App";
import ReactDOM from 'react-dom';


test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppStart/>,div);
  ReactDOM.unmountComponentAtNode(div);
});
