import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Search.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import LipForm from '../Components/LipForm';
import arrow from '../image/화살표.png';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button_dry: false,
      button_oily: false,
      button_red: false,
      button_orange: false,
      button_pink: false,
      button_high: false,
      button_medium: false,
      button_low: false,
      button_face: false,
      button_skin: false,
      button_lip: false,
      button_lip_stick: false,
      button_lip_tint: false,
      button_lip_gloss: false,
      button_lip_balm: false,
      button_lip_matte: false,
      button_lip_glossy: false,
      button_lip_none: false,
      lip: [],
      set_Lip: false,
    };
  }

  componentDidMount() { // initialize state
    this.props.onTryAutoSignup();
  }

  logout = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
  }

  back = () => { // 메인페이지로 넘어가는 state 설정해주기
    this.setState({ back: true });
  }

  mypageHandler = (id) => {
    this.props.history.replace(`../mypage/${id}`);
  }


  clickFaceTag() { // 최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({ initiate: true });
    const buttonFace = this.state.button_face;
    this.setState({ button_face: !buttonFace, button_lip: false, button_skin: false });
  }

  clickSkinTag() { // 최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({ initiate: true });
    const buttonSkin = this.state.button_skin;
    this.setState({ button_skin: !buttonSkin, button_lip: false, button_face: false });
  }

  clickLipTag() { // 최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({ initiate: true });
    const buttonLip = this.state.button_lip;
    this.setState({ button_lip: !buttonLip, button_skin: false, button_face: false });
  }

  // 여기서부터 하위 태그들(커버력: 상 중 하) 클릭 시 색상 변경 (더러움 주의!)

  handleClickDry() { // dry 태그 선택
    const buttonDry = this.state.button_dry;
    this.setState({ button_dry: !buttonDry });
  }

  handleClickOily() { // oily 태그 선택
    const buttonOily = this.state.button_oily;
    this.setState({ button_oily: !buttonOily });
  }

  // handleClickRed() { // red 태그 선택
  //   const buttonRed = this.state.button_red;
  //   this.setState({ button_red: !buttonRed });
  //   this.setState({ search_init: false });
  // }

  // handleClickOrange() { // orange 태그 선택
  //   const buttonOrange = this.state.button_orange;
  //   this.setState({ button_orange: !buttonOrange });
  //   this.setState({ search_init: false });
  // }

  // handleClickPink() { // pink 태그 선택
  //   const buttonPink = this.state.button_pink;
  //   this.setState({ button_pink: !buttonPink });
  //   this.setState({ search_init: false });
  // }

  handleClickHigh() { // high 태그 선택
    const buttonHigh = this.state.button_high;
    this.setState({ button_high: !buttonHigh });
  }

  handleClickMedium() { // medium 태그 선택
    const buttonMedium = this.state.button_medium;
    this.setState({ button_medium: !buttonMedium });
  }

  handleClickLow() { // low 태그 선택
    const buttonLow = this.state.button_low;
    this.setState({ button_low: !buttonLow });
  }

  handleClickStick() { // dry 태그 선택
    const buttonLipstick = this.state.button_lip_stick;
    this.setState({ button_lip_stick: !buttonLipstick });
    this.setState({ search_init: false });
  }

  handleClickGloss() { // dry 태그 선택
    const buttonLipgloss = this.state.button_lip_gloss;
    this.setState({ button_lip_gloss: !buttonLipgloss });
    this.setState({ search_init: false });
  }

  handleClickTint() { // dry 태그 선택
    const buttonLiptint = this.state.button_lip_tint;
    this.setState({ button_lip_tint: !buttonLiptint });
    this.setState({ search_init: false });
  }

  handleClickBalm() { // dry 태그 선택
    const buttonLipbalm = this.state.button_lip_balm;
    this.setState({ button_lip_balm: !buttonLipbalm });
    this.setState({ search_init: false });
  }

  handleClickMatte() { // dry 태그 선택
    const buttonLipmatte = this.state.button_lip_matte;
    this.setState({ button_lip_matte: !buttonLipmatte });
    this.setState({ search_init: false });
  }

  handleClickGlossy() { // dry 태그 선택
    const buttonLipglossy = this.state.button_lip_glossy;
    this.setState({ button_lip_glossy: !buttonLipglossy });
    this.setState({ search_init: false });
  }

  handleClickFormNone() { // dry 태그 선택
    const buttonLipnone = this.state.button_lip_none;
    this.setState({ button_lip_none: !buttonLipnone });
    this.setState({ search_init: false });
  }

  search() {
    this.setState({ sample: '' });
    this.setState({ search_init: true });
  }


  render() {
    let changePage = '';
    let tagNum; // 최상위 3개 태그 렌더 변수
    let backLogin = '';
    let result = '';
    let lipResult;

    if (!this.props.isAuthenticated) {
      changePage = <Redirect to="/login" />;
    }

    if (this.state.search_init) {
      if (this.state.button_lip) {
        if (this.state.button_lip_gloss || this.state.button_lip_stick
          || this.state.button_lip_tint || this.state.button_lip_balm) {
          if ((this.state.button_lip_matte || this.state.button_lip_glossy 
            || this.state.button_lip_none)) {
            if (this.state.button_lip_stick) result = result.concat('category=stick&');
            if (this.state.button_lip_gloss) result = result.concat('category=gloss&');
            if (this.state.button_lip_tint) result = result.concat('category=tint&');
            if (this.state.button_lip_balm) result = result.concat('category=balm&');
            if (this.state.button_lip_matte) result = result.concat('form=matte&');
            if (this.state.button_lip_glossy) result = result.concat('form=glossy&');
            if (this.state.button_lip_none) result = result.concat('form=none&');
            this.props.onGetLip(result);
            const sampleLip = this.props.storedLips;
            if (!this.state.set_Lip) {
              this.setState({ lip: sampleLip });
              this.setState({ set_Lip: true });
            }
            lipResult = this.state.lip.map((cosmos) => (
              <LipForm
                key={cosmos.id}
                thumbnail={cosmos.thumbnail}
                name={cosmos.name}
                price={cosmos.price}
                category={cosmos.category}
                form={cosmos.form}
                brand={cosmos.brand}
              />
            ));
          }
        }
      }
    }
    if (this.state.back === true) { // 메인페이지로 돌아가기
      backLogin = <Redirect to="/main" />;
    }

    if (this.state.initiate && (this.state.button_face || this.state.button_skin)) {
      tagNum = (
        <div className="Sub_category">

          <div className="Sub_tag">
            <section className="Skin_types">
              <h4 id="SkinTypes">&emsp;SkinType</h4>
          &emsp;
              <button type="button" className={this.state.button_dry ? 'buttonTrue' : 'buttonFalse'} id="SkinTypes-dry" onClick={() => this.handleClickDry()}>Dry</button>
&emsp;
              <button type="button" className={this.state.button_oily ? 'buttonTrue' : 'buttonFalse'} id="SkinTypes-oily" onClick={() => this.handleClickOily()}>Oily</button>
&emsp;

            </section>

            <section className="Coverage">
              <h4 id="Coverage">&emsp;Coverage</h4>
          &emsp;
              <button type="button" className={this.state.button_high ? 'buttonTrue' : 'buttonFalse'} id="Coverage-high" onClick={() => this.handleClickHigh()}>High</button>
&emsp;
              <button type="button" className={this.state.button_medium ? 'buttonTrue' : 'buttonFalse'} id="Coverage-medium" onClick={() => this.handleClickMedium()}>Medium</button>
&emsp;
              <button type="button" className={this.state.button_low ? 'buttonTrue' : 'buttonFalse'} id="Coverage-low" onClick={() => this.handleClickLow()}>Low</button>
&emsp;

            </section>
        &emsp;
            <button type="button" id="search_result" onClick={() => this.search()}>Search!</button>
          </div>
        </div>
      );
    }


    if (this.state.initiate && this.state.button_lip) { // Lip 선택 시
      tagNum = (
        <div className="Sub_category">

          <div className="Sub_tag">
            <section className="Lip_Category">
              <h4 id="Lip_Category">&emsp;Category</h4>
          &emsp;
              <button type="button" className={this.state.button_lip_stick ? 'buttonTrue' : 'buttonFalse'} id="lip-stick" onClick={() => this.handleClickStick()}>립스틱</button>
&emsp;
              <button type="button" className={this.state.button_lip_gloss ? 'buttonTrue' : 'buttonFalse'} id="lip-gloss" onClick={() => this.handleClickGloss()}>립글로스</button>
&emsp;
              <button type="button" className={this.state.button_lip_tint ? 'buttonTrue' : 'buttonFalse'} id="lip-tint" onClick={() => this.handleClickTint()}>틴트</button>
&emsp;
              <button type="button" className={this.state.button_lip_balm ? 'buttonTrue' : 'buttonFalse'} id="lip-balm" onClick={() => this.handleClickBalm()}>립밤</button>
&emsp;

            </section>

            <section className="Lip_form">
              <h4 id="Lip_Form">&emsp;Form</h4>
          &emsp;
              <button type="button" className={this.state.button_lip_matte ? 'buttonTrue' : 'buttonFalse'} id="lip-matte" onClick={() => this.handleClickMatte()}>Matte</button>
&emsp;
              <button type="button" className={this.state.button_lip_glossy ? 'buttonTrue' : 'buttonFalse'} id="lip-glossy" onClick={() => this.handleClickGlossy()}>Glossy</button>
&emsp;
              <button type="button" className={this.state.button_lip_none ? 'buttonTrue' : 'buttonFalse'} id="lip-none" onClick={() => this.handleClickFormNone()}>None</button>
&emsp;
            </section>
        &emsp;
            <button type="button" id="search_result" onClick={() => this.search()}>Search!</button>

          </div>
        </div>
      );
    }

    return (

      <div className="Search">
        {changePage}
        <div className="upperbar">
          {backLogin}
          <h1>Search</h1>
          <div className="buttons">
            <button id="back-button" type="button" onClick={() => this.back()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button>
            <button type="button" id="log-out-button" onClick={() => this.logout()}>Log-out</button>
            {backLogin}
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
          </div>

        </div>
        <div className="Content">
          <div className="Left">
            <h4 className="Category">
              <button type="button" className={this.state.button_face ? 'buttonTrue' : 'buttonFalse'} id="Category_face" onClick={() => this.clickFaceTag()}>Face</button>
&emsp;
              <button type="button" className={this.state.button_skin ? 'buttonTrue' : 'buttonFalse'} id="Category_skin" onClick={() => this.clickSkinTag()}>Skin</button>
&emsp;
              <button type="button" className={this.state.button_lip ? 'buttonTrue' : 'buttonFalse'} id="Category_lip" onClick={() => this.clickLipTag()}>Lip</button>
&emsp;
            </h4>

            <div className="Sub_category">
              {tagNum}

            </div>
          </div>

          <div className="Result">

            {lipResult}
          </div>
        </div>
      </div>


    );
  }
}

const mapStateToProps = (state) => ({

  storedLips: state.cosmos.Lip,
  isAuthenticated: state.cosmos.token != null,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});


const mapDispatchToProps = (dispatch) => ({

  onGetLip: (result) => dispatch(actionCreators.getLips(result)),
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
