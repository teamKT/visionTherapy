window.PatientDash = React.createClass({
  getInitialState(){
    return {
      plans: [],
      userid: "",
      doctorid: ""
    }
  },
  componentWillMount(){
    // get id's from currentUser helper
    $.getJSON("/auth/get_patient_id").done(function(data){
      this.setState({patientid: data.childInfo.id, doctorid: data.childInfo.doctor_id});
      $.getJSON(`/doctors/${data.childInfo.doctor_id}/patients/${data.childInfo.id}`).then(function(plans) {
          this.setState({plans})
      }.bind(this),"json")
    }.bind(this),'json')
  },
  updateState(){
    $.getJSON("/auth/get_patient_id").done(function(data){
      this.setState({patientid: data.childInfo.id, doctorid: data.childInfo.doctor_id});
      $.getJSON(`/doctors/${data.childInfo.doctor_id}/patients/${data.childInfo.id}`).then(function(plans) {
          this.setState({plans})
      }.bind(this),"json")
    }.bind(this),'json')
  },
  render(){
    var exerciseInfo = this.state.plans.map(function(exercise, index) {
      return <ExerciseRow
          plan_id={exercise.plan_id}
          patient_id={exercise.patient_id}
          doctor_id={exercise.doctor_id}
          exercise_id={exercise.id}
          date={exercise.childname}
          created_at={exercise.created_at}
          exercise={exercise.name}
          instructions={exercise.routine}
          comments={exercise.parent_comments}
          outcome={exercise.outcome}
          index={1+index}
          key={exercise.created_at}
          updateState={this.updateState}
          />
        },this);
    return (
      <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Exercise</th>
          <th>Instructions</th>
          <th>Parent Comments</th>
          <th>Outcome</th>
        </tr>
      </thead>
      <tbody>{exerciseInfo}</tbody>
    </table>
    )
  }
});
          
window.ExerciseRow = React.createClass({
  updateComment(event){
    event.preventDefault();
    var comment = event.target.previousSibling.value;
    $.ajax({
      method: "PUT",
      url: `/doctors/${this.props.doctor_id}/patients/${this.props.patient_id}/plans/${this.props.plan_id}/parentComment`,
      dataType: 'json',
      data: {
       comment: comment 
     },
      cache: false,
      success: function(doctor_patients) {
        this.props.updateState();
      }.bind(this),
      error: function(status, err) {
        console.error( status, err.toString());
      }.bind(this)
    });
  },
  updateOutcome(event) {
    event.preventDefault();
    var outcome = event.target.previousSibling.value;
    $.ajax({
      method: "PUT",
      url: `/doctors/${this.props.doctor_id}/patients/${this.props.patient_id}/plans/${this.props.plan_id}/outcome`,
      dataType: 'json',
      data: {
       outcome: outcome 
     },
      cache: false,
      success: function(doctor_patients) {
        this.props.updateState();
      }.bind(this),
      error: function(status, err) {
        console.error( status, err.toString());
      }.bind(this)
    });
  },
  render(){
    var commentCode = this.props.comments ? <td>{this.props.comments}</td> : <td><form><textarea ref="comment" rows="3" cols="40" placeholder="Enter any extra comments or concerns."></textarea><input onClick={this.updateComment} type="submit" value="submit"/></form></td>
    var outcomeCode = this.props.outcome ? <td>{this.props.outcome}</td> : <td><form><textarea rows="3" cols="40" placeholder="Describe highest difficulty and total # of rounds completed within alotted time."></textarea><input onClick={this.updateOutcome} type="submit" value="submit"/></form></td>
    var src = `/doctors/${this.props.doctor_id}/patients/${this.props.patient_id}/exercises/${this.props.exercise_id}`;
    return (
      <tr>
        <td>{this.props.index}</td>          
        <td><a href={src}>{this.props.exercise}</a></td>
        <td>{this.props.instructions}</td>
        {commentCode}
        {outcomeCode}
      </tr>
    )
  }
});

ReactDOM.render(<PatientDash />, document.getElementById("patientDash"))