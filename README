# Fake Pinch

When holding down the shift key fake pinch will intercept all touch move commands and trigger them with a mock two finger touch event.
It does this by adding an extra object on the touches array that is passed with a normal touch move event.

	$body.trigger({
		type: 'touchmove',
		originalEvent: {touches: touches},
		touches: touches
	});

Fake pinch should work with jQuery or Zepto.	