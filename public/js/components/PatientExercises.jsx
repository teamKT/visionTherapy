window.PatientExercises = React.createClass({
  
  deleteExercise(){
    $.ajax({
      method: "DELETE",
      url: `/doctors/${this.props.doctor_id}/patients/${this.props.patient_id}/exercises/${this.props.exercise_id}`,
      dataType: 'json'
    }).then(function(data){
      this.props.updateExercises()
    }.bind(this))
  },

  render(){
    return <div>
      <h4> Exercise Name: {this.props.name}
      <button className="btn btn-danger btn-xs pull-right" onClick={this.deleteExercise}>X</button>
      </h4>
    </div>  
  }
});