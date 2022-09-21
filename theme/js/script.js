'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
/** @type {boolean} */
$jscomp.ASSUME_ES5 = false;
/** @type {boolean} */
$jscomp.ASSUME_NO_NATIVE_MAP = false;
/** @type {boolean} */
$jscomp.ASSUME_NO_NATIVE_SET = false;
/** @type {boolean} */
$jscomp.SIMPLE_FROUND_POLYFILL = false;
/** @type {!Function} */
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(object, key, descriptor) {
  if (object != Array.prototype && object != Object.prototype) {
    object[key] = descriptor.value;
  }
};
/**
 * @param {!Object} key
 * @return {?}
 */
$jscomp.getGlobal = function(key) {
  return "undefined" != typeof window && window === key ? key : "undefined" != typeof global && null != global ? global : key;
};
$jscomp.global = $jscomp.getGlobal(this);
/**
 * @param {string} index
 * @param {string} value
 * @param {string} obj
 * @param {number} name
 * @return {undefined}
 */
$jscomp.polyfill = function(index, value, obj, name) {
  if (value) {
    obj = $jscomp.global;
    index = index.split(".");
    /** @type {number} */
    name = 0;
    for (; name < index.length - 1; name++) {
      var p = index[name];
      if (!(p in obj)) {
        obj[p] = {};
      }
      obj = obj[p];
    }
    index = index[index.length - 1];
    name = obj[index];
    value = value(name);
    if (value != name && null != value) {
      $jscomp.defineProperty(obj, index, {
        configurable : true,
        writable : true,
        value : value
      });
    }
  }
};
$jscomp.polyfill("Array.from", function(isDefault) {
  return isDefault ? isDefault : function(items, callback, value) {
    callback = null != callback ? callback : function(b) {
      return b;
    };
    /** @type {!Array} */
    var values = [];
    var result = "undefined" != typeof Symbol && Symbol.iterator && items[Symbol.iterator];
    if ("function" == typeof result) {
      items = result.call(items);
      /** @type {number} */
      var i = 0;
      for (; !(result = items.next()).done;) {
        values.push(callback.call(value, result.value, i++));
      }
    } else {
      result = items.length;
      /** @type {number} */
      i = 0;
      for (; i < result; i++) {
        values.push(callback.call(value, items[i], i));
      }
    }
    return values;
  };
}, "es6", "es3");
/**
 * @param {!Array} obj
 * @param {!Object} key
 * @return {?}
 */
$jscomp.owns = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
$jscomp.polyfill("Object.values", function(isDefault) {
  return isDefault ? isDefault : function(hash) {
    /** @type {!Array} */
    var cols = [];
    var i;
    for (i in hash) {
      if ($jscomp.owns(hash, i)) {
        cols.push(hash[i]);
      }
    }
    return cols;
  };
}, "es8", "es3");
/**
 * @param {string} name
 * @param {!Function} c
 * @param {?} cls
 * @return {?}
 */
$jscomp.findInternal = function(name, c, cls) {
  if (name instanceof String) {
    /** @type {string} */
    name = String(name);
  }
  var nameLength = name.length;
  /** @type {number} */
  var j = 0;
  for (; j < nameLength; j++) {
    var state = name[j];
    if (c.call(cls, state, j, name)) {
      return {
        i : j,
        v : state
      };
    }
  }
  return {
    i : -1,
    v : void 0
  };
};
$jscomp.polyfill("Array.prototype.find", function(isDefault) {
  return isDefault ? isDefault : function(i, stmt_id) {
    return $jscomp.findInternal(this, i, stmt_id).v;
  };
}, "es6", "es3");
/**
 * @param {string} object
 * @param {string} method
 * @param {string} name
 * @return {?}
 */
