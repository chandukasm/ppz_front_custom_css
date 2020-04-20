import React from "react";
//use Joi to validate the input in the front end , don tuse backends validation
export const AppointmentForm = ({
  handleChange,
  handleDropdownChange,
  handleSubmit,
  handleDateChange,
  doctors,
}) => {
  // const doctors = [
  //   { id: 15, f_name: "test4" },
  //   { id: 16, f_name: "chanduka" },
  //   { id: 17, f_name: "sameera" },
  //   { id: 18, f_name: "shanilka" },
  // ];
  return (
    <div>
      <div
        className="jumbotron m-2"
        style={{
          background: "transparent",
          backgroundColor: "teal",
          color: "white",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2>create appointment</h2>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">patient name</label>
              <input
                type="text"
                class="form-control"
                placeholder="patient name"
                name="patient_name"
                onChange={handleChange}
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">phone number</label>
              <input
                type="text"
                class="form-control"
                name="patient_phone"
                placeholder="patient's phone number"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputAddress">scheduled date</label>
              <input
                type="date"
                class="form-control"
                name="booked_date"
                onChange={handleDateChange}
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputAddress2">scheduled time</label>
              <input
                type="time"
                class="form-control"
                name="booked_time"
                placeholder="Apartment, studio, or floor"
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputState">Doctor</label>

              <select
                id="inputState"
                class="form-control"
                onChange={handleDropdownChange}
              >
                <option value="" selected disabled>
                  select a doctor
                </option>
                {doctors.map((d) => (
                  <option accessKey={d.id} key={d.id}>
                    {d.f_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">
            create appointment
          </button>
        </form>
      </div>
    </div>
  );
};
