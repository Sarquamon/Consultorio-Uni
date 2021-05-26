import React from "react";
import Axios from "axios";

import { useFormik } from "formik";
import { signinSchema } from "../utils/formSchemas";

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,

    onSubmit: async (values) => {
      try {
        const result = await Axios.post("http://localhost:9000/login", values);
        console.log(result);
        localStorage.setItem("currentToken", result.data.token);
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
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
