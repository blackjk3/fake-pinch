// Simulate pinch zoom.
(function() {
  
  var root = this,
      $ = root.jQuery || root.Zepto || root.ender;

  $(document).ready( function () {
    
    var startX, startY, prevX, prevY,
        touch = { pageX:0, pageY:0 },
        shift = false,
        size = 40,
        sizeHalf = size / 2;

    var style = {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      background: 'rgba(0,0,0,0.4)',
      borderRadius: sizeHalf + 'px',
      zIndex: '999',
      display: 'none'
    };

    $touchEl = $("<div></div>"),
    $touchEl2 = $("<div></div>"),
    $body = $(document.body);

    $touchEl2.css(style);
    $touchEl.css(style);

    $body.on('touchstart', function(e) {
      var evt = e.originalEvent || e;

      startX = evt.touches[0].pageX;
      startY = evt.touches[0].pageY;

      if(evt.shiftKey) {
        shift = true;
        $touchEl.show();
        $touchEl2.show();
      } else {
        shift = false;
      }

    }).on('touchend', function(e) {

      $touchEl.hide();
      $touchEl2.hide();

    }).append($touchEl,$touchEl2);

    // This should be the innermost container you want to bubble up.
    // Most likely there will be an event handler on body which we will
    // will cancel and re-broadcast as a two finger touch event.
    //
    // The assumption is that this is a container div however, if
    // you want to use a different container please change this
    // selector.
    $('#container').on('touchmove', function(e) {
      
      if(!shift) {
        return;
      }
      
      e.stopPropagation();

      var evt = e.originalEvent || e,
          deltaX = evt.touches[0].pageX - startX,
          deltaY = evt.touches[0].pageY - startY,
          touches = [];

      touches.push(evt.touches[0]);

      if(prevX && prevY) {
        touch.pageX = startX - deltaX;
        touch.pageY = startY - deltaY;
        
        touches.push(touch);
        $touchEl.css({
          left: evt.touches[0].pageX - sizeHalf,
          top: evt.touches[0].pageY - sizeHalf
        });
        $touchEl2.css({
          left: touch.pageX + sizeHalf,
          top: touch.pageY + sizeHalf
        });
      }
      
      prevX = evt.touches[0].pageX;
      prevY = evt.touches[0].pageY;

      $body.trigger({
        type: 'touchmove',
        originalEvent: {touches: touches},
        touches: touches
      });
    });
  });
}).call(this);