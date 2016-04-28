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
    $.getJSON("/auth/userid").done(function(data){
      this.setState({patientid: data.childInfo.id, doctorid: data.childInfo.doctor_id});
      // request data for pt dashboard, how to get docor id from clientside?
      console.log('data pt id and doc id', data.childInfo)
      $.getJSON(`/doctors/${data.childInfo.doctor_id}/patients/${data.childInfo.id}`).then(function(plans) {
          this.setState({plans})
      }.bind(this),"json")
    }.bind(this),'json')
  },
  
  render(){
    var exerciseInfo = this.state.plans.map(function(exercise, index) {
      console.log("EXERCISE OBJ", exercise)
      return <ExerciseRow
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
  render(){
    var src = `/doctors/${this.props.doctor_id}/patients/${this.props.patient_id}/exercises/${this.props.exercise_id}`;
    return (
      <tr>
        <td>{this.props.index}</td>          
        <td><a href={src}>{this.props.exercise}</a></td>
        <td>{this.props.instructions}</td>
        <td>{this.props.comments}</td>
        <td>{this.props.outcome}</td>
      </tr>
    )
  }
});

ReactDOM.render(<PatientDash />, document.getElementById("patientDash"))