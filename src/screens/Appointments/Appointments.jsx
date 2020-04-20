import React, { Component } from "react";
import axios from "axios";
import { AppointmentForm } from "./AppointmentForm";
import moment from "moment";
import Joi from "joi";
import Pagination from "../../components/Pagination";

require("react-datetime");

export default class Appointments extends Component {
  state = {
    appointments: [],
    doctors: [],
    appointment: {
      patient_name: "",
      patient_phone: "",
      booked_date: "",
      booked_time: "",
      doctor_id: "",
    },
  };

  async componentDidMount() {
    const { data: appointments } = await axios.get(
      `http://localhost:3000/api/appointments/all`
    );

    const { data: doctors } = await axios.get(
      `http://localhost:3000/api/doctors/all`
    );

    this.setState({ appointments, doctors });

    console.log(this.state);
  }

  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  handleChange = ({ currentTarget: input }) => {
    const { appointment } = this.state;
    appointment[input.name] = input.value;
    this.setState({ appointment });
    console.log(this.state.appointment);
  };

  handleDateChange = ({ currentTarget: input }) => {
    const { appointment } = this.state;
    appointment[input.name] = input.value;
    var now = moment().format("YYYY-MM-DD");
    let app_date = appointment.booked_date;
    // this.setState({ appointment });

    if (moment(app_date).isBefore(now)) {
      alert("cannot choose past dates! are you crazy?");
      return;
    } else {
      this.setState({ appointment });
    }
  };

  handleDropdownChange = (e) => {
    let { appointment } = this.state;
    appointment.doctor_id = this.state.doctors[
      e.currentTarget.options.selectedIndex - 1
    ].id;

    console.log(e.currentTarget.options);
    this.setState({ appointment });
    console.log(this.state.appointment);
  };

  handleSubmit = async (e) => {
    let { appointment } = this.state;
    e.preventDefault();

    const scheama = {
      patient_name: Joi.string().required().min(3),
      patient_phone: Joi.string().min(8).max(11).required(),
      booked_time: Joi.required(),
      booked_date: Joi.date().required(),
      doctor_id: Joi.number().greater(0).required(),
    };

    const isValid = Joi.validate(appointment, scheama);
    if (isValid.error) {
      alert(isValid.error.details[0].message);
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:3000/api/appointments/create",
        appointment
      );

      alert(
        `Successfully created the appointmnet for patient ${appointment.patient_name}` +
          ` on ${appointment.booked_date} at ${appointment.booked_time} ` +
          ` for ${appointment.doctor_id}`
      );
      let { appointments } = this.state;

      appointments.push(result.data[0]);

      appointment = {
        patient_name: "",
        patient_phone: "",
        booked_date: "",
        booked_time: "",
        doctor_id: "",
      };
      this.setState({ appointment });
      console.log(this.state);
    } catch (error) {
      console.log(error);
      alert(error.message); //if status 400 it comes to the error
    }
  };

  handleCancle = async (e) => {
    const values = {
      id: e.currentTarget.id,
      status: "cancle",
    };
    try {
      const { data: result } = await axios.post(
        "http://localhost:3000/api/appointments/status",
        values
      );
      console.log(result);
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  handleHold = async (e) => {
    const values = {
      id: e.currentTarget.id,
      status: "hold",
    };
    try {
      const { data: result } = await axios.post(
        "http://localhost:3000/api/appointments/status",
        values
      );
      console.log(result);
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <AppointmentForm
              handleChange={this.handleChange}
              handleDropdownChange={this.handleDropdownChange}
              handleSubmit={this.handleSubmit}
              handleDateChange={this.handleDateChange}
              doctors={this.state.doctors}
            />
          </div>
          <div className="col-md-6">
            <div className=" row" style={{ justifyContent: "center" }}>
              {this.state.appointments.length === 0 ? (
                <h1 className="display-3">No Appointments </h1>
              ) : (
                <AppointmentArray
                  appointmentArray={this.state.appointments}
                  handleEdit={this.handleEdit}
                  handleCancle={this.handleCancle}
                  handleHold={this.handleHold}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const AppointmentArray = ({
  appointmentArray,
  handleEdit,
  handleCancle,
  handleHold,
}) => {
  return (
    <React.Fragment>
      {appointmentArray.map((a) => (
        <div
          className="card m-2"
          style={{
            width: " 18rem",
          }}
          key={a.id}
        >
          <div className="card-body">
            <div className="row">
              <h5 className="card-title m-1">
                {/* {a.booked_date.slice(0, 10)} */}
                {moment(
                  `${a.booked_date.slice(0, 10)} ${a.booked_time}`
                ).format("LLL")}
              </h5>
            </div>
            <p className="card-text">{a.patient_name}</p>
            <div className="button-group">
              <button
                className="btn btn-info m-1"
                onClick={handleEdit}
                id={a.id}
              >
                edit
              </button>
              <button
                className="btn btn-dark m-1"
                onClick={handleHold}
                id={a.id}
              >
                hold
              </button>
              <button
                className="btn btn-danger m-1"
                onClick={handleCancle}
                id={a.id}
              >
                cancle
              </button>
            </div>
          </div>
        </div>
      ))}
      <Pagination />
    </React.Fragment>
  );
};
