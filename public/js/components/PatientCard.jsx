window.PatientCard = React.createClass({
  getInitialState(){
    return {
      doctor_patients: []
    }
  },

  componentWillMount(){
    // ID still hardcoded
    $.getJSON("/doctors/1").then(function(doctor_patients){
    console.log(JSON.stringify(doctor_patients));
      this.setState({doctor_patients})
    }.bind(this),"json")
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