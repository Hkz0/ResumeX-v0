import axios from 'axios';

const API_BASE_URL = 'https://resumexpert-dev.onrender.com/'; // Change to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Needed for session-based auth
});

// Auth
export const register = (username, password) =>
  api.post('/api/register', { username, password });

export const login = (username, password) =>
  api.post('/api/login', { username, password });

export const logout = () => api.get('/api/logout');

export const checkSession = () => api.get('/api/check-session');

// Jobs
export const createJob = (title, description) =>
  api.post('/api/jobs', { title, description });

export const getJobs = () => api.get('/api/jobs');

export const deleteJob = (jobId) => api.delete(`/api/jobs/${jobId}`);

// Rankings
export const getJobRankings = (jobId) =>
  api.get(`/api/jobs/${jobId}/rankings`);

export const deleteRanking = (jobId, rankingId) =>
  api.delete(`/api/jobs/${jobId}/rankings/${rankingId}`);

// Resume Upload
export const uploadResume = (file, job_desc) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('job_desc', job_desc);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Analyze
export const analyze = (resume_text, job_desc_text) =>
  api.post('/analyze', { resume_text, job_desc_text });

// Job Matching
export const jobMatching = (job_title, job_location) =>
  api.post('/job-matching', { job_title, job_location });

// Rank Resumes (multiple files)
export const rankResumes = (jobId, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  return api.post(`/rank-resumes/${jobId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export default api;
