  window.PatientInfo = React.createClass({

  render(){
      return (
        <div>
          <h3>Name of Child: {this.props.childname}</h3>
          <h3>Name of parent:{this.props.parentname}</h3>
          <button onClick={this.removePatient}>X</button>
        </div>
      )
  }

  });

