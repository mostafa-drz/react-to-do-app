import React from 'react';
import '../stylesheets/loading.css';

const Loading = () => {
  return <div calss="loading">
    <div class="loading__logo">
      <div class="vertical">
        <div className="sq sq__top"></div>
        <div className="sq sq__bottom"></div>
        <div className="sq sq__top"></div>
        <div className="sq sq__bottom"></div>
        <div className="sq sq__top"></div>
        <div className="sq sq__bottom"></div>
        <div className="sq sq__top"></div>
      </div>
      <div class="horizontal">
        <div className="hq hq__right"></div>
        <div className="hq hq__left"></div>
        <div className="hq hq__right"></div>
        <div className="hq hq__left"></div>
        <div className="hq hq__right"></div>
        <div className="hq hq__left"></div>
        <div className="hq hq__right"></div>
      </div>
    </div>
  </div>
}

export default Loading;