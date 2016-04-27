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
        <div className="patientInfo">
          <h3>Name of Patient: {this.props.childname} (User ID {this.props.patient_id})</h3>
          <h3>Name of Parent: {this.props.parentname}</h3>
          <button onClick={this.deletePatient}>X</button>
          <button onClick={this.editPatient}>edit patient</button>
          <a href={url}>add exercise</a>
          <div>{patientExercises}</div>
          <hr/>
        </div>
      )
  }
});

