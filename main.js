// .typed method is async because of timeouts and effects; functions passed as callbacks to guarantee order

$(function(){
  $('#line-one').typed({
    strings: ["Booting up... ^1000", "SUCCESS ^1000"],
    typeSpeed: 5,
    showCursor: false,
    callback: setTextAndInit.bind(this, 'grahamperich@TheCloud ~')
  });
});

// initiate app after intro sequence completes
function setTextAndInit(str) {
  console.log('starting main app sequence');
  $('#line-one').text(str);
  $('#command-line').append(`<span id="line-two"></span>`);

  $('#line-two').typed({
    strings: ["^1000 ls ^1500"],
    typeSpeed: 5,
    showCursor: true,
    callback: clearText.bind(this, '#line-two', ls.bind(this, ['Projects', 'About-Graham', 'Contact']))
  });
}

function clearText(id, callback, args) {
  console.log('clearing text');
  $(`${id}`).text('');

  if (callback) {
    // pass args to cb (optionally) as needed
    args && args.length > 0 ? callback.apply(this, args) : callback()
  }
}

function ls(items) {
  $('#command-line').append('<br>');
  $('#command-line').append(`<span id="line-three"></span>`);

  items.forEach(item => {
    $('#line-three').append(`<span class="cli-file">${item}</span>`);
  })

}
