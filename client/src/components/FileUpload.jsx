import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setFileUrl(data.url);
        alert('File uploaded successfully');
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".png,.pdf,.doc,.docx,.xls,.xlsx" />
      <button onClick={handleUpload}>Upload</button>
      {fileUrl && (
        <div>
          <p>File URL: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;