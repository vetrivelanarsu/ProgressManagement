import axios from 'axios';

const API_BASE_URL = 'https://crud10-x8xl.onrender.com';

// Get all students
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch students');
  }
};

// Get a student by ID
export const getStudentById = async (studentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/${studentId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch student by ID');
  }
};


// Create a student
export const createStudent = async (student) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/students`, student);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create student');
  }
};

// Update a student
export const updateStudent = async (student) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/students/${student._id}`,
      student
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update student');
  }
};

// Delete a student
export const deleteStudent = async (studentId) => {
  try {
    await axios.delete(`${API_BASE_URL}/students/${studentId}`);
  } catch (error) {
    throw new Error('Failed to delete student');
  }
};

// Delete a specific week's progress data for a student
export const deleteWeekProgress = async (studentId, week) => {
  try {
    await axios.delete(`${API_BASE_URL}/students/${studentId}/progress/${week}`);
  } catch (error) {
    throw new Error('Failed to delete week progress');
  }
};
