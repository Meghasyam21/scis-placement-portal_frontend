import { useEffect, useState } from "react";
import api from "../../services/api";

interface Student {
  id: number;
  name: string;
  email: string;
  studentProfile: {
    rollNo: string;
    batchYear: number;
    stream?: string;
    cgpa: number;
  };
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const [filters, setFilters] = useState({
    batch: "",
    stream: "",
    minCgpa: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/student");
      setStudents(res.data);
    } catch (error) {
      alert("Failed to fetch students");
    }
  };

  const handleFilterChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filtering Logic
  const filteredStudents = students.filter((student) => {
    const profile = student.studentProfile;

    if (filters.batch && profile.batchYear.toString() !== filters.batch)
      return false;

    if (filters.stream && profile.stream !== filters.stream)
      return false;

    if (filters.minCgpa && profile.cgpa < Number(filters.minCgpa))
      return false;

    return true;
  });

  return (
    <div style={styles.container}>
      <h2>All Students</h2>

      {/* Filters */}
      <div style={styles.filterContainer}>
        <input
          type="number"
          name="batch"
          placeholder="Batch Year"
          value={filters.batch}
          onChange={handleFilterChange}
          style={styles.filterInput}
        />

        <select
          name="stream"
          value={filters.stream}
          onChange={handleFilterChange}
          style={styles.filterInput}
        >
          <option value="">All Streams</option>
          <option value="CSE">CSE</option>
          <option value="AI">AI</option>
          <option value="IT">IT</option>
        </select>

        <input
          type="number"
          step="0.1"
          name="minCgpa"
          placeholder="Min CGPA"
          value={filters.minCgpa}
          onChange={handleFilterChange}
          style={styles.filterInput}
        />
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Roll No</th>
              <th style={styles.th}>Batch</th>
              <th style={styles.th}>Stream</th>
              <th style={styles.th}>CGPA</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td style={styles.td}>{student.name}</td>
                <td style={styles.td}>{student.email}</td>
                <td style={styles.td}>
                  {student.studentProfile.rollNo}
                </td>
                <td style={styles.td}>
                  {student.studentProfile.batchYear}
                </td>
                <td style={styles.td}>
                  {student.studentProfile.stream}
                </td>
                <td
                  style={{
                    ...styles.td,
                    fontWeight: "bold",
                    color:
                      student.studentProfile.cgpa >= 8
                        ? "#22c55e"
                        : student.studentProfile.cgpa >= 7
                        ? "#facc15"
                        : "#ef4444",
                  }}
                >
                  {student.studentProfile.cgpa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0f172a",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
  },
  filterContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  },
  filterInput: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #334155",
    backgroundColor: "#1e293b",
    color: "white",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    backgroundColor: "#1e293b",
  },
  th: {
    padding: "12px",
    textAlign: "center" as const,
    borderBottom: "1px solid #334155",
    backgroundColor: "#334155",
  },
  td: {
    padding: "12px",
    textAlign: "center" as const,
    borderBottom: "1px solid #334155",
  },
};

export default Students;