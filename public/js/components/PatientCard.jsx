window.PatientCard = React.createClass({
  getInitialState(){
    return {
      doctor_patients: [],
      userid: ""
    }
  },

  componentWillMount(){
    // get id of current user from server
    $.getJSON("/auth/userid").done(function(data){
  
      this.setState({userid: data.userid})
      // request data for doctor dashboard
      console.log("USERID at MOUNT: ", this.state.userid)
      $.getJSON(`/doctors/${this.state.userid}`).then(function(doctor_patients) {
          this.setState({doctor_patients})
      }.bind(this),"json")
    }.bind(this),'json')
  },

  editPatient(doctor_patients){

<<<<<<< HEAD
  editPatient(doctor_patients){

    this.setState({doctor_patients: doctor_patients})

=======
    this.setState({doctor_patients: doctor_patients})
>>>>>>> 5fc73d6679aad3e72f8153449dd96ddc24a0a554
  },

  deletePatient(doctor_patients){
    this.setState({doctor_patients: doctor_patients})
  },

<<<<<<< HEAD

  handleChange(value){

=======
  handleChange(value){

>>>>>>> 5fc73d6679aad3e72f8153449dd96ddc24a0a554
  console.log('Value gotten back from the child: ' + value);
  debugger
    this.setState({
      childname: value
    });

  },
  
  render(){
    var patientInfo = this.state.doctor_patients.map(function(patient) {
      return <PatientInfo
          childname={patient.childname}
          username={patient.username}
          parentname={patient.parentname}
          key={patient.id}
<<<<<<< HEAD

          editPatient={this.editPatient}
          deletePatient={this.deletePatient}
          patient_id={patient.id}
          doctor_id={patient.doctor_id}

          deletePatient={this.deletePatient}
          setVisibility={this.setVisibility}
          handleEditChange={this.handleEditChange}
          >
          <PatientInfoEdit
          editPatient={this.editPatient}
=======
>>>>>>> 5fc73d6679aad3e72f8153449dd96ddc24a0a554

          deletePatient={this.deletePatient}
          setVisibility={this.setVisibility}
          handleEditChange={this.handleEditChange}
          >
          <PatientInfoEdit
          editPatient={this.editPatient}
          />
          </PatientInfo>
        },this);

<<<<<<< HEAD

      return <div>{patientInfo}</div> 

=======
      return <div>{patientInfo}</div>
>>>>>>> 5fc73d6679aad3e72f8153449dd96ddc24a0a554
  }
});

ReactDOM.render(<PatientCard/>, document.getElementById("patientCard"))