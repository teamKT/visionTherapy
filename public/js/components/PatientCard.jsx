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

    this.setState({doctor_patients: doctor_patients})
  },

  deletePatient(doctor_patients){
    this.setState({doctor_patients: doctor_patients})

  },

  handleChange(value){

  console.log('Value gotten back from the child: ' + value);
  debugger
    this.setState({
      childname: value
    });

  },
  
  render(){
    console.log("DOCTOR PATIENTS", this.state.doctor_patients)
    var patientInfo = this.state.doctor_patients.map(function(patient) {
      return <PatientInfo
          childname={patient.childname}
          username={patient.username}
          parentname={patient.parentname}
          patient_id={patient.id}
          key={patient.id}

          deletePatient={this.deletePatient}
          setVisibility={this.setVisibility}
          handleEditChange={this.handleEditChange}
          >
          <PatientInfoEdit
          editPatient={this.editPatient}
          />
          </PatientInfo>
        },this);

      return <div>{patientInfo}</div>
  }
});

ReactDOM.render(<PatientCard/>, document.getElementById("patientCard"))