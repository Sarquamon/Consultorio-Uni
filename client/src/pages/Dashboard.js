import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalMonthDates, setTotalMonthDates] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalDatesForToday, setTotalDatesForToday] = useState(0);
  const [totalRegisteredPatients, setTotalRegisteredPatients] = useState(0);
  const [allTodayDates, setAllTodayDates] = useState([]);
  const getDashboardValues = async () => {
    try {
      const totalDoctors = await Axios.get(
        "http://localhost:9000/getTotalDoctors"
      );
      const totalMonthDates = await Axios.get(
        "http://localhost:9000/getMonthDates"
      );
      const totalDatesForToday = await Axios.get(
        "http://localhost:9000/getTotalDatesForToday"
      );
      const totalRegisteredPatients = await Axios.get(
        "http://localhost:9000/getRegisteredPatients"
      );
      const allTodayDates = await Axios.get(
        "http://localhost:9000/getAlltodayDates"
      );
      setTotalDoctors(totalDoctors.data.totalDoctors);
      setTotalMonthDates(totalMonthDates.data.totalDates);
      setTotalDatesForToday(totalDatesForToday.data.totalDates);
      setTotalRegisteredPatients(totalRegisteredPatients.data.totalUsers);
      setTotalRegisteredPatients(totalRegisteredPatients.data.totalUsers);
      setAllTodayDates(allTodayDates.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDashboardValues();
  }, []);

  return (
    <>
      {isLoading ? null : (
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Panel de control</h1>
          </div>

          <div className="row">
            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Citas del mes
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {totalMonthDates}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Citas del día
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {totalDatesForToday}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Pacientes Registrados
                      </div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                            {totalRegisteredPatients}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Pending Requests Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Doctores Registrados
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {totalDoctors}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-comments fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1 row end */}
          <div className="row">
            {/* <!-- Area Chart --> */}
            <div className="col-xl-8 col-lg-7">
              <div className="card shadow mb-4">
                {/* <!-- Card Header - Dropdown --> */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    {console.log(allTodayDates)}
                    Citas del día
                  </h6>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing="0"
                    >
                      <thead>
                        <tr>
                          <th>Paciente</th>
                          <th>Hora</th>
                          <th>Doctor</th>
                          <th>Total</th>
                          <th>Deuda Restante</th>
                          <th>Saldo</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>Paciente</th>
                          <th>Hora</th>
                          <th>Doctor</th>
                          <th>Total</th>
                          <th>Deuda Restante</th>
                          <th>Saldo</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {/* ! CHANGE THIS FOR A MAP COMMING FROM API */}
                        <tr>
                          <td>Tiger Nixon</td>
                          <td>System Architect</td>
                          <td>Edinburgh</td>
                          <td>61</td>
                          <td>2011/04/25</td>
                          <td>$320,800</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Pie Chart --> */}
            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4">
                {/* <!-- Card Header - Dropdown --> */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Deudas por vencer
                  </h6>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing="0"
                    >
                      <thead>
                        <tr>
                          <th>Paciente</th>
                          <th>Fecha limite</th>
                          <th>Deuda Restante</th>
                          <th>Saldo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* ! CHANGE THIS FOR A MAP COMMING FROM API */}
                        <tr>
                          <td>Tiger Nixon</td>
                          <td>System Architect</td>
                          <td>Edinburgh</td>
                          <td>61</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 row end */}
        </div>
      )}
    </>
  );
};
