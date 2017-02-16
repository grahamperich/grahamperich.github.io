console.log('hi');

$(function(){
  $('#main').typed({
    strings: ["Booting up... ^1000", "SUCCESS ^1000"],
    typeSpeed: 5,
    showCursor: false,
    callback: clearText
  });
});

function clearText(){
  $('#main').text('');
}
