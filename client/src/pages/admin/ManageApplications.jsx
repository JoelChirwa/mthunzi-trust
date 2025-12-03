import React, { useEffect, useState } from 'react';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setApplications(data.applications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:4000/api/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setApplications(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>
        {loading ? (
          <div>Loading...</div>
        ) : applications.length === 0 ? (
          <div>No applications yet.</div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold">{app.name} — {app.email}</div>
                  <div className="text-sm text-gray-600">Phone: {app.phone} • Location: {app.location}</div>
                  <div className="text-sm text-gray-600">Vacancy: {app.vacancy?.title || app.vacancy}</div>
                  {app.coverLetter && <div className="mt-2 text-sm whitespace-pre-wrap">{app.coverLetter}</div>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {app.certificate && (
                    <a className="px-3 py-1 bg-teal-600 text-white rounded" href={app.certificate} target="_blank" rel="noreferrer">Download certificate</a>
                  )}
                  <button onClick={() => handleDelete(app._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
