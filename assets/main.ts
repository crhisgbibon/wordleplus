'use strict';

import $ from 'jquery';

const imagesContext = require.context(
  './images',
  true,
  /\.(png|jpg|jpeg|gif|ico|svg|webp)$/
);
imagesContext.keys().forEach(imagesContext);

const playPath = imagesContext('./play.svg');
const pausePath = imagesContext('./pause.svg');

function CalculateVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

window.addEventListener('DOMContentLoaded', CalculateVh);
window.addEventListener('resize', CalculateVh);
window.addEventListener('orientationchange', CalculateVh);
