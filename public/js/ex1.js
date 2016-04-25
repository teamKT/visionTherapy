window.Ex1 = React.createClass({
  getInitialState() {
    return { marginLeft: "-250px", value: "0" }
  },
  handleSlider: function(e) {
    var offset = Number(e.target.value);
    var newMargin = String(-250 + offset) + "px";
    this.setState({
      marginLeft: newMargin,
      value: e.target.value
    });
  },
  componentDidMount: function(){
    ReactDOM.findDOMNode(this.refs.slider).focus();
  },
  render() {
    var style = {
      'marginLeft': this.state.marginLeft
    }
    return (
      <div id="innerContain">
        <div id="ex_name">Red-Green Tranaglyphs: Sliding</div>
        <div id="ex_contain">
          <img  className="tranaglyph" id="red" src="/images/redCircle.png" alt="redCircle.png"/>
          <img style={style} className="tranaglyph" id="green" src="/images/greenCircle.png" alt="greenCircle.png"/>
        </div>
        <form id="slider">
          <span>Closer </span>
          <input id ="difficulty" ref="slider" type="range" name="difficulty" min="0" max="250" step="5" value={this.state.value} onChange={this.handleSlider} />
          <span> Further </span>
        </form>
      </div>
    )
  }
});

ReactDOM.render(<Ex1 />, document.getElementById("container"));

// #ex_name Red-Green Sliding Tranaglyph

// #ex_contain
//   img(id="red", class="tranaglyph", src="/images/redCircle.png", alt="redCircle.png")
//   img(id="green", class="tranaglyph", src="/images/greenCircle.png", alt="greenCircle.png")

// form(id="slider")
//   span Closer 
//   input(type="range", name="difficulty", min="0", max="25", step="1", value="0") 
//   span  Further