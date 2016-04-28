window.PatientCard = React.createClass({
  getInitialState(){
    return {
      doctor_patients: []
   
    }
  },

  componentWillMount(){
    // get id of current user from server
    $.getJSON("/auth/get_doctor_id").done(function(data){
      this.setState({userid: data.id})
      // request data for doctor dashboard
      $.getJSON(`/doctors/${this.state.userid}`).then(function(doctor_patients) {
          this.setState({doctor_patients})
      }.bind(this),"json")
    }.bind(this),'json')
  },

  deletePatient(doctor_patients){
    this.setState({doctor_patients: doctor_patients})
  },

    editPatient(childname, username, parentname, patient_id){

        $.ajax({
      method: "PUT",
      url: `/doctors/${this.state.userid}/patients/${patient_id}`,
      dataType: 'json',
      data: {patient: {
        childname: childname,
        username: username,
        parentname: parentname}},
      cache: false,
      success: function(doctor_patients) {
        this.setState({doctor_patients: doctor_patients});
      }.bind(this),
      error: function(status, err) {
      }.bind(this)
    });
  },


  handleChange(value,index, fieldValue){
    var nextDoctorPatients = this.state.doctor_patients;
    var childnameIndex = nextDoctorPatients.findIndex((patient) =>{
      return patient.id === index 
    })

    nextDoctorPatients[childnameIndex][fieldValue] = value
    this.setState({doctor_patients: nextDoctorPatients});
  },

  removeExercise(event){

  },
  
  render(){
    var patientInfo = this.state.doctor_patients.map(function(patient) {
      return <PatientInfo
          childname={patient.childname}
          parentname={patient.parentname}
          username={patient.username}
          key={patient.id}
          deletePatient={this.deletePatient}
          patient_id={patient.id}
          doctor_id={patient.doctor_id}
          userid={this.state.userid}
          onChildChange={this.handleChange}
          editPatient={this.editPatient}
          />
        },this);

      return <div>{patientInfo}</div> 
  }
});

ReactDOM.render(<PatientCard/>, document.getElementById("patientCard"))