import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const styles = {
  formContainer: {
    padding: '16px',
    marginBottom: '16px',
  },
  formTitle: {
    marginBottom: '8px',
  },
  formField: {
    marginBottom: '8px',
  },
  formButton: {
    marginRight: '8px',
  },
};

const StudentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [avatar, setAvatar] = useState('');
  const [business, setBusiness] = useState('');
  const [progress, setProgress] = useState([{ week: '', moneySpent: '', itemsSold: '', moneyEarned: '', profitLoss: '' }]);

  const handleAddWeek = () => {
    setProgress([...progress, { week: '', moneySpent: '', itemsSold: '', moneyEarned: '', profitLoss: '' }]);
  };

  const handleRemoveWeek = (index) => {
    const updatedProgress = [...progress];
    updatedProgress.splice(index, 1);
    setProgress(updatedProgress);
  };

  const handleProgressChange = (index, field, value) => {
    const updatedProgress = [...progress];
    updatedProgress[index][field] = value;
    if (field === 'moneySpent' || field === 'moneyEarned') {
      const moneySpent = parseFloat(updatedProgress[index].moneySpent || 0);
      const moneyEarned = parseFloat(updatedProgress[index].moneyEarned || 0);
      updatedProgress[index].profitLoss = (moneyEarned - moneySpent).toFixed(2);
    }
    setProgress(updatedProgress);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = {
      name,
      grade,
      avatar,
      business,
      progress,
    };

    onSubmit(studentData);

    setName('');
    setGrade('');
    setAvatar('');
    setBusiness('');
    setProgress([{ week: '', moneySpent: '', itemsSold: '', moneyEarned: '', profitLoss: '' }]);
  };

  return (
    <Paper elevation={2} style={styles.formContainer}>
      <Typography variant="h6" style={styles.formTitle}>
        Add Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.formField}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Grade"
              variant="outlined"
              fullWidth
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={styles.formField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Avatar"
              variant="outlined"
              fullWidth
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              style={styles.formField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Business"
              variant="outlined"
              fullWidth
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              style={styles.formField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Progress
            </Typography>
            {progress.map((week, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={2}>
                  <TextField
                    label="Week"
                    variant="outlined"
                    fullWidth
                    value={week.week}
                    onChange={(e) => handleProgressChange(index, 'week', e.target.value)}
                    style={styles.formField}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Money Spent"
                    variant="outlined"
                    fullWidth
                    value={week.moneySpent}
                    onChange={(e) => handleProgressChange(index, 'moneySpent', e.target.value)}
                    style={styles.formField}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Items Sold"
                    variant="outlined"
                    fullWidth
                    value={week.itemsSold}
                    onChange={(e) => handleProgressChange(index, 'itemsSold', e.target.value)}
                    style={styles.formField}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Money Earned"
                    variant="outlined"
                    fullWidth
                    value={week.moneyEarned}
                    onChange={(e) => handleProgressChange(index, 'moneyEarned', e.target.value)}
                    style={styles.formField}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Profit/Loss"
                    variant="outlined"
                    fullWidth
                    value={week.profitLoss}
                    style={styles.formField}
                    disabled
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveWeek(index)}
                  >
                    Remove Week
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddWeek}
            >
              Add Week
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={styles.formButton}
            >
              Add Student
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default StudentForm;
