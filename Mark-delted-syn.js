// ==UserScript==
// @name         mark-deleted-synonym
// @namespace    mark_deleted_synonym
// @version      1
// @description  Auto-Check of Approved and Deleted Synonyms in CH
// @author       rahimth@, ushentai@
// @match        https://enumeration-discovery*.amazon.com/*
// @include     https://enumeration-discovery*.amazon.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
// @downloadURL  https://drive.corp.amazon.com/view/GCO%20Tools/mark_gv0_value.user.js
// @updateURL    https://drive.corp.amazon.com/view/GCO%20Tools/mark_gv0_value.user.js
// @run-at       document-start
// ==/UserScript==


(function() {
  'use strict';

  waitForKeyElements('.search-results', refresh);

   function refresh() {
  var mySet = new Set();

  $('tbody td span#deleted').each(function() {
    mySet.add($(this).parent().next().text());
  });
  $('tbody td span#approved_deletion').each(function() {
    mySet.add($(this).parent().next().text());
  });

  $('td').each(function() {
    var tabIndex = $(this).attr('tabindex');
    var spanText = $(this).find('span').text().trim();
    if (tabIndex % 8 === 3 && spanText.match(/^(Synonym)$/i)) {
      if (mySet.has($(this).prev().text())) {
        $(this).closest("tr").css("background-color", "#D98880");
      } else {
        $(this).closest("tr").css("background-color", "#A3E4D7");
      }
    }
  });
}


  var amstypeinterval = window.setInterval(function(){
    refresh();
  }, 800);

})();
