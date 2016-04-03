/*eslint-disable */
/**
 * Modified React Reorder component
 * github.com/JakeSidSmith/react-reorder
 */
import React from 'react';
import ReactDOM from 'react-dom';

var Reorder = React.createClass({
  displayName: 'Reorder',
  nonCollisionElement: new RegExp('(^|\\s)(placeholder|dragged)($|\\s)', ''),
  constants: {
    HOLD_THRESHOLD: 8,
    SCROLL_RATE: 1000 / 60,
    SCROLL_DISTANCE: 1,
    SCROLL_AREA: 50,
    SCROLL_MULTIPLIER: 5,
    LOCK_DISTANCE_THRESHOLD: 15
  },
  preventDefault: function (event) {
    event.preventDefault();
  },
  handleTouchEvents: function (event) {
    if (event.touches && event.touches.length) {
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
    }
  },
  startDrag: function (dragOffset, draggedStyle) {
    if (!this.props.disableReorder) {
      this.setState({
        dragOffset: dragOffset,
        draggedStyle: draggedStyle,
        originalPosition: draggedStyle,
        held: true,
        moved: false
      });
    }
  },
  itemDown: function (item, index, event) {
    this.handleTouchEvents(event);

    var self = this;
    var target = event.currentTarget;
    var rect = target.getBoundingClientRect();
    var lock = this.props.lock;
    if (this.props.lock === 'auto')
      lock = null;

    this.setState({
      held: false,
      moved: false,
      lock: lock
    });

    var dragOffset = {
      top: event.clientY - rect.top,
      left: event.clientX - rect.left
    };

    this.setState({
      dragged: {
        target: target,
        item: item,
        index: index
      }
    });

    var draggedStyle = {
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };

    // Timeout if holdTime is defined
    var holdTime = Math.abs(parseInt(this.props.holdTime));

    if (holdTime) {
      this.holdTimeout = setTimeout(function () {
        self.startDrag(dragOffset, draggedStyle);
      }, holdTime);
    } else {
      self.startDrag(dragOffset, draggedStyle);
    }
  },
  listDown: function (event) {
    this.handleTouchEvents(event);

    var self = this;

    var downPos = {
      clientY: event.clientY,
      clientX: event.clientX,
      scrollTop: ReactDOM.findDOMNode(self).scrollTop,
      scrollLeft: ReactDOM.findDOMNode(self).scrollLeft
    };

    this.setState({
      downPos: downPos,
      pointer: {
        clientY: downPos.clientY,
        clientX: downPos.clientX
      },
      velocity: {
        y: 0,
        x: 0
      },
      movedALittle: false
    });

    // Mouse events
    window.addEventListener('mouseup', this.onMouseUp); // Mouse up
    window.addEventListener('mousemove', this.onMouseMove); // Mouse move

    // Touch events
    window.addEventListener('touchend', this.onMouseUp); // Touch up
    window.addEventListener('touchmove', this.onMouseMove); // Touch move

    window.addEventListener('contextmenu', this.preventDefault);
  },
  onMouseUp: function (event) {
    if (event.type.indexOf('touch') >= 0 && !this.state.movedALittle) {
      event.preventDefault();
    }

    // Item clicked
    if (typeof this.props.itemClicked === 'function' && !this.state.held && !this.state.moved && this.state.dragged) {
      this.props.itemClicked(event, this.state.dragged.item, this.state.dragged.index);
    }

    // Reorder callback
    if (this.state.held && this.state.dragged && typeof this.props.callback === 'function') {
      var listElements = this.nodesToArray(ReactDOM.findDOMNode(this).childNodes);
      var newIndex = listElements.indexOf(this.state.dragged.target);

      this.props.callback(event, this.state.dragged.item, this.state.dragged.index, newIndex, this.state.list);
    }

    this.setState({
      dragged: undefined,
      draggedStyle: undefined,
      dragOffset: undefined,
      originalPosition: undefined,
      downPos: undefined,
      held: false,
      moved: false
    });

    clearTimeout(this.holdTimeout);
    clearInterval(this.scrollIntervalY);
    this.scrollIntervalY = undefined;
    clearInterval(this.scrollIntervalX);
    this.scrollIntervalX = undefined;

    // Mouse events
    window.removeEventListener('mouseup', this.onMouseUp); // Mouse up
    window.removeEventListener('mousemove', this.onMouseMove); // Mouse move
    // Touch events
    window.removeEventListener('touchend', this.onMouseUp); // Touch up
    window.removeEventListener('touchmove', this.onMouseMove); // Touch move

    window.removeEventListener('contextmenu', this.preventDefault);
  },
  getScrollArea: function (value) {
    return Math.max(Math.min(value / 4, this.constants.SCROLL_AREA), this.constants.SCROLL_AREA / 5);
  },
  getDistanceX: function (pointerA, pointerB) {
    return Math.abs(pointerA.clientX - pointerB.clientX);
  },
  getDistanceY: function (pointerA, pointerB) {
    return Math.abs(pointerA.clientY - pointerB.clientY);
  },
  dragScrollY: function () {
    var element = ReactDOM.findDOMNode(this);
    var rect = element.getBoundingClientRect();
    var scrollArea = this.getScrollArea(rect.height);

    var distanceInArea;
    if (this.state.pointer.clientY < rect.top + scrollArea) {
      distanceInArea = Math.min((rect.top + scrollArea) - this.state.pointer.clientY, scrollArea * 2);
      element.scrollTop -= distanceInArea / this.constants.SCROLL_MULTIPLIER;
    } else if (this.state.pointer.clientY > rect.bottom - scrollArea) {
      distanceInArea = Math.min(this.state.pointer.clientY - (rect.bottom - scrollArea), scrollArea * 2);
      element.scrollTop += distanceInArea / this.constants.SCROLL_MULTIPLIER;
    }
  },
  dragScrollX: function () {
    var element = ReactDOM.findDOMNode(this);
    var rect = element.getBoundingClientRect();
    var scrollArea = this.getScrollArea(rect.width);

    var distanceInArea;
    if (this.state.pointer.clientX < rect.left + scrollArea) {
      distanceInArea = Math.min((rect.left + scrollArea) - this.state.pointer.clientX, scrollArea * 2);
      element.scrollLeft -= distanceInArea / this.constants.SCROLL_MULTIPLIER;
    } else if (this.state.pointer.clientX > rect.right - scrollArea) {
      distanceInArea = Math.min(this.state.pointer.clientX - (rect.right - scrollArea), scrollArea * 2);
      element.scrollLeft += distanceInArea / this.constants.SCROLL_MULTIPLIER;
    }
  },
  handleDragScrollY: function (event) {
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    if (!this.scrollIntervalY && this.state.lock !== 'vertical') {
      if (event.clientY < rect.top + this.constants.SCROLL_AREA) {
        this.scrollIntervalY = setInterval(this.dragScrollY, this.constants.SCROLL_RATE);
      } else if (event.clientY > rect.bottom - this.constants.SCROLL_AREA) {
        this.scrollIntervalY = setInterval(this.dragScrollY, this.constants.SCROLL_RATE);
      }
    } else {
      if (event.clientY <= rect.bottom - this.constants.SCROLL_AREA && event.clientY >= rect.top + this.constants.SCROLL_AREA) {
        clearInterval(this.scrollIntervalY);
        this.scrollIntervalY = undefined;
      }
    }
  },
  handleDragScrollX: function (event) {
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    if (!this.scrollIntervalX && this.state.lock !== 'horizontal') {
      if (event.clientX < rect.left + this.constants.SCROLL_AREA) {
        this.scrollIntervalX = setInterval(this.dragScrollX, this.constants.SCROLL_RATE);
      } else if (event.clientX > rect.right - this.constants.SCROLL_AREA) {
        this.scrollIntervalX = setInterval(this.dragScrollX, this.constants.SCROLL_RATE);
      }
    } else {
      if (event.clientX <= rect.right - this.constants.SCROLL_AREA && event.clientX >= rect.left + this.constants.SCROLL_AREA) {
        clearInterval(this.scrollIntervalX);
        this.scrollIntervalX = undefined;
      }
    }
  },
  onMouseMove: function (event) {
    this.handleTouchEvents(event);

    var pointer = {
      clientY: event.clientY,
      clientX: event.clientX
    };

    this.setState({
      pointer: pointer,
      velocity: {
        y: this.state.pointer.clientY - event.clientY,
        x: this.state.pointer.clientX - event.clientX
      },
      movedALittle: true
    });

    // Lock X or Y movement if threshold is reached
    if (this.state.lock === null) {
      var distanceX = this.getDistanceX(this.state.pointer, this.state.downPos);
      var distanceY = this.getDistanceY(this.state.pointer, this.state.downPos);
      if (distanceX >= this.constants.LOCK_DISTANCE_THRESHOLD ||
        distanceY >= this.constants.LOCK_DISTANCE_THRESHOLD) {
        if (distanceX > distanceY) {
          this.state.lock = 'vertical';
        } else {
          this.state.lock = 'horizontal'
        }
      }
    }

    if (this.state.held && this.state.dragged) {
      event.preventDefault();
      this.setDraggedPosition(event);

      var listElements = this.nodesToArray(ReactDOM.findDOMNode(this).childNodes);
      var collision = this.findCollision(listElements, event);

      // MOD.: Don't reorder (horizontal) list when moving vertically
      if (collision && this.state.lock !== 'vertical') {
        var previousIndex = listElements.indexOf(this.state.dragged.target);
        var newIndex = listElements.indexOf(collision);

        this.state.list.splice(newIndex, 0, this.state.list.splice(previousIndex, 1)[0]);
        this.setState({list: this.state.list});
      }

      this.handleDragScrollY(event);
      this.handleDragScrollX(event);
    } else {
      if (this.state.downPos) {
        // Cancel hold if mouse has moved
        if (this.xHasMoved(event) || this.yHasMoved(event)) {
          clearTimeout(this.holdTimeout);
          this.setState({moved: true});
        }
      }
    }
  },
  xHasMoved: function (event) {
    return Math.abs(this.state.downPos.clientX - event.clientX) > this.constants.HOLD_THRESHOLD;
  },
  yHasMoved: function (event) {
    return Math.abs(this.state.downPos.clientY - event.clientY) > this.constants.HOLD_THRESHOLD;
  },
  elementHeightMinusBorders: function (element) {
    var rect = element.getBoundingClientRect();
    var computedStyle;

    if (getComputedStyle) {
      computedStyle = getComputedStyle(element);
    } else {
      computedStyle = element.currentStyle;
    }

    return rect.height -
      parseInt(computedStyle.getPropertyValue('border-top-width') || computedStyle.borderTopWidth) -
      parseInt(computedStyle.getPropertyValue('border-bottom-width') || computedStyle.borderBottomWidth);
  },
  elementWidthMinusBorders: function (element) {
    var rect = element.getBoundingClientRect();
    var computedStyle;

    if (getComputedStyle) {
      computedStyle = getComputedStyle(element);
    } else {
      computedStyle = element.currentStyle;
    }

    return rect.width -
      parseInt(computedStyle.getPropertyValue('border-left-width') || computedStyle.borderLeftWidth) -
      parseInt(computedStyle.getPropertyValue('border-right-width') || computedStyle.borderRightWidth);
  },
  setDraggedPosition: function (event) {
    var draggedStyle = {
      position: this.state.draggedStyle.position,
      top: this.state.draggedStyle.top,
      left: this.state.draggedStyle.left,
      width: this.state.draggedStyle.width,
      height: this.state.draggedStyle.height
    };

    if (this.state.lock === 'horizontal') {
      draggedStyle.top = event.clientY - this.state.dragOffset.top;
      draggedStyle.left = this.state.originalPosition.left;
    } else if (this.state.lock === 'vertical') {
      draggedStyle.top = this.state.originalPosition.top;
      draggedStyle.left = event.clientX - this.state.dragOffset.left;
    } else {
      draggedStyle.top = event.clientY - this.state.dragOffset.top;
      draggedStyle.left = event.clientX - this.state.dragOffset.left;
    }

    this.setState({draggedStyle: draggedStyle});
  },

  // Collision methods

  nodesToArray: function (nodes) {
    return Array.prototype.slice.call(nodes, 0);
  },
  xCollision: function (rect, event) {
    return event.clientX >= rect.left && event.clientX <= rect.right;
  },
  yCollision: function (rect, event) {
    return event.clientY >= rect.top && event.clientY <= rect.bottom;
  },
  findCollision: function (listElements, event) {
    for (var i = 0; i < listElements.length; i += 1) {
      if (!this.nonCollisionElement.exec(listElements[i].className)) {
        var rect = listElements[i].getBoundingClientRect();

        if (this.state.lock === 'horizontal') {
          if (this.yCollision(rect, event)) {
            return listElements[i];
          }
        } else if (this.state.lock === 'vertical') {
          if (this.xCollision(rect, event)) {
            return listElements[i];
          }
        } else {
          if (this.yCollision(rect, event)) {
            if (this.xCollision(rect, event)) {
              return listElements[i];
            }
          }
        }

      }
    }

    return undefined;
  },

  // ---- View methods

  getDraggedStyle: function (item) {
    if (this.state.held && this.state.dragged && this.state.dragged.item === item) {
      return this.state.draggedStyle;
    }
    return undefined;
  },
  getDraggedClass: function (item) {
    if (this.state.held && this.state.dragged && this.state.dragged.item === item) {
      return 'dragged';
    }
    return undefined;
  },
  getPlaceholderClass: function (item) {
    if (this.state.held && this.state.dragged && this.state.dragged.item === item) {
      return 'placeholder';
    }
    return undefined;
  },
  getSelectedClass: function (item) {
    if (typeof this.props.selected !== 'undefined') {
      if (typeof this.props.selectedKey !== 'undefined') {
        return this.props.selected[this.props.selectedKey] === item[this.props.selectedKey] ? 'selected' : undefined;
      }
      return this.props.selected === item ? 'selected' : undefined;
    }
    return undefined;
  },

  // ---- Default methods

  componentWillUnmount: function () {
    clearTimeout(this.holdTimeout);

    clearInterval(this.scrollIntervalY);
    this.scrollIntervalY = undefined;
    clearInterval(this.scrollIntervalX);
    this.scrollIntervalX = undefined;
  },
  componentWillReceiveProps: function (props) {
    // Updates list when props changed
    this.setState({
      list: props.list
    });
  },
  getInitialState: function () {
    return {
      list: this.props.list || []
    };
  },
  render: function () {
    var self = this;

    var getPropsTemplate = function (item) {
      if (self.props.template) {
        return React.createElement(self.props.template, {
          item: item,
          sharedProps: self.props.sharedProps
        });
      }
      return item;
    };

    var list = this.state.list.map(function (item, index) {
      var itemKey = item[self.props.itemKey] || item;
      var itemClass = [self.props.itemClass, self.getPlaceholderClass(item), self.getSelectedClass(item)].join(' ');
      return React.createElement('div', {
        key: itemKey,
        className: itemClass,
        onMouseDown: self.itemDown.bind(self, item, index),
        onTouchStart: self.itemDown.bind(self, item, index),
      }, getPropsTemplate(item));
    });

    var targetClone = function () {
      if (self.state.held && self.state.dragged) {
        var itemKey = self.state.dragged.item[self.props.itemKey] || self.state.dragged.item;
        var itemClass = [self.props.itemClass, self.getDraggedClass(self.state.dragged.item), self.getSelectedClass(self.state.dragged.item)].join(' ');
        return React.createElement('div', {
          key: itemKey,
          className: itemClass,
          style: self.getDraggedStyle(self.state.dragged.item)
        }, getPropsTemplate(self.state.dragged.item));
      }
      return undefined;
    };

    return React.createElement('div', {
      className: this.props.listClass,
      onMouseDown: self.listDown,
      onTouchStart: self.listDown
    }, list, targetClone());
  }
});

export default Reorder;
