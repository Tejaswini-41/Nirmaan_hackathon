import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewDocument = () => {
  const { printId } = useParams();
  const [printJob, setPrintJob] = useState(null);

  useEffect(() => {
    const fetchPrintJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/print-jobs/${printId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrintJob(data);
      } catch (error) {
        console.error('Error fetching print job:', error);
      }
    };

    fetchPrintJob();
  }, [printId]);

  if (!printJob) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Print Job Details</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Document Details</h3>
        <p><strong>User Name:</strong> {printJob.userId.name}</p>
        <p><strong>Email:</strong> {printJob.userId.email}</p>
        <p><strong>Print ID:</strong> {printJob.printId}</p>
        <p><strong>Copies:</strong> {printJob.copies}</p>
        <p><strong>Size:</strong> {printJob.size}</p>
        <p><strong>Color:</strong> {printJob.color}</p>
        <p><strong>Sides:</strong> {printJob.sides}</p>
        <p><strong>Pages:</strong> {printJob.pages}</p>
        <p><strong>Schedule:</strong> {printJob.schedule}</p>
        <a href={printJob.file} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300">
          View Document
        </a>
      </div>
    </div>
  );
};

export default ViewDocument;