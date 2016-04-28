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
      console.log("DATA: ", data)
      // request data for doctor dashboard
      $.getJSON(`/doctors/${data.userid}`).then(function(doctor_patients) {
          this.setState({doctor_patients})
          console.log("Initial Query: ",doctor_patients )
      }.bind(this),"json")
    }.bind(this),'json')
  },

  deletePatient(doctor_patients){
    this.setState({doctor_patients: doctor_patients})
  },

    editPatient(doctor_patients){
    this.setState({doctor_patients: doctor_patients})
  },


  handleChange(value,index){
        console.log("Parent Change: ", value)
        console.log("Index passed to Parent: ", index)
    var nextDoctorPatients = this.state.doctor_patients;
    var childnameIndex = nextDoctorPatients.findIndex((patient) =>{
        console.log("What is patient", patient)
      return patient.id === index 
    })

        console.log("childindex: ",childnameIndex)
        console.log("Item in the array: ", nextDoctorPatients[childnameIndex])
    nextDoctorPatients[childnameIndex].childname = value
        console.log("Parentname at Array Index: ", nextDoctorPatients[childnameIndex].parentname)
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