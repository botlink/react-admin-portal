import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { submitFlight } from '../../actions/send';

const validateUUID = require('uuid-validate');

function validateFlightIds(id) {
  return validateUUID(id);
}

const Home = class extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <div className="input-group">
          <input
            placeholder={field.label}
            className="form-control"
            type="text"
            {...field.input}
          />
          
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </div>

        <div className="text-help">
            {field.meta.touched ? field.meta.error : ''}
          </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.submitFlight(values, () => {
      this.props.history.push('/success');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Flight ID"
            name="flightId"
            component={this.renderField}
          />
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  if (!values.flightId) {
    errors.flightId = "Enter a Flight ID";
  }
  if (validateFlightIds(values.flightId) === false) {
    errors.flightId = "Not a valid UUID";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'FlightID'
})(
  connect(null, { submitFlight })(Home)
);
