import { useState, useEffect } from "react";

const API = "http://localhost:2000";

function App() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    start_date: "",
    end_date: ""
  });

  // LOAD EMPLOYEES
  const loadEmployees = async () => {
    console.log("➡️ Fetching employees...");

    const res = await fetch(`${API}/employees`);
    console.log("Status:", res.status);

    const data = await res.json();
    console.log("DATA RECEIVED:", data);

    setEmployees(data);
  };

  // LOAD LEAVES
  const loadLeaves = async () => {
    const res = await fetch(`${API}/leave-requests`);
    const data = await res.json();
    setLeaves(data);
  };

  // SUBMIT LEAVE
  const [loading, setLoading] = useState(false);
  const submitLeave = async () => {
    if (!form.employee_id || !form.start_date || !form.end_date) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);

    await fetch(`${API}/leave-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });


    await loadLeaves();
    setForm({
      employee_id: "",
      start_date: "",
      end_date: ""
    });
    setLoading(false);
  };


  useEffect(() => {
    console.log("Page loaded - fetching data");
    loadEmployees();
    loadLeaves();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leave Scheduler</h1>

      <h2>Employees</h2>


      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            Employee ID({emp.id}) - {emp.name} - <b>{emp.team}</b>
          </li>
        ))}
      </ul>

      <h2>Submit Leave Request</h2>

      <input
        type="number"
        placeholder="Employee ID"
        onChange={(e) =>
          setForm({ ...form, employee_id: e.target.value })
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setForm({ ...form, start_date: e.target.value })
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setForm({ ...form, end_date: e.target.value })
        }
      />

      <button onClick={submitLeave} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      <h2>Leave Requests</h2>


      <ul>
        {leaves.map(l => (
          <li key={l.id}>
            Employee ID({l.employee_id}) |
            {l.start_date} → {l.end_date} |
            <b>{l.status}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
