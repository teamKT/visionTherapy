  window.PatientInfo = React.createClass({

  deletePatient(){
    // this.props.deletePatient(this.props.patient_id)
    console.log("userid in deletePatient" + this.userid);
    $.ajax({
      method: "DELETE",
      url: `/doctors/${this.userid}/patients/${this.props.patient_id}`,
      dataType: 'json'
    }).then(function(doctor_patients){
      console.log("After delete: ", doctor_patients)
      this.props.deletePatient(doctor_patients)
    }.bind(this))
  },

  editPatient(){
    this.props.editPatient(this.props.patient_id) 

  },

  render(){
      return (
        <div>
          <h3>Name of Child: {this.props.childname} (User ID {this.props.patient_id})</h3>
          <h3>Name of parent:{this.props.parentname}</h3>
          <button onClick={this.deletePatient}>X</button>
          <button onClick={this.editPatient}>edit</button>
        </div>
      )
  }

  });

