window.PatientCard = React.createClass({
  getInitialState(){
    return {
      doctor_patients: []
    }
  },

  componentWillMount(){
    // get id of current user from server
    $.getJSON("/auth/userid").done(function(data){
      this.setState({userid: data.userid})
      console.log("USERID from DATA: ", data.userid)
      console.log("USERID on MOUNT: ", this.state.userid)
      // request data for doctor dashboard
      $.getJSON(`/doctors/${data.userid}`).then(function(doctor_patients) {
          this.setState({doctor_patients})
      }.bind(this),"json")
    }.bind(this),'json')
  },

  addPatient(event){

  },

  deletePatient(doctor_patients){
    this.setState({doctor_patients: doctor_patients})
  },

  addExercise(event){

  },

  handleChange(){
    this.setState({childname: this.state.childname})

  },

  removeExercise(event){

  },
  
  render(){
    var patientInfo = this.state.doctor_patients.map(function(patient) {
      return <PatientInfo
          childname={patient.childname}
          parentname={patient.parentname}
          key={patient.id}
          editPatient={this.editPatient}
          deletePatient={this.deletePatient}
          patient_id={patient.id}
          doctor_id={patient.doctor_id}
          userid={this.state.userid}
          />
        },this);

      return <div>{patientInfo}</div> 
  }
});

ReactDOM.render(<PatientCard/>, document.getElementById("patientCard"))