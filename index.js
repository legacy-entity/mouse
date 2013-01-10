
var v = require('vector')

// mouse

module.exports = function (el) {
  el = el || document.body

  var mouse = {}

  mouse.pos = [v, 0,0]
  mouse.offset = [v, 0,0]

  mouse.init = function (e) {
    this.reset(e)
  }

  mouse.start = function (e) {
    e.resizeListener = this.reset.bind(this, e)
    window.addEventListener('resize', e.resizeListener, true)

    e.moveListener = createListener(e)
    el.addEventListener('mousemove', e.moveListener, true)
  }

  mouse.reset = function (e) {
    e.offset = v(el.offsetLeft, el.offsetTop)
  }

  mouse.pause =
  mouse.stop = function (e) {
    el.removeEventListener('mousemove', e.moveListener, true)
    window.removeEventListener('resize', e.resizeListener, true)
  }

  function createListener (e) {
    return function (ev) {
      e.pos.set([ev.clientX, ev.clientY]).sub(e.offset)
    }
  }

  return mouse
}
