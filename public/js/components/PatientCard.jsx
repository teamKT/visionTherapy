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
      $.getJSON(`/doctors/${this.state.userid}`).then(function(doctor_patients) {
          this.setState({doctor_patients})
          console.log("Initial Query: ",doctor_patients )
      }.bind(this),"json")
    }.bind(this),'json')
  },

  deletePatient(doctor_patients){
    this.setState({doctor_patients: doctor_patients})
  },

    editPatient(childname, username, parentname, patient_id){
      console.log("Hi this is the PARENT before AJAX", childname, username, parentname)
      console.log("USERID:", this.state.userid)
      console.log("PatientID:", patient_id)

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
        console.log("Do we have SUCCESS?")
        this.setState({doctor_patients: doctor_patients});
      }.bind(this),
      error: function(status, err) {
        console.error( status, err.toString());
      }.bind(this)
    });
  },


  handleChange(value,index, fieldValue){
        console.log("Parent Change: ", value)
        console.log("Index passed to Parent: ", index)
    var nextDoctorPatients = this.state.doctor_patients;
    var childnameIndex = nextDoctorPatients.findIndex((patient) =>{
        console.log("What is patient", patient)
      return patient.id === index 
    })

        console.log("childindex: ",childnameIndex)
        console.log("Item in the array: ", nextDoctorPatients[childnameIndex])
    nextDoctorPatients[childnameIndex][fieldValue] = value
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