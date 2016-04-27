window.PatientInfo = React.createClass({

  componentWillMount(){
    // get id of current user from server
    $.getJSON("/auth/userid").done(function(data){
      this.setState({userid: data.userid})
      console.log("USERID at MOUNT in PatientInfo: ", this.state.userid)
    }.bind(this),'json')

    $.getJSON(`/doctors/${this.props.patient_id}/ex`).done(function(exercises) {
      this.setState({exercises})
    }.bind(this),"json")
  },


  getInitialState(){
      return {
        exercises: [],
        patient_id: this.props.patient_id,
        childname: this.props.childname,
        username: this.props.username,
        parentname: this.props.parentname,
        editVisibility: "hidden",
        userid: ""

      }
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

  update(data){
    console.log(JSON.stringify(data));
    this.setState({
      exercises: data
    })
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

    var patientExercises = this.state.exercises.map(function(exercise, index) {
      return <PatientExercises
          name={exercise.name}
          key={index}
          doctor_id={this.props.doctor_id}
          patient_id={this.props.patient_id}
          exercise_id={exercise.id}
          updateExercises={this.update}
          />
    },this);

    var url = `/doctors/${this.props.doctor_id}/patients/${this.props.patient_id}/exercises/new` 

      return (
        <div>
          <h3>Name of Child: {this.props.childname} (User ID {this.props.patient_id})</h3>
          <h3>Name of Parent: {this.props.parentname}</h3>
          <button onClick={this.deletePatient}>X</button>
          <button onClick={this.editPatient}>edit patient</button>
          <a href={url}>add exercise</a>
          <div>{patientExercises}</div>
          <hr/>

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
