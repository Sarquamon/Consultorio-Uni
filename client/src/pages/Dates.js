import React from "react";
import Axios from "axios";

import { useFormik } from "formik";
// import { signinSchema } from "../utils/formSchemas";

export const Dates = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    // validationSchema: signinSchema,

    onSubmit: async (values) => {
      try {
        const result = await Axios.post("http://localhost:9000/book", {
          ...values,
          jwt: localStorage.getItem("currentToken"),
        });
        console.log(result);
      } catch (e) {
        console.log("Error on request: ", e);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email Address</label>

        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="firstName">firstName</label>
        <input
          id="firstName"
          name="firstName"
          type="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="lastName">lastName</label>
        <input
          id="lastName"
          name="lastName"
          type="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
