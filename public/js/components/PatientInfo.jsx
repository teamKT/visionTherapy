window.PatientInfo = React.createClass({
  getInitialState(){
    return {
      exercises: []
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
            <button className="btn btn-default btn-xs pull-right" onClick={this.editPatient}>edit patient</button>
            <a href={url}><button className="btn btn-info btn-xs pull-right">Add Exercise</button></a>
          <p>Name of Parent: {this.props.parentname}</p>

          <div>{patientExercises}</div>
            </div>
          </div>
          <hr/>
        </div>
      )
  }
});

