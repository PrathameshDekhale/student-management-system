import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const API = "http://localhost:5000/api/students";

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [markForm, setMarkForm] = useState({
    studentId: "",
    subject: "",
    score: "",
  });

  const [editingId, setEditingId] = useState(null);

  const loadStudents = async () => {
  const res = await axios.get(
    `${API}?page=${page}&limit=5`
  );

  setStudents(res.data.students);
  setTotalPages(res.data.totalPages);
};

  useEffect(() => {
  loadStudents();
}, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API, form);
      }

      setForm({
        name: "",
        email: "",
        age: "",
      });

      loadStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const addMark = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/marks",
        {
          studentId: Number(markForm.studentId),
          subject: markForm.subject,
          score: Number(markForm.score),
        }
      );

      setMarkForm({
        studentId: "",
        subject: "",
        score: "",
      });

      loadStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);

    setForm({
      name: student.name,
      email: student.email,
      age: student.age,
    });
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h1 className="text-center mb-4">
          Student Management System
        </h1>

        {/* Student Form */}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">

            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                value={form.age}
                onChange={(e) =>
                  setForm({
                    ...form,
                    age: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col">
              <button
                type="submit"
                className={`btn w-100 ${
                  editingId
                    ? "btn-warning"
                    : "btn-primary"
                }`}
              >
                {editingId
                  ? "Update Student"
                  : "Add Student"}
              </button>
            </div>

          </div>
        </form>

        <hr />

        {/* Marks Form */}

        <div className="card p-3 mb-4 bg-light">
          <h4>Add Marks</h4>

          <form onSubmit={addMark}>
            <div className="row">

              <div className="col-md-3">
                <select
                  className="form-control"
                  value={markForm.studentId}
                  onChange={(e) =>
                    setMarkForm({
                      ...markForm,
                      studentId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select Student
                  </option>

                  {students.map((student) => (
                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Subject"
                  value={markForm.subject}
                  onChange={(e) =>
                    setMarkForm({
                      ...markForm,
                      subject: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Score"
                  value={markForm.score}
                  onChange={(e) =>
                    setMarkForm({
                      ...markForm,
                      score: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Add Mark
                </button>
              </div>

            </div>
          </form>
        </div>

        {/* Search */}

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <h2>Students</h2>

        <table className="table table-bordered table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>

                <td>
                  {student.marks &&
                  student.marks.length > 0 ? (
                    student.marks.map((mark) => (
                      <div key={mark.id}>
                        {mark.subject}: {mark.score}
                      </div>
                    ))
                  ) : (
                    <span className="text-muted">
                      No Marks
                    </span>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      handleEdit(student)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
        <div className="d-flex justify-content-center mt-4">

  <button
    className="btn btn-secondary me-2"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  <span className="align-self-center">
    Page {page} of {totalPages}
  </span>

  <button
    className="btn btn-secondary ms-2"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>

</div>

      </div>
    </div>
  );
}

export default App;