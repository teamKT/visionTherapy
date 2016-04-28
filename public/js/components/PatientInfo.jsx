window.PatientInfo = React.createClass({
  getInitialState(){
    return {
      exercises: [],
      editVisibility: "hidden"
    }
  },

  componentWillMount(){

    $.getJSON(`/doctors/${this.props.patient_id}/ex`).done(function(exercises) {
      this.setState({exercises})
    }.bind(this),"json")
  },

  deletePatient(){
    // this.props.deletePatient(this.props.patient_id)
    console.log("userid in deletePatient" + this.props.userid);
    $.ajax({
      method: "DELETE",
      url: `/doctors/${this.props.userid}/patients/${this.props.patient_id}`,
      dataType: 'json'
    }).then(function(doctor_patients){
      console.log("After delete: ", doctor_patients)
      this.props.deletePatient(doctor_patients)
    }.bind(this))
  },

  editPatient(event){
    event.preventDefault();
console.log("All the Worlds PROPS: ", this.props.patient_id, this.props.childname,this.props.username,this.props.parentname)
    this.props.editPatient(this.props.childname,this.props.username,this.props.parentname,this.props.patient_id)

    // $.ajax({
    //   method: "PUT",
    //   url: `/doctors/${this.props.userid}/patients/${this.props.patient_id}`,
    //   dataType: 'json',
    //   data: {patient: {
    //     childname: this.state.childname,
    //     username: this.state.username,
    //     parentname: this.state.parentname}}
    // }).then(function(doctor_patients){
    //   console.log("Return from PUT: ",doctor_patients )
    //   this.props.editPatient(doctor_patients)
    //   // this.setVisibility()

    // }.bind(this))

  },

  update(){
    $.getJSON(`/doctors/${this.props.patient_id}/ex`).done(function(exercises) {
      this.setState({exercises})
    }.bind(this),"json")
  },


  setVisibility(){
    if(this.state.editVisibility === "hidden") {
      this.setState({editVisibility: ""})      
    }
    else {
      this.setState({editVisibility: "hidden"})      
    }
  },

  handleChildname(event){

    this.props.onChildChange(event.target.value, this.props.patient_id)
  
  },

  handleParentname(event){

    this.props.onChildChange(event.target.value, this.props.patient_id)
  
  },

  handleUsername(event){

    this.props.onChildChange(event.target.value, this.props.patient_id)
  
  },
  render(){

    var patientExercises = this.state.exercises.map(function(exercise, index) {
      return <PatientExercises
          name={exercise.name}
          key={index}
          doctor_id={this.props.doctor_id}
          patient_id={this.props.patient_id}
          exercise_id={exercise.id}
          updateExercises={this.update}
          />
    },this);

    var url = `/doctors/${this.props.doctor_id}/patients/${this.props.patient_id}/exercises/new` 

      return (
        <div>
          <div className="panel panel-default">
          <div className="panel-heading">
          <h3 className="panel-title">Name of Patient: <strong>{this.props.childname}</strong> (User ID {this.props.patient_id})</h3>
            <button className="btn btn-danger btn-xs pull-right" onClick={this.deletePatient}>Delete Patient</button>
            <button className="btn btn-default btn-xs pull-right open-modal" onClick={this.setVisibility}>edit patient</button>
            <a href={url}><button className="btn btn-info btn-xs pull-right">Add Exercise</button></a>
          <p>Name of Parent: {this.props.parentname}</p>

          <div>{patientExercises}</div>
            </div>

          <div>
            
            <div className={"modal-dialog " + this.state.editVisibility}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn btn-default pull-right" data-dismiss="modal" 
                  onClick={this.setVisibility}>Close</button>
                  <h4 className="modal-title">Edit Patient {this.props.childname} (ID: {this.props.patient_id})</h4>
                </div>
                <div className="modal-body">
                    <form className="form-horizontal" onSubmit={this.editPatient}>
                      <div className="form-group">

                      <label htmlFor="">Patient: </label>
                      <input  name="[patient]childname" type="text" className="form-control input-lg"  
                      onChange={this.handleChildname} value={this.props.childname}></input>

                      <label htmlFor="">User Name: </label>
                      <input  name="[patient]username" type="text" className="form-control input-lg"  
                      onChange={this.handleUsername} value={this.props.username}></input>

                      <label htmlFor="">Parent: </label>
                      <input name="[patient]parentname" type="text" className="form-control input-lg"  
                      onChange={this.handleParentname} value={this.props.parentname}></input>

                      <input name="[patient]id" type="hidden" className="form-control input-lg"  
                      onChange={this.handleChange} value={this.props.id}></input>
                      <button type="submit" className="btn btn-default">Submit</button>
                      </div>
                  </form>
                </div>

              </div>
            </div>
          </div>

          </div>
          <hr/>
        </div>
      )
  }
});