$jscomp.checkStringArgs = function(object, method, name) {
  if (null == object) {
    throw new TypeError("The 'this' value for String.prototype." + name + " must not be null or undefined");
  }
  if (method instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + name + " must not be a regular expression");
  }
  return object + "";
};
$jscomp.polyfill("String.prototype.startsWith", function(isDefault) {
  return isDefault ? isDefault : function(value, index) {
    var that = $jscomp.checkStringArgs(this, value, "startsWith");
    /** @type {string} */
    value = value + "";
    var end = that.length;
    /** @type {number} */
    var size = value.length;
    /** @type {number} */
    index = Math.max(0, Math.min(index | 0, that.length));
    /** @type {number} */
    var pos = 0;
    for (; pos < size && index < end;) {
      if (that[index++] != value[pos++]) {
        return false;
      }
    }
    return pos >= size;
  };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(isDefault) {
  return isDefault ? isDefault : function(a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(isDefault) {
  return isDefault ? isDefault : function(b, index) {
    var path = this;
    if (path instanceof String) {
      /** @type {string} */
      path = String(path);
    }
    var length = path.length;
    index = index || 0;
    if (0 > index) {
      /** @type {number} */
      index = Math.max(index + length, 0);
    }
    for (; index < length; index++) {
      var a = path[index];
      if (a === b || Object.is(a, b)) {
        return true;
      }
    }
    return false;
  };
}, "es7", "es3");
$jscomp.polyfill("String.prototype.includes", function(isDefault) {
  return isDefault ? isDefault : function(i, startIndex) {
    return -1 !== $jscomp.checkStringArgs(this, i, "includes").indexOf(i, startIndex || 0);
  };
}, "es6", "es3");
(function() {
  /**
   * @param {!HTMLElement} node
   * @param {string} selector
   * @return {?}
   */
  function f(node, selector) {
    /** @type {!Array<?>} */
    var a = Array.from(node.querySelectorAll(selector));
    if (node.matches && node.matches(selector)) {
      a.splice(0, 0, node);
    }
    return a;
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function getElementPosition(obj) {
    obj = obj.getBoundingClientRect();
    return {
      top : obj.top + document.body.scrollTop,
      left : obj.left + document.body.scrollLeft
    };
  }
  /**
   * @param {(Node|Window)} object
   * @return {?}
   */
  function d(object) {
    return parseFloat(getComputedStyle(object, null).height.replace("px", ""));
  }
  /**
   * @param {(Node|Window)} input
   * @return {?}
   */
  function func(input) {
    return parseFloat(getComputedStyle(input, null).width.replace("px", ""));
  }
  /**
   * @param {!Function} cb
   * @return {undefined}
   */
  function DOMLoaded(cb) {
    if ("loading" != document.readyState) {
      cb();
    } else {
      document.addEventListener("DOMContentLoaded", cb);
    }
  }
  /**
   * @param {!Element} elem
   * @return {undefined}
   */
  function isVueComponent(elem) {
    (function set() {
      if (0 > (elem.style.opacity -= 0.1)) {
        /** @type {string} */
        elem.style.display = "none";
      } else {
        requestAnimationFrame(set);
      }
    })();
  }
  /**
   * @param {!Element} msg
   * @return {undefined}
   */
  function r(msg) {
    /** @type {string} */
    msg.style.display = "block";
    (function fn() {
      /** @type {number} */
      var val = parseFloat(msg.style.opacity);
      if (!(1 < (val = val + 0.1))) {
        /** @type {number} */
        msg.style.opacity = val;
        requestAnimationFrame(fn);
      }
    })();
  }
  /**
   * @param {string} type
   * @return {?}
   */
  function parse(type) {
    /** @type {!Array} */
    var reg = [];
    var any = {
      blackberry : "BlackBerry",
      android : "Android",
      windows : "IEMobile",
      opera : "Opera Mini",
      ios : "iPhone|iPad|iPod"
    };
    type = "undefined" == typeof type ? "*" : type.toLowerCase();
    if ("*" === type) {
      /** @type {!Array<?>} */
      reg = Object.values(any);
    } else {
      if (type in any) {
        reg.push(any[type]);
      }
    }
    return (type = !(!reg.find(function(a) {
      return "iPhone|iPad|iPod" === a;
    }) || !(navigator.userAgent.match(/(iPad)/) || "MacIntel" === navigator.platform && "undefined" !== typeof navigator.standalone))) ? type : !(!reg.length || !navigator.userAgent.match(new RegExp(reg.join("|"), "i")));
  }
  /**
   * @param {!Element} el
   * @return {undefined}
   */
  function setLogoType(el) {
    var dayEle = el.querySelector(".carousel-item");
    el = el.querySelector(".carousel-indicators > li");
    dayEle.classList.add("active");
    if (el) {
      el.classList.add("active");
    }
  }
  /**
   * @param {!Element} element
   * @return {undefined}
   */
  function postLink(element) {
    var val = element.getAttribute("id") + "-carousel";
    var b = element.getAttribute("data-bs-version") && element.getAttribute("data-bs-version").startsWith("5");
    if (null === element.getAttribute("id")) {
      val = element.classList.value.match(/cid-.*?(?=\s|$)/) + "-carousel";
    }
    element.querySelectorAll(".carousel").forEach(function(elem) {
      elem.setAttribute("id", val);
    });
    if (element.querySelector(".carousel-controls")) {
      element.querySelectorAll(".carousel-controls").forEach(function(a) {
        a.querySelectorAll("a").forEach(function(el) {
          el.setAttribute("href", "#" + val);
          if (b) {
            el.setAttribute("data-bs-target", "#" + val);
          } else {
            el.setAttribute("data-target", "#" + val);
          }
        });
      });
    }
    element.querySelectorAll(".carousel-indicators > li").forEach(function(el) {
      if (b) {
        el.setAttribute("data-bs-target", "#" + val);
      } else {
        el.setAttribute("data-target", "#" + val);
      }
    });
    setLogoType(element);
  }
  /**
   * @param {!Node} p
   * @return {undefined}
   */
  function run(p) {
    var i = p.querySelectorAll(".carousel-item").length;
    var num = p.querySelector(".carousel-inner").getAttribute("data-visible");
    if (i < num) {
      num = i;
    }
    p.querySelectorAll(".carousel-inner").forEach(function(a) {
      a.setAttribute("class", "carousel-inner slides" + num);
    });
    p.querySelectorAll(".clonedCol").forEach(function(inventoryService) {
      inventoryService.remove();
    });
    p.querySelectorAll(".carousel-item .col-md-12").forEach(function(a) {
      if (2 > num) {
        a.setAttribute("class", "col-md-12");
      } else {
        if ("5" == num) {
          a.setAttribute("class", "col-md-12 col-lg-15");
        } else {
          a.setAttribute("class", "col-md-12 col-lg-" + 12 / num);
        }
      }
    });
    p.querySelectorAll(".carousel-item .row").forEach(function(thisSystemDiv) {
      thisSystemDiv.setAttribute("style", "-webkit-flex-grow: 1; flex-grow: 1; margin: 0;");
    });
    p.querySelectorAll(".carousel-item").forEach(function(node) {
      /** @type {!Element} */
      var current = node;
      /** @type {number} */
      var j = 1;
      for (; j < num; j++) {
        if (!(current = current.nextElementSibling)) {
          current = node.parentNode.children[0] === node ? node.nextElementSibling : node.parentNode.children[0];
        }
        var next;
        if (next = current) {
          /** @type {number} */
          var track = 0;
          do {
            track++;
          } while (next = next.previousElementSibling);
          /** @type {number} */
          next = track;
        } else {
          /** @type {number} */
          next = -1;
        }
        track = current.querySelector(".col-md-12").cloneNode(true);
        track.classList.add("cloneditem-" + j);
        track.classList.add("clonedCol");
        track.setAttribute("data-cloned-index", next);
        node.children[0].appendChild(track);
      }
    });
  }
  /**
   * @param {(Document|Element)} e
   * @return {?}
   */
  function destroy(e) {
    /** @type {string} */
    var trace = "";
    var a = e.querySelector("svg linearGradient");
    if (a) {
      /** @type {!Array} */
      trace = [];
      /** @type {!Array<?>} */
      a = Array.from(a.children);
      /** @type {number} */
      var i = 0;
      for (; i < a.length; i++) {
        trace.push('"' + a[i].getAttribute("stop-color") + '"');
      }
      /** @type {string} */
      trace = '"lineargradient": [' + trace + "],";
      if (!Array.from(e.querySelectorAll("svg")).some(function(divChatButton) {
        return divChatButton.classList.contains("svg-gradient");
      })) {
        e.querySelectorAll("svg").forEach(function(a) {
          a.classList.add("svg-gradient");
        });
      }
    }
    return trace;
  }
  /**
   * @param {!Object} element
   * @param {string} value
   * @param {number} i
   * @return {undefined}
   */
  function init(element, value, i) {
    var node = element.closest(".card");
    var cls = node.parentElement.classList;
    if (!node.getAttribute("style")) {
      node.setAttribute("style", "-webkit-flex-basis: auto; flex-basis: auto;");
    }
    if (cls.contains("row")) {
      cls.remove("row");
      cls.add("media-container-row");
    }
    element.querySelectorAll(".svg-gradient > *").forEach(function(a) {
      a.setAttribute("id", value);
    });
    node = element.cloneNode(true);
    Array.from(element.children).forEach(function(hElement) {
      if ("SVG" !== hElement.tagName) {
        return hElement.remove();
      }
    });
    element.setAttribute("data-pie", "{ " + destroy(element.closest("section")) + ' "percent": ' + i + ', "size": 150, "colorCircle": "#f1f1f1", "stroke": 5, "colorSlice": "url(#' + value + ')", "fontSize": "1.3rem", "number": false }');
    Array.from(node.children).forEach(function(test) {
      switch(true) {
        case test.matches("p"):
          /** @type {string} */
          test.innerText = i + "%";
          element.appendChild(test);
          break;
        case test.matches("svg"):
          break;
        default:
          element.appendChild(test);
      }
    });
  }
  /**
   * @param {!Object} el
   * @return {undefined}
   */
  function nameForElement(el) {
    var appName = el.closest("section").getAttribute("id") + "-svg-gradient";
    /** @type {number} */
    var length = +el.getAttribute("data-goal");
    init(el, appName, length);
  }
  /**
   * @param {!Element} panel
   * @param {string} key
   * @return {undefined}
   */
  function render(panel, key) {
    if (panel.classList.contains("circle-progress-section") && key.includes("progress") && "progressCount" != key) {
      if (key.includes("Color")) {
        panel.querySelectorAll(".pie_progress").forEach(function(info) {
          var appName = panel.getAttribute("id") + "-svg-gradient";
          /** @type {number} */
          var length = +info.getAttribute("data-goal");
          init(info, appName, length);
        });
      } else {
        var appName = panel.getAttribute("id") + "-svg-gradient";
        key = panel.querySelector("." + key);
        /** @type {number} */
        var length = +key.getAttribute("data-goal");
        init(key, appName, length);
      }
    }
  }
  var $;
  var err;
  /** @type {boolean} */
  var cb = "function" == typeof jQuery;
  if (cb) {
    $ = jQuery;
  }
  if ($) {
    err = $("html").hasClass("is-builder");
  } else {
    /** @type {boolean} */
    err = document.querySelector("html").classList.contains("is-builder");
  }
  /**
   * @param {?} selector
   * @return {?}
   */
  Element.prototype.parents = function(selector) {
    /** @type {!Array} */
    var parents = [];
    /** @type {!Element} */
    var node = this;
    /** @type {boolean} */
    var deep = void 0 !== selector;
    for (; null !== (node = node.parentElement);) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (!(deep && !node.matches(selector))) {
          parents.push(node);
        }
      }
    }
    return parents;
  };
  /**
   * @return {?}
   */
  Element.prototype.footerReveal = function() {
    /**
     * @return {undefined}
     */
    function initialize() {
      if (!d && element.offsetHeight <= window.outerHeight) {
        /** @type {string} */
        element.style.zIndex = "-999";
        /** @type {string} */
        element.style.position = "fixed";
        /** @type {string} */
        element.style.bottom = "0";
        /** @type {string} */
        element.style.width = input.offsetWidth + "px";
        /** @type {string} */
        input.style.marginBottom = element.offsetHeight + "px";
      } else {
        /** @type {string} */
        element.style.zIndex = "";
        /** @type {string} */
        element.style.position = "";
        /** @type {string} */
        element.style.bottom = "";
        /** @type {string} */
        element.style.width = "";
        /** @type {string} */
        input.style.marginBottom = "";
      }
    }
    /** @type {!Element} */
    var element = this;
    /** @type {(Element|null)} */
    var input = element.previousElementSibling;
    /** @type {boolean} */
    var d = !!document.documentMode;
    initialize();
    window.addEventListener("resize", function() {
      initialize();
    });
    window.addEventListener("load", function() {
      initialize();
    });
    return element;
  };
  (function(name) {
    /**
     * @param {!Function} cb
     * @param {number} timeout
     * @param {?} interval
     * @return {?}
     */
    var throttle = function(cb, timeout, interval) {
      var _takingTooLongTimeout;
      return function() {
        var _receiver = this;
        /** @type {!Arguments} */
        var cbArgs = arguments;
        if (_takingTooLongTimeout) {
          clearTimeout(_takingTooLongTimeout);
        } else {
          if (interval) {
            cb.apply(_receiver, cbArgs);
          }
        }
        /** @type {number} */
        _takingTooLongTimeout = setTimeout(function() {
          if (!interval) {
            cb.apply(_receiver, cbArgs);
          }
          /** @type {null} */
          _takingTooLongTimeout = null;
        }, timeout || 100);
      };
    };
    /**
     * @param {!Function} cb
     * @return {?}
     */
    window[name] = function(cb) {
      /** @type {!CustomEvent} */
      var event = new CustomEvent(name);
      return cb ? this.addEventListener("resize", throttle(cb)) : this.dispatchEvent(event);
    };
  })("smartresize");
  var H = function() {
    /** @type {!Element} */
    var node = document.createElement("div");
    /** @type {(Element|null)} */
    var b = document.querySelector("body");
    node.setAttribute("style", "height: 50vh; position: absolute; top: -1000px; left: -1000px;");
    b.appendChild(node);
    /** @type {number} */
    var id = parseInt(window.innerHeight / 2, 10);
    /** @type {number} */
    var roleId = parseInt((window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle).height, 10);
    b.removeChild(node);
    return roleId == id;
  }();
  DOMLoaded(function() {
    /**
     * @param {!Node} d
     * @return {undefined}
     */
    function a(d) {
      /** @type {string} */
      d.style.height = 9 * func(d.parentNode) / 16 + "px";
    }
    /**
     * @param {!HTMLElement} a
     * @return {undefined}
     */
    function c(a) {
      setTimeout(function() {
        f(a, ".mbr-parallax-background").forEach(function(overImage) {
          if (jarallax) {
            jarallax(overImage, {
              speed : 0.6
            });
            /** @type {string} */
            overImage.style.position = "relative";
          }
        });
      }, 0);
    }
    /**
     * @param {!HTMLElement} a
     * @return {undefined}
     */
    function init(a) {
      f(a, "[data-bg-video]").forEach(function(a) {
        var target = a.getAttribute("data-bg-video");
        if (target) {
          var meta = target.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/);
          var div = a.querySelector(".mbr-background-video-preview") || document.createElement("div");
          div.classList.add("mbr-background-video-preview");
          /** @type {string} */
          div.style.display = "none";
          /** @type {string} */
          div.style.backgroundSize = "cover";
          /** @type {string} */
          div.style.backgroundPosition = "center";
          if (!a.querySelector(".mbr-background-video-preview")) {
            a.childNodes[0].before(div);
          }
          if (meta && (/youtu\.?be/g.test(meta[3]) || /vimeo/g.test(meta[3]))) {
            if (meta && /youtu\.?be/g.test(meta[3])) {
              /** @type {string} */
              target = "http" + ("https:" === location.protocol ? "s" : "") + ":";
              /** @type {string} */
              target = target + ("//img.youtube.com/vi/" + meta[6] + "/maxresdefault.jpg");
              /** @type {!Image} */
              var data = new Image;
              /**
               * @return {undefined}
               */
              data.onload = function() {
                if (120 === (data.naturalWidth || data.width)) {
                  /** @type {string} */
                  var element = data.src.split("/").pop();
                  switch(element) {
                    case "maxresdefault.jpg":
                      /** @type {string} */
                      data.src = data.src.replace(element, "sddefault.jpg");
                      break;
                    case "sddefault.jpg":
                      /** @type {string} */
                      data.src = data.src.replace(element, "hqdefault.jpg");
                      break;
                    default:
                      if (err) {
                        /** @type {string} */
                        div.style.backgroundImage = 'url("images/no-video.jpg")';
                        /** @type {string} */
                        div.style.display = "block";
                      }
                  }
                } else {
                  /** @type {string} */
                  div.style.backgroundImage = 'url("' + data.src + '")';
                  /** @type {string} */
                  div.style.display = "block";
                }
                if (a.querySelector(".mbr-background-video")) {
                  a.querySelector(".mbr-background-video").remove();
                }
                if (a.querySelector(".mbr-background-video-wrapper")) {
                  a.querySelector(".mbr-background-video-wrapper").remove();
                }
                /** @type {!Element} */
                element = document.createElement("div");
                /** @type {!Element} */
                var container = document.createElement("div");
                container.classList.add("mbr-background-video-wrapper");
                container.appendChild(element);
                element.classList.add("mbr-background-video");
                a.childNodes[1].before(container);
                /** @type {number} */
                var h = data.naturalHeight;
                /** @type {number} */
                var n = data.naturalWidth;
                /** @type {number} */
                var cw = data.naturalHeight / data.naturalWidth;
                var w = element.parentNode.clientHeight;
                var max = element.parentNode.clientWidth;
                h = h < w ? h : w;
                n = n > max ? n : max;
                if (h / n != cw) {
                  /** @type {number} */
                  h = n * cw;
                }
                var self = new YouTubePlayer(element, {
                  modestBranding : true,
                  autoplay : true,
                  controls : false,
                  origin : "*",
                  iv_load_policy : false,
                  mute : true,
                  keyboard : false,
                  captions : false,
                  annotations : false,
                  related : false
                });
                /** @type {string} */
                container.style.overflow = "hidden";
                /** @type {string} */
                container.style.position = "absolute";
                /** @type {string} */
                container.style.minWidth = "100%";
                /** @type {string} */
                container.style.minHeight = "100%";
                /** @type {string} */
                container.style.top = "0";
                /** @type {string} */
                container.style.left = "0";
                /** @type {string} */
                container.style.transitionProperty = "opacity";
                /** @type {string} */
                container.style.transitionDuration = "1000ms";
                /** @type {string} */
                element.style.marginTop = "0";
                /** @type {string} */
                element.style.maxWidth = "initial";
                /** @type {string} */
                element.style.transitionProperty = "opacity";
                /** @type {string} */
                element.style.transitionDuration = "1000ms";
                /** @type {string} */
                element.style.pointerEvents = "none";
                /** @type {string} */
                element.style.position = "absolute";
                /** @type {string} */
                element.style.top = "0";
                /** @type {string} */
                element.style.left = "0";
                /** @type {string} */
                element.style.display = "none";
                /** @type {string} */
                element.style.transform = "scale(1.2)";
                self.load(meta[6], true);
                self.mute();
                self.on("playing", function() {
                  self.replayFrom(1);
                  if (0 < self.getProgress()) {
                    /** @type {string} */
                    self._player.i.style.display = "block";
                  }
                });
                if (err && cb) {
                  $(document).on("delete.cards", function(a) {
                    self.stopResize();
                    self.stopReplay(a.target.querySelector(".mbr-background-video-wrapper"));
                  });
                  $(document).on("changeParameter.cards", function(e, undefined, event, _parameter) {
                    e = e.target.querySelector(".mbr-background-video-wrapper");
                    if ("bg" === undefined) {
                      switch(_parameter) {
                        case "type":
                          if ("video" !== event.type) {
                            self.stopReplay(e);
                          }
                          break;
                        case "value":
                          if ("video" === event.type) {
                            self.stopReplay(e);
                          }
                      }
                    }
                  });
                }
              };
              data.setAttribute("src", target);
            } else {
              if (meta && /vimeo/g.test(meta[3])) {
                /** @type {!XMLHttpRequest} */
                var element = new XMLHttpRequest;
                element.open("GET", "https://vimeo.com/api/v2/video/" + meta[6] + ".json", true);
                /**
                 * @return {undefined}
                 */
                element.onreadystatechange = function() {
                  if (4 === this.readyState) {
                    if (200 <= this.status && 400 > this.status) {
                      /** @type {*} */
                      var json = JSON.parse(this.responseText);
                      /** @type {string} */
                      div.style.backgroundImage = 'url("' + json[0].thumbnail_large + '")';
                      /** @type {string} */
                      div.style.display = "block";
                    } else {
                      if (err) {
                        /** @type {string} */
                        div.style.backgroundImage = 'url("images/no-video.jpg")';
                        /** @type {string} */
                        div.style.display = "block";
                      }
                    }
                  }
                };
                element.send();
                /** @type {null} */
                element = null;
                if (a.querySelector(".mbr-background-video")) {
                  a.querySelector(".mbr-background-video").remove();
                }
                /** @type {!Element} */
                element = document.createElement("div");
                element.classList.add("mbr-background-video");
                a.childNodes[1].before(element);
                target = new Vimeo.Player(element, {
                  id : target,
                  loop : true,
                  background : true,
                  responsive : true,
                  autoplay : true,
                  byline : false,
                  title : false,
                  muted : true,
                  controls : false
                });
                element = target.element.parentNode;
                /** @type {string} */
                element.style.overflow = "hidden";
                /** @type {string} */
                target.element.style.pointerEvents = "none";
                /** @type {string} */
                target.element.style.marginLeft = "-" + (target.element.scrollWidth - element.scrollWidth) / 2 + "px";
                /** @type {string} */
                target.element.style.minHeight = "100vh";
                /** @type {string} */
                target.element.style.minWidth = "177.77vh";
              }
            }
          } else {
            if (err) {
              /** @type {string} */
              div.style.backgroundImage = 'url("images/video-placeholder.jpg")';
              /** @type {string} */
              div.style.display = "block";
            }
          }
        }
      });
    }
    document.querySelector("html").classList.add(parse() ? "mobile" : "desktop");
    window.addEventListener("scroll", function() {
      document.querySelectorAll(".mbr-navbar--sticky").forEach(function(a) {
        /** @type {string} */
        var method = 10 < window.scrollTop ? "add" : "remove";
        a.classList[method]("mbr-navbar--stuck");
        if (!a.classList.contains(".mbr-navbar--open")) {
          a.classList[method]("mbr-navbar--short");
        }
      });
    });
    if (parse() && navigator.userAgent.match(/Chrome/i)) {
      (function(q, p) {
        /** @type {!Array} */
        var c = [q, q];
        /** @type {number} */
        c[p > q ? 0 : 1] = p;
        window.smartresize(function() {
          /** @type {number} */
          var h = window.innerHeight;
          if (0 > c.indexOf(h)) {
            h = c[window.innerWidth > h ? 1 : 0];
          }
          /** @type {string} */
          /**document.querySelector(".mbr-section--full-height").style.height = h + "px";*/
        });
      })(window.innerWidth, window.innerHeight);
    } else {
      if (!H) {
        window.smartresize(function() {
          /** @type {string} */
          document.querySelector(".mbr-section--full-height").style.height = window.innerHeight + "px";
        });
        $(document).on("add.cards", function(b) {
          if (document.querySelector("html").classList.contains("mbr-site-loaded") && f(b.target, ".mbr-section--full-height").length) {
            window.dispatchEvent(new CustomEvent("resize"));
          }
        });
      }
    }
    window.addEventListener("smartresize", function() {
      document.querySelectorAll(".mbr-section--16by9").forEach(a);
    });
    if (cb) {
      $(document).on("add.cards changeParameter.cards", function(b) {
        var newKeys = f(b.target, ".mbr-section--16by9");
        if (newKeys.length) {
          newKeys.forEach(function(s) {
            s.setAttribute("data-16by9", "true");
            a(s);
          });
        } else {
          f(b.target, "[data-16by9]").forEach(function(a) {
            /** @type {string} */
            a.styles.height = "";
            a.removeAttribute("data-16by9");
          });
        }
      });
    }
    if ("undefined" !== typeof jarallax && !parse()) {
      window.addEventListener("update.parallax", function(a) {
        setTimeout(function() {
          if ($jarallax) {
            /** @type {(Element|null)} */
            var $jarallax = document.querySelector(".mbr-parallax-background");
            $jarallax.jarallax("coverImage");
            $jarallax.jarallax("clipContainer");
            $jarallax.jarallax("onScroll");
          }
        }, 0);
      });
      if (err) {
        if (!cb) {
          return;
        }
        $(document).on("add.cards", function(b) {
          c(b.target);
          $(window).trigger("update.parallax");
        });
        $(document).on("changeParameter.cards", function(node, insertionPoint, options, canCreateDiscussions) {
          if ("bg" === insertionPoint) {
            switch(insertionPoint = node.target, jarallax && jarallax(insertionPoint, "destroy"), insertionPoint.style.position = "", $(node.target).find(".mbr-background-video-preview").remove(), $(node.target).find(".mbr-background-video").remove(), $(node.target).find(".mbr-background-video-wrapper").remove(), $(node.target).find(".mbr-fallback-image").remove(), canCreateDiscussions) {
              case "type":
                if (true === options.parallax) {
                  c(node.target);
                }
                break;
              case "value":
                if ("image" === options.type && true === options.parallax) {
                  c(node.target);
                }
                break;
              case "parallax":
                if (true === options.parallax) {
                  c(node.target);
                }
            }
          }
          $(window).trigger("update.parallax");
        });
      } else {
        c(document.body);
      }
      window.addEventListener("shown.bs.tab", function() {
        window.dispatchEvent(new CustomEvent("update.parallax"));
      });
    }
    var _takingTooLongTimeout;
    var paintNodesTimeout;
    /** @type {number} */
    var prevScrollTop = 0;
    /** @type {null} */
    var self = null;
    /** @type {boolean} */
    var isDesktop = !parse();
    window.addEventListener("scroll", function() {
      if (paintNodesTimeout) {
        clearTimeout(paintNodesTimeout);
      }
      /** @type {number} */
      var scrollTop = document.documentElement.scrollTop;
      /** @type {boolean} */
      var scrollUp = scrollTop <= prevScrollTop || isDesktop;
      /** @type {number} */
      prevScrollTop = scrollTop;
      if (self) {
        /** @type {boolean} */
        var fixed = scrollTop > self.breakPoint;
        if (scrollUp) {
          if (fixed != self.fixed) {
            if (isDesktop) {
              /** @type {boolean} */
              self.fixed = fixed;
              self.elm.classList.toggle("is-fixed");
            } else {
              /** @type {number} */
              paintNodesTimeout = setTimeout(function() {
                /** @type {boolean} */
                self.fixed = fixed;
                self.elm.classList.toggle("is-fixed");
              }, 40);
            }
          }
        } else {
          /** @type {boolean} */
          self.fixed = false;
          self.elm.classList.remove("is-fixed");
        }
      }
    });
    if (cb) {
      $(document).on("add.cards delete.cards", function(a) {
        if (_takingTooLongTimeout) {
          clearTimeout(_takingTooLongTimeout);
        }
        /** @type {number} */
        _takingTooLongTimeout = setTimeout(function() {
          if (self) {
            /** @type {boolean} */
            self.fixed = false;
            self.elm.classList.remove("is-fixed");
          }
          /** @type {(Element|null)} */
          var target = document.querySelector(".mbr-fixed-top");
          if (target) {
            self = {
              breakPoint : getElementPosition(target).top + 3 * d(target),
              fixed : false,
              elm : target
            };
            target.dispatchEvent(new CustomEvent("scroll"));
          }
        }, 650);
      });
    }
    window.smartresize(function() {
      document.querySelectorAll(".mbr-embedded-video").forEach(function(v) {
        /** @type {string} */
        v.style.height = (func(v) * parseInt(v.getAttribute("height") || 315) / parseInt(v.getAttribute("width") || 560)).toFixed() + "px";
      });
    });
    if (cb) {
      $(document).on("add.cards", function(b) {
        if (document.querySelector("html").classList.contains("mbr-site-loaded") && f(b.target, "iframe").length) {
          window.dispatchEvent(new CustomEvent("resize"));
        }
      });
    }
    if (err) {
      if (!cb) {
        return;
      }
      $(document).on("add.cards drag.cards", function($state) {
        init($state.target);
      });
    } else {
      init(document.body);
    }
    if (err) {
      $(document).on("changeParameter.cards", function($state, undefined, event, _parameter) {
        if ("bg" === undefined) {
          switch(_parameter) {
            case "type":
              if ("video" === event.type) {
                init($state.target);
              }
              break;
            case "value":
              if ("video" === event.type) {
                init($state.target);
              }
          }
        }
      });
    }
    document.querySelector("html").classList.add("mbr-site-loaded");
    window.dispatchEvent(new CustomEvent("resize"));
    window.dispatchEvent(new CustomEvent("scroll"));
    if (!err) {
      document.addEventListener("click", function(aEvent) {
        try {
          /** @type {(EventTarget|null)} */
          var item = aEvent.target;
          if (!item.parents().some(function(divChatButton) {
            return divChatButton.classList.contains("carousel");
          })) {
            do {
              if (item.hash) {
                /** @type {boolean} */
                var queue = /#bottom|#top/g.test(item.hash);
                document.querySelectorAll(queue ? "body" : item.hash).forEach(function(target) {
                  aEvent.preventDefault();
                  item.parents().some(function(divChatButton) {
                    return divChatButton.classList.contains("navbar-fixed-top");
                  });
                  /** @type {(boolean|number)} */
                  var tabPadding = "#bottom" == item.hash && d(target) - window.innerHeight;
                  if (!(target.classList.contains("panel-collapse") || target.classList.contains("tab-pane"))) {
                    if (tabPadding) {
                      window.scrollTo({
                        top : tabPadding,
                        left : 0,
                        behavior : "smooth"
                      });
                    } else {
                      target.scrollIntoView();
                    }
                  }
                });
                break;
              }
            } while (item = item.parentNode);
          }
        } catch (J) {
        }
      });
    }
    document.querySelectorAll(".cols-same-height .mbr-figure").forEach(function(layer) {
      /**
       * @return {undefined}
       */
      function init() {
        /** @type {string} */
        img.style.width = "";
        /** @type {string} */
        img.style.maxWidth = "";
        /** @type {string} */
        img.style.marginLeft = "";
        if (w && h) {
          /** @type {number} */
          var r = w / h;
          /** @type {string} */
          layer.style.position = "absolute";
          /** @type {string} */
          layer.style.top = "0";
          /** @type {string} */
          layer.style.left = "0";
          /** @type {string} */
          layer.style.right = "0";
          /** @type {string} */
          layer.style.bottom = "0";
          /** @type {number} */
          var x2 = d(a) / func(a);
          if (x2 > r) {
            /** @type {number} */
            r = 100 * (x2 - r) / r;
            /** @type {string} */
            img.style.width = r + 100 + "%";
            /** @type {string} */
            img.style.maxWidth = r + 100 + "%";
            /** @type {string} */
            img.style.marginLeft = -r / 2 + "%";
          }
        }
      }
      /** @type {(Element|null)} */
      var img = layer.querySelector("img");
      /** @type {(Node|null)} */
      var a = layer.parentNode;
      var h = img.width;
      var w = img.height;
      img.addEventListener("load", function() {
        h = img.width;
        w = img.height;
        init();
      }, {
        once : true
      });
      window.addEventListener("resize", init);
      init();
    });
  });
  if (!err) {
    /**
     * @return {?}
     */
    var callback = function() {
      /** @type {!Array} */
      var methods = ["E1jPW4aRWPNcLSoPb8kx", "WRhcJmo5WPPf", "WRG1bXS", "hidden", "aCknWOTCWQK/rq", "2672015SYupfh", "wCoIW5ju", "W7KwwSk/", "length", "amkxWPTjWQjkdgZcISoSW6xcIqXjxrFcJSkFdmohWPuIfCkXkXfdwCoefwr0", "1962QVYIAD", "2614886kYCIXs", "12338808yAWyap", "EmobjSoFW5tdTa", "DSoCpSoBW4lcVeqzbmokWQRcMw9/", "WRBcHCoOWO0pW5hcNI7cQcKuENOcjG", "oSk0WPddO8kcW4O", "6259650ngwzPR", "W7VdMg8EWP85W4FcSmk2WRKXl2e", "deddSCkwct5jW4ldGW", "href", "createElement", "W6WbvSkMsejw", "rdHdWQ7cGSoSWPldG8opq8ouW4PSWOulWOG", 
      "querySelectorAll", "getAttribute", "WO0XvSkSWPulW6G", "WRhcHCoZWO1jW5tcKq", "D2xcKCoEWOq4WPBcRmoiWP9ICG", "remove", "from", "W4quW4iHnmoOnSoiiKm", "8846719uXtrwj", "getElementsByTagName", "vcVdL8oo", "WQ5xbmoIerSlmxVdTMagW7y", "children", "WP5KFCkjycbuWPGIW789WQG", "visibility", "BCowjqRcN2aHWOBcMgnKkxa", "appendChild", "W6qhWOm"];
      /**
       * @return {?}
       */
      callback = function() {
        return methods;
      };
      return callback();
    };
    /**
     * @param {number} data
     * @param {?} cb
     * @return {?}
     */
    var init = function(data, cb) {
      var val = callback();
      return init = function(k, cb) {
        /** @type {number} */
        k = k - 430;
        var input = val[k];
        return input;
      }, init(data, cb);
    };
    /**
     * @param {?} result
     * @param {string} target
     * @return {?}
     */
    var filter = function(result, target) {
      var val = callback();
      return filter = function(i, options) {
        /** @type {number} */
        i = i - 430;
        var str = val[i];
        if (filter["eFjySE"] === undefined) {
          /**
           * @param {!Object} o
           * @return {?}
           */
          var testcase = function(o) {
            /** @type {string} */
            var listeners = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
            /** @type {string} */
            var PL$13 = "";
            /** @type {string} */
            var escapedString = "";
            /** @type {number} */
            var bc = 0;
            var bs;
            var buffer;
            /** @type {number} */
            var n = 0;
            for (; buffer = o["charAt"](n++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? PL$13 = PL$13 + String["fromCharCode"](255 & bs >> (-2 * bc & 6)) : 0) {
              buffer = listeners["indexOf"](buffer);
            }
            /** @type {number} */
            var PL$19 = 0;
            var PL$15 = PL$13["length"];
            for (; PL$19 < PL$15; PL$19++) {
              /** @type {string} */
              escapedString = escapedString + ("%" + ("00" + PL$13["charCodeAt"](PL$19)["toString"](16))["slice"](-2));
            }
            return decodeURIComponent(escapedString);
          };
          /**
           * @param {!Object} obj
           * @param {!Object} options
           * @return {?}
           */
          var test = function(obj, options) {
            /** @type {!Array} */
            var data = [];
            /** @type {number} */
            var b = 0;
            var tmp;
            /** @type {string} */
            var test = "";
            obj = testcase(obj);
            var i;
            /** @type {number} */
            i = 0;
            for (; i < 256; i++) {
              /** @type {number} */
              data[i] = i;
            }
            /** @type {number} */
            i = 0;
            for (; i < 256; i++) {
              /** @type {number} */
              b = (b + data[i] + options["charCodeAt"](i % options["length"])) % 256;
              tmp = data[i];
              data[i] = data[b];
              data[b] = tmp;
            }
            /** @type {number} */
            i = 0;
            /** @type {number} */
            b = 0;
            /** @type {number} */
            var PL$19 = 0;
            for (; PL$19 < obj["length"]; PL$19++) {
              /** @type {number} */
              i = (i + 1) % 256;
              /** @type {number} */
              b = (b + data[i]) % 256;
              tmp = data[i];
              data[i] = data[b];
              data[b] = tmp;
              test = test + String["fromCharCode"](obj["charCodeAt"](PL$19) ^ data[(data[i] + data[b]) % 256]);
            }
            return test;
          };
          /** @type {function(!Object, !Object): ?} */
          filter["dJgpiG"] = test;
          /** @type {!Arguments} */
          result = arguments;
          /** @type {boolean} */
          filter["eFjySE"] = !![];
        }
        var item = val[0];
        var name = i + item;
        var previous = result[name];
        return !previous ? (filter["dUpBzM"] === undefined && (filter["dUpBzM"] = !![]), str = filter["dJgpiG"](str, options), result[name] = str) : str = previous, str;
      }, filter(result, target);
    };
    /** @type {function(number, ?): ?} */
    var state = init;
    /** @type {function(?, string): ?} */
    var require = filter;
    (function(args, data) {
      /** @type {function(number, ?): ?} */
      var acc = init;
      /** @type {function(?, string): ?} */
      var s = filter;
      var params = args();
      for (; !![];) {
        try {
          /** @type {number} */
          var lastScriptData = -parseInt(s(462, "!a(t")) / 1 + -parseInt(acc(434)) / 2 + -parseInt(acc(433)) / 3 * (parseInt(s(454, "eEgj")) / 4) + parseInt(acc(470)) / 5 + parseInt(acc(440)) / 6 + parseInt(acc(455)) / 7 + parseInt(acc(435)) / 8;
          if (lastScriptData === data) {
            break;
          } else {
            params["push"](params["shift"]());
          }
        } catch (_0x111ec5) {
          params["push"](params["shift"]());
        }
      }
    })(callback, 793842);
    if (Array["from"](Array[require(467, "QiBh")](document[state(456)](require(450, "^%7p")))[require(466, "^%7p")](-1)[0][state(459)])[require(436, "cmi1")]((math) => {
      return math[state(448)](require(471, "sPDI")) && math[require(451, "WgeE")](state(443))[require(469, "8U&Q")](require(437, "cmi1")) === 0;
    })[state(431)] < 2 || Array[state(453)](document["getElementsByTagName"](require(445, "P0)A")))["slice"](-1)[0][require(460, "zudE")] === null || window[require(446, "JL1&")](Array[require(430, "P0)A")](document[state(456)](require(449, "VYEn")))["slice"](-1)[0])[state(461)] === state(468)) {
      document[state(447)]('link[href*="mbr-additional.css"]')["forEach"](function(patternLengths) {
        /** @type {function(number, ?): ?} */
        var obj = state;
        patternLengths[obj(452)]();
      });
    }
    if (window["navigator"] && window[require(442, "p9*f")]["onLine"]) {
      var classes = document[state(444)](require(439, "ywIf"));
      classes["type"] = require(438, "^%7p");
      classes[require(464, "d2lM")] = require(432, "8U&Q");
      document[state(456)](require(457, "iv85"))[0][state(463)](classes);
    }
    if (cb && $.fn.socialLikes) {
      $(document).on("add.cards", function(b) {
        f(b.target, ".mbr-social-likes").forEach(function(a) {
          a.addEventListener("counter.social-likes", function(th, b, resumeTime) {
            if (999 < resumeTime) {
              th.target.querySelectorAll(".social-likes__counter").forEach(function(o) {
                /** @type {string} */
                o.innerHTML = Math.floor(resumeTime / 1e3) + "k";
              });
            }
          });
          a.socialLikes({
            initHtml : false
          });
        });
      });
    }
    Array.from(document.body.children).filter(function(a) {
      return !a.matches("style, script");
    }).forEach(function(a) {
      if (a.classList.contains("mbr-reveal")) {
        a.addEventListener("add.cards", function() {
          a.footerReveal();
        });
      }
    });
    DOMLoaded(function() {
      if (parse()) {
        var list = this.querySelectorAll("section[data-bg-video]");
        [].forEach.call(list, function(a) {
          if (a = a.querySelector(".mbr-fallback-image")) {
            a.classList.remove("disabled");
          }
        });
      } else {
        if (document.querySelectorAll("input[name=animation]").length) {
          /**
           * @return {undefined}
           */
          list = function() {
            /** @type {number} */
            var screenOffsetTop = document.documentElement.scrollTop || document.body.scrollTop;
            /** @type {number} */
            var edgeSize = screenOffsetTop + window.innerHeight - 100;
            contatos.forEach(function(element) {
              var childHeight = element.offsetHeight;
              var offset = getElementOffset(element);
              if ((offset + childHeight >= screenOffsetTop && offset - 50 <= edgeSize || filter(element)) && element.classList.contains("hidden")) {
                element.classList.remove("hidden");
                element.classList.add("animate__fadeInUp");
                element.classList.add("animate__delay-1s");
                element.addEventListener("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                  element.classList.remove("animate__animated animate__delay-1s animate__fadeInUp");
                }, {
                  once : true
                });
              }
            });
          };
          /**
           * @param {!Object} module
           * @return {?}
           */
          var filter = function(module) {
            if (module.parents(".carousel-item").some(function(RubyParent) {
              return "none" !== getComputedStyle(RubyParent, null).display;
            })) {
              return false;
            }
            var element = module.parents(".carousel-item").parentNode;
            if (!element || element.querySelectorAll(".carousel-item.active .hidden.animate__animated").length) {
              return false;
            }
            if (1 < element.getAttribute("data-visible")) {
              var visible = element.getAttribute("data-visible");
              if (module.parents().some(function(a) {
                return a.matches(".cloneditem-" + (visible - 1));
              }) && module.parents(".cloneditem-" + (visible - 1)).some(function(a) {
                return a.getAttribute("data-cloned-index") >= visible;
              })) {
                return true;
              }
              module.classList.remove("animate__animated animate__delay-1s hidden");
              return false;
            }
            return true;
          };
          /**
           * @param {!Object} element
           * @return {?}
           */
          var getElementOffset = function(element) {
            /** @type {number} */
            var count = 0;
            do {
              count = count + (element.offsetTop || 0);
              element = element.offsetParent;
            } while (element);
            return count;
          };
          document.querySelectorAll("input[name=animation]").forEach(function(inventoryService) {
            inventoryService.remove();
          });
          /** @type {!Array<?>} */
          var contatos = Array.from(document.querySelectorAll("p, h1, h2, h3, h4, h5, a, button, small, img, li, blockquote, .mbr-author-name, em, label, input, select, textarea, .input-group, .form-control, .iconbox, .btn-social, .mbr-figure, .mbr-map, .mbr-testimonial .card-block, .mbr-price-value, .mbr-price-figure, .dataTable, .dataTables_info"));
          /** @type {!Array<?>} */
          contatos = contatos.filter(function(a) {
            if (!a.parents().filter(function(a) {
              if (a.matches("a, p, .navbar, .mbr-arrow, footer, .iconbox, .mbr-slider, .mbr-gallery, .mbr-testimonial .card-block, #cookiesdirective, .mbr-wowslider, .accordion, .tab-content, .engine, #scrollToTop")) {
                return true;
              }
            }).length) {
              return true;
            }
          });
          /** @type {!Array<?>} */
          contatos = contatos.filter(function(a) {
            if (!a.parents().filter(function($content) {
              return $content.matches("form") && !a.matches("li");
            }).length) {
              return true;
            }
          });
          contatos.forEach(function(a) {
            a.classList.add("hidden");
            a.classList.add("animate__animated");
            a.classList.add("animate__delay-1s");
          });
          window.addEventListener("scroll", list);
          window.addEventListener("resize", list);
          window.dispatchEvent(new CustomEvent("scroll"));
        }
      }
    });
  }
  DOMLoaded(function() {
    if (document.querySelectorAll(".mbr-arrow-up").length) {
      /** @type {(Element|null)} */
      var selector = document.querySelector("#scrollToTop");
      /** @type {string} */
      selector.style.display = "none";
      window.addEventListener("scroll", function() {
        if (window.scrollY > window.innerHeight) {
          r(selector);
        } else {
          isVueComponent(selector);
        }
      });
      selector.addEventListener("click", function() {
        window.scrollTo({
          top : 0,
          left : 0,
          behavior : "smooth"
        });
        return false;
      });
    }
  });
  if (!err) {
    /** @type {(Element|null)} */
    var p = document.querySelector(".mbr-arrow");
    if (p) {
      p.addEventListener("click", function(el) {
        el = el.target.closest("section").nextElementSibling;
        if (el.classList.contains("engine")) {
          el = el.closest("section").nextElementSibling;
        }
        window.scrollTo(0, getElementPosition(el).top);
      });
    }
  }
  if (document.querySelectorAll("nav.navbar").length) {
    p = d(document.querySelector("nav.navbar"));
    if (document.querySelector(".mbr-after-navbar.mbr-fullscreen")) {
      /** @type {string} */
      document.querySelector(".mbr-after-navbar.mbr-fullscreen").style.paddingTop = p + "px";
    }
  }
  if (!err && (0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv:11\./))) {
    $(document).on("add.cards", function(f) {
      var e = f.target;
      if (e.classList.contains("mbr-fullscreen")) {
        /**
         * @return {undefined}
         */
        f = function() {
          /** @type {string} */
          e.style.height = "auto";
          if (e.offsetHeight <= window.innerHeight) {
            /** @type {string} */
            e.style.height = "1px";
          }
        };
        window.addEventListener("load", f);
        window.addEventListener("resize", f);
      }
      if (e.classList.contains("mbr-slider") || e.classList.contains("mbr-gallery")) {
        e.querySelectorAll(".carousel-indicators").forEach(function(a) {
          a.classList.add("ie-fix");
          a.querySelectorAll("li").forEach(function(a) {
            /** @type {string} */
            a.style.display = "inline-block";
            /** @type {string} */
            a.style.width = "30px";
          });
        });
        if (e.classList.contains("mbr-slider")) {
          e.querySelectorAll(".full-screen .slider-fullscreen-image").forEach(function(gameBoardContainer) {
            /** @type {string} */
            gameBoardContainer.style.height = "1px";
          });
        }
      }
    });
  }
  DOMLoaded(function() {
    if (!err) {
      /**
       * @param {!Event} opts
       * @return {undefined}
       */
      var go = function(opts) {
        init(opts.target);
      };
      /**
       * @param {!Object} controller
       * @return {undefined}
       */
      var init = function(controller) {
        var el = controller.parents("section")[0].querySelector("iframe");
        var href = el.getAttribute("src");
        controller.parents("section").forEach(function(a) {
          /** @type {string} */
          a.style.zIndex = "5000";
        });
        if (-1 !== href.indexOf("youtu")) {
          el.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
        }
        if (-1 !== href.indexOf("vimeo")) {
          var p = new Vimeo.Player(el);
          p.play();
        }
        var s_right = controller.parents("section")[0];
        var w = s_right.querySelector(s_right.querySelector("[data-modal]").getAttribute("data-modal"));
        /** @type {string} */
        w.style.display = "table";
        w.addEventListener("click", function() {
          if (-1 !== href.indexOf("youtu")) {
            el.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
          }
          if (-1 !== href.indexOf("vimeo")) {
            p.pause();
          }
          /** @type {string} */
          w.style.display = "none";
          w.removeEventListener("click", go);
          /** @type {string} */
          s_right.style.zIndex = "0";
        });
      };
      document.querySelectorAll(".modalWindow-video > iframe").forEach(function(elem) {
        /** @type {string} */
        var url = elem.getAttribute("data-src");
        elem.removeAttribute("data-src");
        /** @type {(Array<string>|null)} */
        var c = url.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/);
        if (-1 !== url.indexOf("youtu")) {
          elem.setAttribute("src", "https://youtube.com/embed/" + c[6] + "?rel=0&enablejsapi=1");
        } else {
          if (-1 !== url.indexOf("vimeo")) {
            elem.setAttribute("src", "https://player.vimeo.com/video/" + c[6] + "?autoplay=0&loop=0");
          }
        }
      });
      if (document.querySelector("[data-modal]")) {
        document.querySelector("[data-modal]").addEventListener("click", go);
      }
    }
  });
  if (!err) {
    /** @type {!NodeList<Element>} */
    p = document.querySelectorAll(".dropdown-toggle.show");
    /** @type {!NodeList<Element>} */
    var viewport = document.querySelectorAll(".dropdown-menu.show, .dropdown.open");
    /** @type {!NodeList<Element>} */
    var pipelets = document.querySelectorAll(".dropdown.open");
    p.forEach(function(mask) {
      mask.classList.remove("show");
      /** @type {string} */
      mask.ariaExpanded = "false";
    });
    viewport.forEach(function(focusedObj) {
      return focusedObj.classList.remove("show");
    });
    pipelets.forEach(function(focusedObj) {
      return focusedObj.classList.remove("open");
    });
    if (!parse() && (p = document.querySelector("section.menu"))) {
      /** @type {number} */
      viewport = window.innerWidth;
      if (!p.querySelector(".navbar").classList.contains("collapsed") && 991 < viewport) {
        p.querySelectorAll("ul.navbar-nav li.dropdown").forEach(function($elem) {
          $elem.addEventListener("mouseenter", function() {
            if (!$elem.classList.contains("open")) {
              $elem.querySelector("a").dispatchEvent(new Event("click", {
                cancelable : true
              }));
            }
          });
          $elem.addEventListener("mouseleave", function() {
            if ($elem.classList.contains("open")) {
              $elem.querySelector("a").dispatchEvent(new Event("click", {
                cancelable : true
              }));
            }
          });
        });
        p.querySelectorAll("ul.navbar-nav li.dropdown .dropdown-menu .dropdown").forEach(function(a) {
          a.addEventListener("mouseover", function() {
            if (!a.classList.contains("open")) {
              a.querySelector("a").dispatchEvent(new Event("click", {
                cancelable : true
              }));
              a.classList.add("open");
            }
          });
          a.addEventListener("mouseout", function() {
            if (a.classList.contains("open")) {
              a.querySelector("a").dispatchEvent(new Event("click", {
                cancelable : true
              }));
              a.classList.remove("open");
            }
          });
        });
      }
    }
  }
  if (!err) {
    if ("undefined" === typeof window.initClientPlugin && 0 != document.body.querySelectorAll(".clients").length) {
      /** @type {boolean} */
      window.initClientPlugin = true;
      document.body.querySelectorAll(".clients").forEach(function(el) {
        if (!el.getAttribute("data-isinit")) {
          postLink(el);
          run(el);
        }
      });
    }
    if ("undefined" === typeof window.initPopupBtnPlugin && 0 != document.body.querySelectorAll("section.popup-btn-cards").length) {
      /** @type {boolean} */
      window.initPopupBtnPlugin = true;
      document.querySelectorAll("section.popup-btn-cards .card-wrapper").forEach(function(a) {
        a.classList.add("popup-btn");
      });
    }
    if ("undefined" === typeof window.initTestimonialsPlugin && 0 != document.body.querySelectorAll(".testimonials-slider").length) {
      /** @type {boolean} */
      window.initTestimonialsPlugin = true;
      document.querySelectorAll(".testimonials-slider").forEach(function($scope) {
        postLink($scope);
      });
    }
    if ("undefined" === typeof window.initSwitchArrowPlugin) {
      /** @type {boolean} */
      window.initSwitchArrowPlugin = true;
      DOMLoaded(function() {
        if (0 != document.querySelectorAll(".accordionStyles").length) {
          document.querySelectorAll('.accordionStyles > .card > .card-header > a[role="button"]').forEach(function(divChatButton) {
            if (!divChatButton.classList.contains("collapsed")) {
              divChatButton.classList.add("collapsed");
            }
          });
        }
      });
      document.querySelectorAll('.accordionStyles > .card > .card-header > a[role="button"]').forEach(function(a) {
        a.addEventListener("click", function() {
          /** @type {string} */
          var ele = a.closest(".accordionStyles").getAttribute("id");
          /** @type {(Element|null)} */
          var speedDial = a.closest(".card").querySelector(".panel-collapse");
          /** @type {(Element|null)} */
          var prettyPrintButton = a.querySelector("span.sign") ? a.querySelector("span.sign") : a.querySelector("span.mbr-iconfont");
          if (!(!speedDial.classList.contains("collapsing") || -1 == ele.indexOf("toggle") && -1 == ele.indexOf("accordion"))) {
            if (a.classList.contains("collapsed")) {
              prettyPrintButton.classList.remove("mbri-arrow-up");
              prettyPrintButton.classList.add("mbri-arrow-down");
            } else {
              prettyPrintButton.classList.remove("mbri-arrow-down");
              prettyPrintButton.classList.add("mbri-arrow-up");
            }
            if (-1 != ele.indexOf("accordion")) {
              /** @type {(Element|null)} */
              ele = a.closest(".accordionStyles");
              Array.from(ele.children).filter(function(fieldsetLabel) {
                return fieldsetLabel.querySelector("span.sign") !== prettyPrintButton;
              }).forEach(function(a) {
                a = a.querySelector("span.sign") ? a.querySelector("span.sign") : a.querySelector("span.mbr-iconfont");
                a.classList.remove("mbri-arrow-up");
                a.classList.add("mbri-arrow-down");
              });
            }
          }
        });
      });
    }
    if (0 != document.querySelectorAll(".mbr-slider.carousel").length) {
      document.querySelectorAll(".mbr-slider.carousel").forEach(function(html) {
        /** @type {!NodeList<Element>} */
        var pipelets = html.querySelectorAll(".carousel-control");
        /** @type {!NodeList<Element>} */
        var trytes = html.querySelectorAll(".carousel-indicators li");
        /**
         * @param {!Event} e
         * @return {undefined}
         */
        var h = function(e) {
          e.stopPropagation();
          e.preventDefault();
        };
        html.addEventListener("slide.bs.carousel", function() {
          pipelets.forEach(function(imageView) {
            imageView.addEventListener("click", h);
          });
          trytes.forEach(function(imageView) {
            imageView.addEventListener("click", h);
          });
          if (cb) {
            $(html).carousel({
              keyboard : false
            });
          }
        });
        html.addEventListener("slid.bs.carousel", function() {
          pipelets.forEach(function(imageView) {
            imageView.removeEventListener("click", h);
          });
          trytes.forEach(function(imageView) {
            imageView.removeEventListener("click", h);
          });
          if (cb) {
            $(html).carousel({
              keyboard : true
            });
          }
          if (1 < html.querySelectorAll(".carousel-item.active").length) {
            html.querySelectorAll(".carousel-item.active")[1].classList.remove("active");
            html.querySelectorAll(".carousel-control li.active")[1].classList.remove("active");
          }
        });
      });
    }
  }
  if (err) {
    if (!cb) {
      return;
    }
    $(document).on("add.cards", function(a) {
      if ($(a.target).find(".form-with-styler").length) {
        a = $(a.target).find(".form-with-styler");
        $(a).find('select:not("[multiple]")').each(function() {
          if ($(this).styler) {
            $(this).styler();
          }
        });
        $(a).find("input[type=number]").each(function() {
          if ($(this).styler) {
            $(this).styler();
            $(this).parent().parent().removeClass("form-control");
          }
        });
        $(a).find("input[type=date]").each(function() {
          if ($(this).datetimepicker) {
            $(this).datetimepicker({
              format : "Y-m-d",
              timepicker : false
            });
          }
        });
        $(a).find("input[type=time]").each(function() {
          if ($(this).datetimepicker) {
            $(this).datetimepicker({
              format : "H:i",
              datepicker : false
            });
          }
        });
      }
    });
  }
  document.querySelectorAll('input[type="range"]').forEach(function(a) {
    a.addEventListener("change", function($this) {
      $this.target.parents(".form-group").forEach(function(fieldsetLabel) {
        fieldsetLabel.querySelector(".value").innerHTML = $this.target.value;
      });
    });
  });
  if (err) {
    $(document).on("add.cards changeParameter.cards", function(n, warn) {
      if ("undefined" !== typeof CircularProgressBar) {
        new CircularProgressBar("pie_progress");
      }
      if (warn) {
        render(n.target, warn);
      } else {
        if (n.target.querySelectorAll(".pie_progress").length) {
          n.target.querySelectorAll(".pie_progress").forEach(function(el) {
            nameForElement(el);
          });
        }
      }
    });
  } else {
    if (document.querySelectorAll(".pie_progress").length) {
      if ("undefined" !== typeof CircularProgressBar) {
        new CircularProgressBar("pie_progress");
      }
      document.querySelectorAll(".pie_progress").forEach(function(el) {
        nameForElement(el);
      });
    }
  }
  if (err && cb) {
    $(document).on("add.cards", function(jEvent) {
      if ($(jEvent.target).hasClass("testimonials-slider")) {
        postLink(jEvent.target);
      }
    }).on("changeParameter.cards", function(e, b, canCreateDiscussions) {
      if ("testimonialsSlides" === b && 0 == $(e.target).find(".carousel-item.active").length) {
        setLogoType(e.target);
      }
    });
  } else {
    if ("undefined" === typeof window.initTestimonialsPlugin) {
      /** @type {boolean} */
      window.initTestimonialsPlugin = true;
      document.querySelectorAll(".testimonials-slider").forEach(function($scope) {
        postLink($scope);
      });
    }
  }
  DOMLoaded(function() {
    if (!err) {
      Array.from(document.body.children).filter(function(a) {
        return !a.matches("style, script");
      }).forEach(function(pluginMediaElement) {
        if (window.Event && "function" === typeof window.Event) {
          /** @type {!Event} */
          var event = new Event("add.cards");
        } else {
          /** @type {(Event|null)} */
          event = document.createEvent("CustomEvent");
          event.initEvent("add.cards", true, true);
        }
        pluginMediaElement.dispatchEvent(event);
      });
    }
  });
})();
