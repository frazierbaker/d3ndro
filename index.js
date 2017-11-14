import * as d3 from 'd3';
import $ from 'jquery';
import d3ndro from './src/d3ndro';
import style from './src/d3ndro.css';

window.d3ndro = Object.assign({}, d3ndro);
window.d3ndro.d3 = d3;
window.d3ndro.$ = $;

export default window.d3ndro;