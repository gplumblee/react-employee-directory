import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function UserItem(props) {
  return (
    <tr>
      <td>
        <img src={props.employee.picture} />
      </td>
      <td>{props.employee.name}</td>
      <td>{props.employee.email}</td>
      <td>{props.employee.phone}</td>
      <td>{props.employee.age}</td>
    </tr>
  );
}

function App() {
  const url = "https://randomuser.me/api/?results=200&nat=us";
  // set up the state!
  const [employees, setEmployees] = useState([]);
  const [sorted, setSorted] = useState({ users: [] });
  const [order, setOrder] = useState(true);

  useEffect(() => {
    axios.get(url).then(response => {
      const data = response.data.results;
      const formattedData = data.map(function(item) {
        return {
          name: `${item.name.first} ${item.name.last}`,
          picture: item.picture.thumbnail,
          email: item.email,
          phone: item.phone,
          age: item.dob.age
        };
      });
      setEmployees(formattedData);
      setSorted({ users: formattedData });
    });
  }, []);

  useEffect(() => {
    console.log("sorted", sorted);
  }, [sorted]);

  const handleSort = val => {
    const sort = employees.sort((a, b) =>
      order
        ? a[val] > b[val]
          ? 1
          : a[val] < b[val]
          ? -1
          : 0
        : a[val] < b[val]
        ? 1
        : a[val] > b[val]
        ? -1
        : 0
    );
    setSorted({ users: sort });
    setOrder(!order);
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Employee Directory
        </a>
      </nav>
      <h6>Select Column to Sort</h6>
      <main className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th onClick={() => handleSort("name")} scope="col">
                Name
              </th>
              <th onClick={() => handleSort("email")} scope="col">
                Email
              </th>
              <th onClick={() => handleSort("phone")} scope="col">
                Phone
              </th>
              <th onClick={() => handleSort("age")} scope="col">
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.users.map(employee => (
              <UserItem employee={employee} />
            ))}
          </tbody>
        </table>
      </main>
    </React.Fragment>
  );
}

export default App;
