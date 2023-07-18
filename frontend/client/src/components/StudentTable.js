import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardActions, Typography, Button, styled, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { getStudents } from '../api';

const StyledGrid = styled(Grid)(({ theme }) => ({
  marginBottom: '24px',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '300px',
}));

const StudentTable = ({ onCreateStudent }) => {
  const [students, setStudents] = useState([]);

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

  useEffect(() => {
    if (onCreateStudent) {
      fetchStudents();
    }
  }, [onCreateStudent]);

  return (
    <StyledGrid container spacing={3}>
      {students.map((student) => (
        <StyledGrid item xs={12} sm={6} md={4} key={student._id}>
          <StyledCard>
            <CardContent>
              <Avatar src={student.avatar} alt={student.name} />
              <Typography variant="h6" component="div">
                {student.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Grade: {student.grade}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Business: {student.business}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" color="primary" component={Link} to={`/${student._id}`}>
                View Details
              </Button>
            </CardActions>
          </StyledCard>
        </StyledGrid>
      ))}
    </StyledGrid>
  );
};

export default StudentTable;
