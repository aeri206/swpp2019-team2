import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

jest.mock('react-slideshow-image', () => ({
  Slide({ children }) {
    return (
      <div>
Hello
        {children}
      </div>
    );
  },
}));

const mockStore = getMockStore({
  Articles: [],
  selectedArticle: null,
  Comments: [],
  selectedComment: null,
  User: [],
  selectedUser: null,
  result: [],
  User2: [],
});


describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });
});
