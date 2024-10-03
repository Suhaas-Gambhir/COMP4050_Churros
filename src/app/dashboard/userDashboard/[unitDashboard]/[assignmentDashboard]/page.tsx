// assignmentDashboard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionTemplate from '@/app/components/QuestionTemplate'; // Import the new component
// import {GET_UNITS} from '@/api';

const AssignmentDashboard: React.FC = () => {
  const [unitName, setUnitName] = useState<string>('CS101');
  const [assignmentName, setAssignmentName] = useState<string>('Fastest Scheduling Algorithm');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSubmissions, setSelectedSubmissions] = useState<number[]>([]);
  const [showTemplate, setShowTemplate] = useState<boolean>(false); // State to manage overlay visibility
  const [templateSaved, setTemplateSaved] = useState<boolean>(false); // State to track if the template has been saved

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://54.206.102.192/units/CS101/projects/FastestSchedulingAlgorithm/files');
      setSubmissions(response.data.submission_files);
    } catch (err) {
      console.error("Error fetching submissions", err);
      setError("Failed to fetch submissions.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        await axios.post('http://54.206.102.192/units/CS101/projects/FastestSchedulingAlgorithm/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSelectedFile(null);
        fetchSubmissions();
      } catch (err) {
        console.error("Error uploading file", err);
        setError("Failed to upload file.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCheckboxChange = (submissionId: number) => {
    setSelectedSubmissions(prev => 
      prev.includes(submissionId) 
        ? prev.filter(id => id !== submissionId) 
        : [...prev, submissionId]
    );
  };

  const handleGenerateQuestions = async () => {
    if (selectedSubmissions.length > 0) {
      try {
        const response = await axios.post('http://54.206.102.192/units/CS101/projects/FastestSchedulingAlgorithm/generate-questions', {
          submission_ids: selectedSubmissions,
        });
        console.log("Questions generated successfully:", response.data);
      } catch (err) {
        console.error("Error generating questions", err);
        setError("Failed to generate questions.");
      }
    } else {
      setError("Please select at least one submission.");
    }
  };

  // Function to reset template saved state
  const resetTemplateSaved = () => {
    setTemplateSaved(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{unitName} Dashboard</h1>
      <h2 className="text-xl mb-4">{assignmentName}</h2>

      {submissions.length === 0 ? (
        <div className="mb-4">
          <input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            className="border rounded px-2 py-1 mr-2"
          />
          <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Submission'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      ) : null}

      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-semibold">Submissions</h3>
        <div>
          <button 
            onClick={() => {
              setShowTemplate(true);
              if (!templateSaved) {
                setTemplateSaved(true); // Set template saved to true when opening for the first time
              }
            }} 
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            {templateSaved ? 'Edit Question Template' : 'Add Question Template'}
          </button>
          <button
            onClick={handleGenerateQuestions} 
            className="bg-blue-500 text-white px-4 py-2 rounded mr-10"
          >
            Generate Questions
          </button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <p>No submissions uploaded yet.</p>
      ) : (
        <div className="overflow-x-auto pr-10">
          <table className="min-w-full mt-2 border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedSubmissions.length === submissions.length) {
                        setSelectedSubmissions([]);
                      } else {
                        setSelectedSubmissions(submissions.map(submission => submission.submission_id));
                      }
                    }}
                    checked={selectedSubmissions.length === submissions.length}
                  />
                </th>
                <th className="border px-1 py-2">Submission ID</th>
                <th className="border px-4 py-2">File Name</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.submission_id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedSubmissions.includes(submission.submission_id)}
                      onChange={() => handleCheckboxChange(submission.submission_id)}
                    />
                  </td>
                  <td className="border px-4 py-2">{submission.submission_id}</td>
                  <td className="border px-4 py-2">{submission.submission_file_name}</td>
                  <td className="border px-4 py-2">{submission.submission_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTemplate && <QuestionTemplate onClose={() => {
        setShowTemplate(false);
        resetTemplateSaved(); // Reset the template saved state when closing
      }} />} {/* Render the overlay */}
    </div>
  );
};

export default AssignmentDashboard;
