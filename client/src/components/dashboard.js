import React, { Component } from 'react';
import Gantt from './gantt';
import '../css/dashboard.css';
import Calendar from 'react-calendar';

var data = {
  data: [
    {id: 1, text: '打東東', start_date: '01-07-2017', duration: 3, progress: 0.6},
    {id: 2, text: '耍廢', start_date: '03-07-2017', duration: 3, progress: 0.4}
  ],
  links: [
    {id: 1, source: 1, target: 2, type: '0'}
  ]
};


export default class DashBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
		}
	}

	onChange = date => this.setState({ date });

	handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  addTodo = (e) => {
    if(e.which === 13 || e.keyCode === 13) {
			this.props.addTodo(e.target.value);
      this.setState({
        text: '',
      })
    }
  }

  render() {
    return (
			<div className="dashboard-wrapper">
				<div className="gantt-container">
					<Gantt tasks={data}/>
				</div>
				<div className="bottom-part">
					<div className="Calendar-container">
						<Calendar onChange={this.onChange} value={this.state.date} />
					</div>
					<div className="next_meeting">
						<h3>暑 假 倒 數 </h3>
						<span>{this.state.date.getDate()}</span>
						<p> days </p>
					</div>

					<div className="next_todos">
            <h3>本週待辦</h3>
            <div className="todos">
              <ul>
                {this.props.todos.map(todo => <li>{todo}</li>)}
              </ul>
              </div>
            <input className="todo-input" type="text" value={this.state.text} placeholder="add a goal" onChange={this.handleChange} onKeyPress={this.addTodo}></input>
          </div>
				</div>

			</div>
    );
  }
}