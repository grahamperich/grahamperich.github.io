//setup click handlers, initiate app on load...
$(function() {
  $('.btn').click(handleClick)
  // $('#about').click(handleAboutClick)
  // $('#contact').click(handleContactClick)

  $('#line-one').typed({
    // strings: ["Booting up... ^1000", "SUCCESS ^1000"],
    strings: ["a"],
    typeSpeed: 5,
    showCursor: false,
    callback: setTextAndInit.bind(this, 'grahamperich@TheCloud ~')
  });
});

// mock "DOM CLI" methods

function setTextAndInit(str) {
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
  $(`${id}`).text('');

  if (callback) {
    // pass args to cb (optionally) as needed
    args && args.length > 0 ? callback.apply(this, args) : callback()
  }
}

function ls(items) {
  $('#command-line').append('<br>');
  $('#command-line').append(`<span id="line-three"></span>`);

  $('.btn').toggleClass('scale-out');

  items.forEach(item => {
    $('#line-three').append(`<span class="cli-file">${item}</span>`);
  })

}

function renderLine4And5(id, strings) {
  console.log(id)
  $('#command-line').append('<br>');
  $('#command-line').append('grahamperich@TheCloud ~  <span id="line-four"></span>');
  $('#command-line').append('<br>');
  $('#command-line').append('<span id="line-five"></span>');

  strings.forEach(string => {
    $('#line-five').append(`<span class="cli-file">${string}</span>`);
  })
  

  $('#line-four').typed({
    strings: [""],
    typeSpeed: 5,
    showCursor: true
  });

}

// click handlers

function handleClick() {
  if (this.called) {
    return;
  }

  this.called = true
  var id = this.id
  $('#line-two').typed({
    strings: ["^500 open ./Projects ^1500"],
    typeSpeed: 20,
    showCursor: false,
    callback: clearText.bind(this, '#line-two', renderLine4And5.bind(this, id, ['Nimbus', 'Colorz.io', 'SDSUEvents']))
  });
}
