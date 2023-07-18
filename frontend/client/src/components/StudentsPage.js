import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';
import { getStudents, createStudent, deleteStudent, deleteWeekProgress } from '../api';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response);
    } catch (error) {
      console.error('Failed to fetch students:', error.message);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      const response = await createStudent(studentData);
      setStudents((prevStudents) => [...prevStudents, response]);
      closeForm(); // Close the form after successful submission
    } catch (error) {
      console.error('Failed to add student:', error.message);
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Student Progress Management
      </Typography>
      <Box display="flex" justifyContent="center" marginTop={2} marginBottom={2}>
        <Button variant="outlined" color="primary" onClick={openForm}>
          Open Form
        </Button>
      </Box>
      <StudentTable
        students={students}
        onDelete={deleteStudent}
        onEdit={setSelectedStudent}
        onDeleteWeekProgress={deleteWeekProgress}
        onCreateStudent={handleAddStudent}
      />
      <Dialog open={isFormOpen} onClose={closeForm}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <StudentForm onSubmit={handleAddStudent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForm} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentsPage;
