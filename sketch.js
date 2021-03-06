// var cnv;

// function centerCanvas() {
//   var x = (windowWidth - width) / 2;
//   var y = ((windowHeight - height) / 2) * 0.2;
//   cnv.position(x, y);
// }
var Glitcher = (function () {
  function Glitcher(options) {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
      this.origCanvas = document.createElement('canvas');
      this.origContext = this.origCanvas.getContext('2d');
      this.options = options;
  }
  Glitcher.prototype.glitch = function (url, callback) {
      var _this = this;
      this.loadImage(url, function (img) {
          _this.renderImage(img);
          _this.process();
          callback();
      });
  };

  Glitcher.prototype.process = function () {
      var imageData = this.origContext.getImageData(0, 0, this.width, this.height), pixels = imageData.data, length = pixels.length, options = this.options, brightness, offset, i, x, y;

      for (i = 0; i < length; i += 4) {
          if (options.color) {
              pixels[i] *= options.color.red;
              pixels[i + 1] *= options.color.green;
              pixels[i + 2] *= options.color.blue;
          }

          if (options.greyscale) {
              brightness = pixels[i] * options.greyscale.red + pixels[i + 1] * options.greyscale.green + pixels[i + 2] * options.greyscale.blue;

              pixels[i] = brightness;
              pixels[i + 1] = brightness;
              pixels[i + 2] = brightness;
          }

          if (options.stereoscopic) {
              offset = options.stereoscopic.red;
              pixels[i] = (pixels[i + 4 * offset] === undefined) ? 0 : pixels[i + 4 * offset];

              offset = options.stereoscopic.green;
              pixels[i + 1] = (pixels[i + 1 + 4 * offset] === undefined) ? 0 : pixels[i + 1 + 4 * offset];

              offset = options.stereoscopic.blue;
              pixels[i + 2] = (pixels[i + 2 + 4 * offset] === undefined) ? 0 : pixels[i + 2 + 4 * offset];
          }
      }

      if (options.lineOffset) {
          i = 0;

          for (y = 0; y < this.height; y++) {
              offset = (y % options.lineOffset.lineHeight === 0) ? Math.round(Math.random() * options.lineOffset.value) : offset;

              for (x = 0; x < this.width; x++) {
                  i += 4;
                  pixels[i + 0] = (pixels[i + 4 * offset] === undefined) ? 0 : pixels[i + 4 * offset];
                  pixels[i + 1] = (pixels[i + 1 + 4 * offset] === undefined) ? 0 : pixels[i + 1 + 4 * offset];
                  pixels[i + 2] = (pixels[i + 2 + 4 * offset] === undefined) ? 0 : pixels[i + 2 + 4 * offset];
              }
          }
      }

      if (options.glitch) {
      }

      this.context.putImageData(imageData, 0, 0);
  };

  Glitcher.prototype.loadImage = function (url, callback) {
      var img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.onload = function () {
          callback(img);
      };
      img.src = url;
  };

  Glitcher.prototype.renderImage = function (img) {
      this.canvas.width = this.origCanvas.width = this.width = img.width;
      this.canvas.height = this.origCanvas.height = this.height = img.height;

      this.origContext.drawImage(img, 0, 0);
  };
  return Glitcher;
})();

var glitcher = new Glitcher({
  color: {
      red: 1,
      green: 1,
      blue: 1
  },
  stereoscopic: {
      red: 10,
      green: 20,
      blue: 0
  },
  lineOffset: {
      value: 4
  }
});

function setup() {
  
  glitcher.glitch('./assets/minime.png', function () {
    document.body.appendChild(glitcher.canvas);
    centerCanvas(glitcher.canvas)
    window.initApp();
  });
  
  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  window.intervalId = setInterval(function () {
    glitcher.options = {
        color: {
            red: 1,
            green: 0.8,
            blue: 0.58
        },
        stereoscopic: {
            red: 10 * randomRange(1, 3),
            green: 5 * randomRange(1, 3),
            blue: 30 * randomRange(1, 3)
        },
        lineOffset: {
            value: 5 * randomRange(1, 3),
            lineHeight: 10 * randomRange(1, 3)
        }
    };
    glitcher.process();
  }, 100);
}
function windowResized() {
  centerCanvas();
}

function centerCanvas() {
  glitcher.canvas.width = windowWidth;
  glitcher.canvas.height = windowHeight;
  var x = ((windowWidth - 360) / 2)
  var y = ((windowHeight - 330) / 2) * 0.15;
  glitcher.canvas.setAttribute('style', `position: absolute;  left: ${x}px; top: ${y}px;`)
}
