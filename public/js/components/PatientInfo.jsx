  window.PatientInfo = React.createClass({

    getInitialState(){
      return {
        patient_id: this.props.patient_id,
        childname: this.props.childname,
        username: this.props.username,
        parentname: this.props.parentname,
        editVisibility: "hidden",
        userid: ""

      }
    },

  componentWillMount(){
    // get id of current user from server
    $.getJSON("/auth/userid").done(function(data){
      this.setState({userid: data.userid})
      console.log("USERID at MOUNT in PatientInfo: ", this.state.userid)
    }.bind(this),'json')
  },

  deletePatient(){

    $.ajax({
      method: "DELETE",
      url: `/doctors/${this.state.userid}/patients/${this.props.patient_id}`,
      dataType: 'json'
    }).then(function(doctor_patients){
      this.props.deletePatient(doctor_patients)
    }.bind(this))
  },

  editPatient(){

    $.ajax({
      method: "PUT",
      url: `/doctors/${this.state.userid}/patients/${this.props.patient_id}`,
      data: {patient: {childname: this.props.childname, username: this.props.username, parentname: this.props.parentname}},
      dataType: 'json'
    }).then(function(doctor_patients){
      this.props.editPatient(doctor_patients)
    }.bind(this))

  },

  handleChange(event){

    this.props.onChange(event.target.value);
  },

  setVisibility(){
    if(this.state.editVisibility === "hidden") {
      this.setState({editVisibility: ""})      
    }
    else {
      this.setState({editVisibility: "hidden"})      
    }
  },

  render(){
      return (
        <div>
          <h3>Name of Child: {this.props.childname} (User ID {this.props.patient_id})</h3>
          <h3>Screen Name:{this.props.username}</h3>
          <h3>Name of parent:{this.props.parentname}</h3>
          <button className="btn btn-default" onClick={this.deletePatient}>delete</button>
          <div>
            <a href="#" className="btn btn-default open-modal" onClick={this.setVisibility}>edit</a>
            <div className={"modal-dialog " + this.state.editVisibility}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn btn-default pull-right" data-dismiss="modal" 
                  onClick={this.setVisibility}>Close</button>
                  <h4 className="modal-title">Edit Patient {this.props.childname} (ID: {this.props.patient_id})</h4>
                </div>
                <div className="modal-body">
                    <form onSubmit={this.editPatient}>
                      <label htmlFor="">Patient: </label>
                      <input type="text" name="childname" onChange={this.handleChange} value={this.props.childname}></input>
                      <label htmlFor="">User Name: </label>
                      <input type="text" name="username" onChange={this.handleChange} value={this.props.username}></input>
                      <label htmlFor="">Parent: </label>
                      <input type="text" name="parentname" onChange={this.handleChange} value={this.props.parentname}></input>
                      <button type="submit">Submit</button>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>   
      );
  }
});
