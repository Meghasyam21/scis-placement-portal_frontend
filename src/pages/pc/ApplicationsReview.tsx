import { useEffect, useState } from "react";
import api from "../../services/api";

const ApplicationsReview = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await api.get("/application/all");
    setApplications(res.data);
  };

  const selectStudent = async (id: number) => {
    await api.put(`/application/${id}/select`);
    alert("Student Selected");
    fetchApplications();
  };

  return (
    <div>
      <h2>Application Review</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Company</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.student.name}</td>
              <td>{app.student.studentProfile.rollNo}</td>
              <td>{app.company.name}</td>
              <td>{app.status}</td>
              <td>
                {app.status !== "SELECTED" && (
                  <button
                    onClick={() => selectStudent(app.id)}
                    style={styles.selectBtn}
                  >
                    SELECT
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  selectBtn: {
    backgroundColor: "green",
    padding: "6px 10px",
    border: "none",
    cursor: "pointer",
  },
};

export default ApplicationsReview;