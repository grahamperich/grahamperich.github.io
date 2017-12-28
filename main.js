//setup click handlers, initiate app on load...
$(function() {
  $('ul.tabs').tabs();
  $('#projects').click(handleProjectsClick)
  $('#about').click(handleAboutClick)
  setTimeout(() => {
    $('canvas').fadeOut(800);
    $('#photo').css('visibility', 'visible');
    $('#photo').fadeIn(800);
    clearInterval(intervalId)
  }, 2000);
  $('#line-one').typed({
    strings: ["Booting up... ^3000", "SUCCESS ^1000"],
    typeSpeed: 5,
    showCursor: false,
    callback: setTextAndInit.bind(this, 'grahamperich@TheEther ~')
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
    callback: clearText.bind(this, '#line-two', ls.bind(this, ['Projects', 'About.js', 'Contact.js']))
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

  $('.mainButtons').toggleClass('scale-out');

  items.forEach(item => {
    $('#line-three').append(`<span class="cli-file">${item}</span>`);
  })

}

function renderLine4And5(id, strings) {
  console.log(id)
  $('#command-line').append('<br>');
  $('#command-line').append('grahamperich@TheEther ~/Projects <span id="line-four"></span>');
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

  showProjectCard()
}

// click handlers

function handleProjectsClick() {
  if (this.called) {
    $('#line-four').typed({
      strings: ["^500 open . ^1350"],
      typeSpeed: 20,
      showCursor: false,
      callback: clearText.bind(this, '#line-four', showProjectCard)
    });
    
    return;
  }

  this.called = true
  var id = this.id
  $('#line-two').typed({
    strings: ["^500 cd Projects ^1350"],
    typeSpeed: 20,
    showCursor: false,
    callback: clearText.bind(this, '#line-two', renderLine4And5.bind(this, id, ['Nimbus', 'Colorz.io', 'SDSUEvents']))
  });
}

function handleAboutClick() {
  // if lines 4 and 5 have been rendered...
  if ($('#line-four').toArray().length) {
    $('#line-four').typed({
      strings: ['node ~/About.js ^1350'],
      typeSpeed: 20,
      showCursor: true,
      callback: clearText.bind(this, '#line-four', showAboutCard)
    });
  } else {
      $('#line-two').typed({
        strings: ['node ~/About.js ^1350'],
        typeSpeed: 20,
        showCursor: true,
        callback: clearText.bind(this, '#line-two', showAboutCard)
    });
  }

}

function showProjectCard() {
  $('#photo').hide({duration: 800});
  $('#about-card').hide({duration: 800});
  $('#cards').show({duration: 800});
}

function showAboutCard() {
  $('#cards').hide({duration: 800});
  $('#photo').hide({duration: 800});
  $('#about-card').show({duration: 800});
}

