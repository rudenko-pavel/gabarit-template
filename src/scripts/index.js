"use strict";
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;

import '../styles/index.scss';
console.log('webpack starterkit');

/************* add chapters *******/
$(function(){
  function callback () { 
    console.log('chapters were added'); 
    var url = "../js/main.js";
    $.getScript( url, function() { console.log ("main.js added"); });
  }
  
  var itemsProcessed = 0;
  var includes = $('[data-include]');
  jQuery.each(includes, function(){
    var file = '../includes/chapters/' + $(this).data('include') + '.html';
    $(this).load(file);
    itemsProcessed++;
    if(itemsProcessed === includes.length) { callback(); }
  });
});