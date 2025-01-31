import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/files?transactionComplete=true');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;