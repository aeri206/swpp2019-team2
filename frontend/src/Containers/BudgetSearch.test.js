/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import BudgetSearch from './BudgetSearch';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';

const stubInitialState = {
  selectedUser: {
    id: 1,
    email: 'TEST_EMAIL',
    password: 'TEST_PASS',
    name: 'TEST',
    logged_in: false,
  },
  Users: [
    {
      id: 1,
      email: 'TEST_EMAIL',
      password: 'TEST_PASS',
      name: 'TEST',
      logged_in: false,
    },
    {
      id: 2,
      email: 'TEST_EMAIL2',
      password: 'TEST_PASS2',
      name: 'TEST2',
      logged_in: false,
    },
    {
      id: 3,
      email: 'TEST_EMAIL3',
      password: 'TEST_PASS3',
      name: 'TEST3',
      logged_in: false,
    },
  ],
};

const mockStore = getMockStore(stubInitialState);

describe('<BudgetSearch />', () => {
  let budgetsearch; let spyGetUsers; let spyGetUser; let
    spylogout; let testBudgetSearch;
  beforeEach(() => {
    budgetsearch = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <BudgetSearch
                  {...props}
                  UserLogOut={spylogout}
                  onGETUSERS={spyGetUsers}
                  onGETUSER={spyGetUser}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUsers = jest
      .spyOn(actionCreators, 'getUsers')
      .mockImplementation(() => (dispatch) => { });
    spyGetUser = jest
      .spyOn(actionCreators, 'getUser')
      .mockImplementation(() => (dispatch) => { });
    spylogout = jest.spyOn(actionCreators, 'putUser').mockImplementation((cosmos) => (dispatch) => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render BudgetSearch', () => {
    const component = mount(budgetsearch);
    const wrapper = component.find('BudgetSearch');
    expect(wrapper.length).toBe(1);
    expect(spyGetUsers).toBeCalledTimes(1);
    expect(spyGetUser).toBeCalledTimes(1);
  });
  it('should call mypageHandler', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'replace')
      .mockImplementation((path) => { });
    const component = mount(budgetsearch);
    const wrapper = component.find('#my-page-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('../mypage/1');
  });
  it('should call confirmhandler && alert', () => {
    const mockSwal = jest.fn();
    const component = shallow(<BudgetSearch.WrappedComponent />);
    const button = component.find('#combine-cosmetics-button');
    button.prop('onClick')(mockSwal());
    expect(mockSwal).toHaveBeenCalledTimes(1);
  });
  it('should call set_itemnum', () => {
    const component = mount(budgetsearch);
    const newInstance = component
      .find(BudgetSearch.WrappedComponent)
      .instance();
    const wrapper = component.find('#item_num');
    wrapper.simulate('change', { target: { value: 3 } });
    expect(newInstance.state.item_num).toEqual(3);
  });
  it('should handle checkbox change properly', () => {
    const component = shallow(<BudgetSearch.WrappedComponent />);
    for (let i = 0; i < 10; i++) {
      const button = component.find(`#range${i + 1}`);
      button.simulate('change', { target: { checked: true } });
      expect(component.state().budgetRange).toEqual([5000 * i, 5000 * (i + 1)]);
      button.simulate('change', { target: { checked: false } });
      expect(component.state().budgetRange).toBe(null);
    }
  });
  it('should call logoutHandler', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(budgetsearch);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUsers).toBeCalledTimes(2);
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/login');
  });
  it('should redirect to /login when not logged_in', () => {
    const component = mount(budgetsearch);
    expect(component.find(Redirect)).toHaveLength(1);
  });
  it('should not redirect to /login when logged_in', () => {
    const mockInitialStore = getMockStore({
      selectedUser: {
        id: 1,
        email: 'TEST_EMAIL',
        password: 'TEST_PASS',
        name: 'TEST',
        logged_in: true,
      },
      Users: [
        {
          id: 1,
          email: 'TEST_EMAIL',
          password: 'TEST_PASS',
          name: 'TEST',
          logged_in: false,
        },
        {
          id: 2,
          email: 'TEST_EMAIL2',
          password: 'TEST_PASS2',
          name: 'TEST2',
          logged_in: false,
        },
        {
          id: 3,
          email: 'TEST_EMAIL3',
          password: 'TEST_PASS3',
          name: 'TEST3',
          logged_in: false,
        },
      ],
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <BudgetSearch
                  {...props}
                  UserLogOut={spylogout}
                  onGETUSERS={spyGetUsers}
                  onGETUSER={spyGetUser}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find(Redirect)).toHaveLength(0);
  });
  it('does not have a selectedUser', () => {
    const spyHistoryPush = jest.spyOn(history, 'push');
    const mockInitialStore = getMockStore({
      selectedUser: null,
      Users: [
        {
          id: 1,
          email: 'TEST_EMAIL',
          password: 'TEST_PASS',
          name: 'TEST',
          logged_in: false,
        },
        {
          id: 2,
          email: 'TEST_EMAIL2',
          password: 'TEST_PASS2',
          name: 'TEST2',
          logged_in: false,
        },
        {
          id: 3,
          email: 'TEST_EMAIL3',
          password: 'TEST_PASS3',
          name: 'TEST3',
          logged_in: false,
        },
      ],
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <BudgetSearch
                  {...props}
                  UserLogOut={spylogout}
                  onGETUSERS={spyGetUsers}
                  onGETUSER={spyGetUser}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find(Redirect)).toHaveLength(0);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUsers).toBeCalledTimes(1);
    expect(spyGetUser).toBeCalledTimes(1);
    expect(spylogout).toBeCalledTimes(0);
    expect(spyHistoryPush).toBeCalledTimes(0);
  });
  it('does have a selectedUser && logged_in ', () => {
    const spyHistoryPush = jest.spyOn(history, 'push');
    const mockInitialStore = getMockStore({
      selectedUser: {
        id: 1,
        email: 'TEST_EMAIL',
        password: 'TEST_PASS',
        name: 'TEST',
        logged_in: true,
      },
      Users: [
        {
          id: 1,
          email: 'TEST_EMAIL',
          password: 'TEST_PASS',
          name: 'TEST',
          logged_in: false,
        },
        {
          id: 2,
          email: 'TEST_EMAIL2',
          password: 'TEST_PASS2',
          name: 'TEST2',
          logged_in: false,
        },
        {
          id: 3,
          email: 'TEST_EMAIL3',
          password: 'TEST_PASS3',
          name: 'TEST3',
          logged_in: false,
        },
      ],
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <BudgetSearch
                  {...props}
                  UserLogOut={spylogout}
                  onGETUSERS={spyGetUsers}
                  onGETUSER={spyGetUser}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find(Redirect)).toHaveLength(0);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUsers).toBeCalledTimes(2);
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(0);
  });
});
