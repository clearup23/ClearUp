import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../users/UserContext"; // Assuming you have a user context

export default function Admin() {
  const [users, setUsers] = useState([]);
  const { userDetails } = useUser(); // Get user details from context
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!userDetails) {
      // If user is not logged in, redirect to login page
      navigate("/Signin");
    } else {
      loadUsers();
    }
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/user/${id}`);
    loadUsers();
  };
  
  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  const students = users.filter(user => user.role.toLowerCase() === "student");
  const teachers = users.filter(user => user.role.toLowerCase() === "teacher");

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="py-4">
          <h2>Students</h2>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                {/* <th scope="col">Subject</th> */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  {/* <td>{student.subject}</td> */}
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(student.id)}
                      disabled={student.role.toLowerCase() === "admin"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="py-4">
  <h2>Teachers</h2>
  <table className="table border shadow">
    <thead>
      <tr>
        <th scope="col">S.N</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Subject</th>
        <th scope="col">Document</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {teachers.map((teacher, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{teacher.name}</td>
          <td>{teacher.email}</td>
          <td>{teacher.subject}</td>
          <td>
            {teacher.role.toLowerCase() === "teacher" && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => openDocument(teacher.document)}
                disabled={teacher.role.toLowerCase() === "admin"}
              >
                View Document
              </button>
            )}
          </td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteUser(teacher.id)}
              disabled={teacher.role.toLowerCase() === "admin"}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
</div>
  );
}