window.PatientInfo = React.createClass({
  getInitialState(){
    return {
      exercises: [],
      editVisibility: "hidden"
    }
  },

  componentWillMount(){

    $.getJSON(`/doctors/${this.props.patient_id}/ex`).done(function(exercises) {
      this.setState({exercises})
    }.bind(this),"json")
  },

  deletePatient(){
    // this.props.deletePatient(this.props.patient_id)
    console.log("userid in deletePatient" + this.props.userid);
    $.ajax({
      method: "DELETE",
      url: `/doctors/${this.props.userid}/patients/${this.props.patient_id}`,
      dataType: 'json'
    }).then(function(doctor_patients){
      console.log("After delete: ", doctor_patients)
      this.props.deletePatient(doctor_patients)
    }.bind(this))
  },

  editPatient(){
    this.props.editPatient(this.props.patient_id)
  },

  update(data){
    console.log(JSON.stringify(data));
    this.setState({
      exercises: data
    })
  },

  handleChange(event){
    console.log("Child change: " , event.target.value)
    console.log("Index: ", this.props.patient_id)
    this.props.onChildChange(event.target.value, this.props.patient_id)
  

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
          <div className="panel panel-default">
          <div className="panel-heading">
          <h3 className="panel-title">Name of Patient: <strong>{this.props.childname}</strong> (User ID {this.props.patient_id})</h3>
            <button className="btn btn-danger btn-xs pull-right" onClick={this.deletePatient}>Delete Patient</button>
            <button className="btn btn-default btn-xs pull-right open-modal" onClick={this.setVisibility}>edit patient</button>
            <a href={url}><button className="btn btn-info btn-xs pull-right">Add Exercise</button></a>
          <p>Name of Parent: {this.props.parentname}</p>

          <div>{patientExercises}</div>
            </div>

          <div>
            
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
                      <input type="text" onChange={this.handleChange} value={this.props.childname}></input>
                      <label htmlFor="">User Name: </label>
                      <input type="text" onChange={this.handleChange} defaultValue={this.props.username}></input>
                      <label htmlFor="">Parent: </label>
                      <input type="text" onChange={this.handleChange} value={this.props.parentname}></input>
                      <button type="submit">Submit</button>
                  </form>
                </div>

              </div>
            </div>
          </div>

          </div>
          <hr/>
        </div>
      )
  }
});

