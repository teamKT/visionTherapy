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
      $.getJSON(`/doctors/${data.userid}`).then(function(doctor_patients) {
          this.setState({doctor_patients})
      }.bind(this),"json")
    }.bind(this),'json')
  },


  addPatient(event){

  },

  removePatient(event){

  },
  addExercise(event){

  },

  removeExercise(event){

  },
  
  render(){
    console.log("DOCTOR PATIENTS", this.state.doctor_patients)
    var patientInfo = this.state.doctor_patients.map(function(patient) {
      return <PatientInfo
          childname={patient.childname}
          parentname={patient.parentname}
          index={patient.id}
          key={patient.id}
          />
        },this);


      return <div>{patientInfo}</div>
  
  }
});

ReactDOM.render(<PatientCard/>, document.getElementById("patientCard"))