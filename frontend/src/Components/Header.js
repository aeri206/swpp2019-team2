import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

class Header extends Component {
  logout = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
    localStorage.removeItem('nickname');
    localStorage.removeItem('token');
    this.forceUpdate();
    const { selected } = this.props;
    if (selected === 2 || selected === -1) {
      this.props.update();
    }
  }

  render() {
    const { history, selected } = this.props;
    let menu;
    if (localStorage.getItem('token')) {
      menu = <button type="button" id="log-out-button" onClick={() => this.logout()}>Log-out</button>;
    } else {
      menu = <button type="button" id="log-in-button" onClick={() => history.push('../login')}>Log-in</button>;
    }
    let infoString = <div className="header-user" />;
    if (localStorage.getItem('nickname')) {
      infoString = (
        <div className="header-user">
        Hello,
          {' '}
          <text>{localStorage.getItem('nickname')}</text>
        </div>
      );
    }
    return (
      <div className="header">
        <div className="title"><a className="title-link" href=".">COSMOS</a></div>
        <div className="header-menu">
          <div className={`menu-container ${selected === 0 ? 'selected' : ''} `}><a className="menu-item" href="search">Search</a></div>
          <div className={`menu-container ${selected === 1 ? 'selected' : ''} `}><a className="menu-item" href="budget">Budget Search</a></div>
          <div className={`menu-container ${selected === 2 ? 'selected' : ''} `}><a className="menu-item" href="skintone">Tone Analysis</a></div>
          <div className={`menu-container ${selected === 3 ? 'selected' : ''} `}><a className="menu-item" href="sale">Sales Info</a></div>
        </div>
        <div className="header-personal">
          {infoString}
          <div className="header-button">
            <button id="my-page-button" type="button" onClick={() => history.push('../mypage')}>My Page</button>
            {menu}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
});


export default connect(null, mapDispatchToProps)(Header);
