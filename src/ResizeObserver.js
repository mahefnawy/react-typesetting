import React from "react";

const style = {
  display: "block",
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  zIndex: -1,
  visibility: "hidden",
  pointerEvents: "none"
};

const expandStyle = {
  display: "block",
  position: "absolute",
  left: 0,
  top: 0,
  transition: "0s",
  width: 100000,
  height: 100000
};

const shrinkStyle = {
  display: "block",
  position: "absolute",
  left: 0,
  top: 0,
  transition: "0s",
  width: "200%",
  height: "200%"
};

export default class ResizeObserverComponent extends React.PureComponent {
  static displayName = "ResizeObserver";

  hostRef = React.createRef();
  expandRef = React.createRef();
  shrinkRef = React.createRef();

  resetScroll = ref => {
    this.ignoreEvents = true;
    ref.current.scrollTop = 100000;
    ref.current.scrollLeft = 100000;
    this.ignoreEvents = false;
  };

  reflow = () => {
    this.resetScroll(this.shrinkRef);
    this.resetScroll(this.expandRef);
    const { width, height } = this.hostRef.current.getBoundingClientRect();
    if (width !== this.lastWidth || height !== this.lastHeight) {
      this.lastWidth = width;
      this.lastHeight = height;
      this.props.onResize();
    }
  };

  handleScroll = () => {
    if (this.ignoreEvents) {
      return;
    }
    this.reflow();
  };

  componentDidMount() {
    this.resetScroll(this.expandRef);
    this.resetScroll(this.shrinkRef);
  }

  render() {
    return (
      <span style={style} ref={this.hostRef} onScroll={this.handleScroll}>
        <span ref={this.expandRef} style={style}>
          <span style={expandStyle} />
        </span>
        <span ref={this.shrinkRef} style={style}>
          <span style={shrinkStyle} />
        </span>
      </span>
    );
  }
}