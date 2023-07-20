import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import {
  Typography,
  Avatar,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from '@mui/material';
import { getStudentById, updateStudent, deleteWeekProgress, deleteStudent } from '../api';
import { Link } from 'react-router-dom';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '200px',
  height: '200px',
  margin: '0 auto',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: '24px',
}));

const IndividualStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [total, setTotal] = useState(2000);
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [student, setStudent] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    moneySpent: '',
    itemsSold: '',
    moneyEarned: '',
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await getStudentById(id);
      setStudent(response);
      calculateTotal(response.progress);
      calculateNetProfitLoss(response.progress);
    } catch (error) {
      console.error('Failed to fetch student data:', error.message);
    }
  };

  const calculateTotal = (progress) => {
    const spentSum = progress.reduce((acc, curr) => acc + parseInt(curr.moneySpent), 0);
    const updatedTotal = 2000 - spentSum;
    setTotal(updatedTotal);
  };

  const calculateNetProfitLoss = (progress) => {
    const earnedSum = progress.reduce((acc, curr) => acc + parseInt(curr.moneyEarned), 0);
    const spentSum = progress.reduce((acc, curr) => acc + parseInt(curr.moneySpent), 0);
    const updatedNetProfitLoss = earnedSum - spentSum;
    setNetProfitLoss(updatedNetProfitLoss);
  };

  const handleEditProgress = (week) => {
    setSelectedWeek(week);
    setIsEditOpen(true);
  };

  const handleEditDataChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProgress = async () => {
    try {
      const updatedStudent = { ...student };
      const progressIndex = updatedStudent.progress.findIndex((progress) => progress.week === selectedWeek);
      if (progressIndex !== -1) {
        const { moneySpent, itemsSold, moneyEarned } = editData;
        const profitLoss = (parseFloat(moneyEarned) - parseFloat(moneySpent)).toFixed(2);
        updatedStudent.progress[progressIndex] = {
          ...updatedStudent.progress[progressIndex],
          moneySpent,
          itemsSold,
          moneyEarned,
          profitLoss,
        };
        await updateStudent(updatedStudent);
        setStudent(updatedStudent);
        setIsEditOpen(false);
        calculateTotal(updatedStudent.progress);
        calculateNetProfitLoss(updatedStudent.progress);
      }
    } catch (error) {
      console.error('Failed to update progress:', error.message);
    }
  };

  const handleDeleteProgress = async (week) => {
    try {
      await deleteWeekProgress(id, week);
      const updatedStudent = { ...student };
      const progressIndex = updatedStudent.progress.findIndex((progress) => progress.week === week);
      if (progressIndex !== -1) {
        updatedStudent.progress.splice(progressIndex, 1);
        setStudent(updatedStudent);
        calculateTotal(updatedStudent.progress);
        calculateNetProfitLoss(updatedStudent.progress);
      }
    } catch (error) {
      console.error('Failed to delete progress:', error.message);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      await deleteStudent(id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete student:', error.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setEditData({
      moneySpent: '',
      itemsSold: '',
      moneyEarned: '',
    });
  };

  if (!student) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Student Details
        <Box display="flex" justifyContent="right" marginTop={2} marginBottom={2} paddingRight={2}>
          <Button variant="outlined" color="secondary" onClick={handleDeleteStudent}>
            Delete
          </Button>
        </Box>
        
        <Link to={'/'} style={{ textDecoration: 'none' }}>Home</Link>
      </Typography>
      <StyledAvatar src={student.avatar} alt={student.name} />
      <Typography variant="h5" align="center" gutterBottom>
        {student.name}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Grade: {student.grade}
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Business: {student.business}
      </Typography>
      <Typography variant="body1" align="right" gutterBottom paddingRight={2}>
        Total Capital: {total}
      </Typography>
      <Typography variant="body1" align="right" gutterBottom paddingRight={2}>
      {netProfitLoss > 0 ? (`Net Profit : ${netProfitLoss}`) : (netProfitLoss < 0 && netProfitLoss !== 0 ? (`Net Loss ${Math.abs(netProfitLoss)}`) : (`Net Profit/Loss : 0`))}
      </Typography>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Week</TableCell>
              <TableCell>Money Spent</TableCell>
              <TableCell>Items Sold</TableCell>
              <TableCell>Money Earned</TableCell>
              <TableCell>Profit/Loss</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.progress.map((progress) => (
              <TableRow key={progress.week}>
                <TableCell>{progress.week}</TableCell>
                <TableCell>{progress.moneySpent}</TableCell>
                <TableCell>{progress.itemsSold}</TableCell>
                <TableCell>{progress.moneyEarned}</TableCell>
                <TableCell>{progress.profitLoss > 0 ? (`Profit by ${progress.profitLoss}`) : (progress.profitLoss < 0 && progress.profitLoss !== 0 ? (`Loss by ${Math.abs(progress.profitLoss)}`) : (0))}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditProgress(progress.week)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteProgress(progress.week)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Edit Overlay */}
      <Dialog open={isEditOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Progress</DialogTitle>
        <DialogContent>
          <TextField
            name="moneySpent"
            label="Money Spent"
            value={editData.moneySpent}
            onChange={handleEditDataChange}
            fullWidth
          />
          <TextField
            name="itemsSold"
            label="Items Sold"
            value={editData.itemsSold}
            onChange={handleEditDataChange}
            fullWidth
          />
          <TextField
            name="moneyEarned"
            label="Money Earned"
            value={editData.moneyEarned}
            onChange={handleEditDataChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProgress} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IndividualStudent;
