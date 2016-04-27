window.PatientInfoEdit = React.createClass({

  getInitialState(){
    return {
      userid: "",
      editVisibility: "hidden"
    }

  },


  editPatient(){

    $.ajax({
      method: "PATCH",
      url: `/doctors/${this.userid}/patients/${this.props.patient_id}`,
      dataType: 'json'
    }).then(function(doctor_patients){
      this.props.editPatient(doctor_patients)
    }.bind(this))

  },

  setVisibility(){
    if(this.state.editVisibility === "hidden") {
      this.setState({editVisibility: ""})      
    }
    else {
      this.setState({editVisibility: "hidden"})      
    }
  },


  render(){
    console.log("USERID at RENDER: ",this.state.userid)
    return (
      <div>
        <a href="#" className="btn btn-default open-modal" onClick={this.setVisibility}>edit</a>

            <div className={"modal-dialog " + this.state.editVisibility}>
              <div className="modal-content">
                  <div className="modal-header">
                      <button type="button" className="close" >&times;</button>
                      <h4 className="modal-title">Modal title</h4>
                  </div>
                  <div className="modal-body">
                      <h1>Edit Patient Info:</h1>
                      <form onSubmit={this.editPatient}>
                        <input type="text" onChange= {this.handleChange} value={this.state.childname}></input>
                        
          
                     </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.setVisibility}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
              </div>
            </div>

      </div>
      );
  }

});






