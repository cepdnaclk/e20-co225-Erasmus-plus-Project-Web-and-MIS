import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import style from "../components/Dashboard.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';

/* Dashboard Page */
function Dashboard() {
  
  const [activeTab, setActiveTab] = useState('Tasks');
  const [tasks, setTasks] = useState([]);
  const [taskListNotEmpty, setTaskListNotEmpty] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);  // Controls Dialog visibility
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    details: '',
    date: '',
    time: '',
    venue: ''
  });
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/tasks');
        setTasks(response.data);
        setTaskListNotEmpty(response.data.length !== 0);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchTasks();
    fetchEvents();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (editingEventId) {
      // Update existing event
      await axios.put(`http://localhost:8080/api/v1/events/${editingEventId}`, eventDetails);
      setEditingEventId(null);
    } else {
      // Create new event
      await axios.post('http://localhost:8080/api/v1/events', eventDetails);
    }
    setEventDetails({ title: '', details: '', date: '', time: '', venue: '' });
    setShowEventForm(false);  // Close dialog after submit
    fetchEvents();
  };

  const handleEditEvent = (event) => {
    setEventDetails({
      title: event.title,
      details: event.details,
      date: event.date.split('T')[0],  // format for input type=date
      time: event.time,
      venue: event.venue
    });
    setEditingEventId(event.id);
    setShowEventForm(true);  // Open dialog for editing
  };

  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/events/${id}`);
        fetchEvents(); // Refresh events after deletion
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <>
      <div className={style["DashboardTitle"]}>
        <h3>Dashboard</h3>
      </div>

      {/* Tabs for different repositories */}
      <div className={style["DashboardTabs"]}>
        <button
          className={activeTab === 'Tasks' ? style.active : ''}
          onClick={() => handleTabChange('Tasks')}>
          <div className={style["DashboardSubTitle"]}>
            <h3>Tasks</h3>
          </div>
        </button>

        <button
          className={activeTab === 'events' ? style.active : ''}
          onClick={() => handleTabChange('events')}>
          <div className={style["DashboardSubTitle"]}>
            <h3>Upcoming Events</h3>
          </div>
        </button>
      </div>

      {activeTab === 'Tasks' && taskListNotEmpty ? (
        tasks.map((item) => (
          <div key={item.task_ID} className={style["taskCard"]}>
            <h2>{item.task_Name}</h2>
            <p>Start Date: {item.start_Date}</p>
            <p>End Date: {item.end_Date}</p>
            <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <CircularProgress variant="determinate" value={item.progress} size={70} />
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Typography variant="caption" component="div" color="text.secondary">
                  {`${item.progress}%`}
                </Typography>
              </Box>
            </Box>
          </div>
        ))
      ) : (
        activeTab === 'Tasks' && <p>No Tasks to View!</p>
      )}

      {/* Upcoming Events Tab */}
      {activeTab === 'events' && (
        <div>
          <Button style={{ marginLeft: '5%' , marginTop: '2%', backgroundColor: 'hsl(226, 64%, 35%)', fontFamily: 'Caudex', textTransform: 'none'}}  variant="contained" onClick={() => setShowEventForm(true)}>
            Add Event
          </Button>
          {/* Material-UI Dialog for Event Form */}
          <Dialog open={showEventForm} onClose={() => setShowEventForm(false)}>
            <DialogTitle>{editingEventId ? 'Edit Event' : 'Add Event'}</DialogTitle>
            <DialogContent>
              <TextField
                name="title"
                label="Event Title"
                value={eventDetails.title}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                name="details"
                label="Event Details"
                value={eventDetails.details}
                onChange={handleInputChange}
                
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                name="date"
                label="Event Date"
                type="date"
                value={eventDetails.date}
                onChange={handleInputChange}
                
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="time"
                label="Event Time"
                type="time"
                value={eventDetails.time}
                onChange={handleInputChange}
                
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="venue"
                label="Venue"
                value={eventDetails.venue}
                onChange={handleInputChange}
                
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button style={{backgroundColor: 'hsl(211, 44%, 66%)', color: 'black', marginBottom: '5%', textTransform: 'none'}} onClick={() => setShowEventForm(false)}>Cancel</Button>
              <Button style={{backgroundColor: 'hsl(211, 44%, 66%)', color: 'black', marginRight: '5%', marginBottom: '5%', textTransform: 'none'}} onClick={handleSubmitEvent} variant="contained">
                {editingEventId ? 'Update Event' : 'Add Event'}
              </Button>
            </DialogActions>
          </Dialog>

          {events.length === 0 ? ( // Check if there are no events
      <p style={{ marginLeft: '5%', marginTop: '2%' }}>There are no events to display.</p> // Display message
    ) : (
      events.map((event) => (
        <div key={event.id} className={style["eventCard"]}>
          <h2>{event.title}</h2>
          <p> Event Details : <b>{event.details} </b></p>
          <p> Date : <b>{event.date}</b></p>
          <p> Time : <b>{event.time}</b></p>
          <p> Venue : <b>{event.venue}</b></p>

          <Button
            style={{ backgroundColor: 'hsl(211, 44%, 90%)', color: 'hsl(211, 44%, 50%)', marginRight: '2%', marginTop: '2%' }}
            onClick={() => handleEditEvent(event)}
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button
            style={{ backgroundColor: 'hsl(211, 44%, 90%)', color: 'hsl(211, 44%, 50%)', marginTop: '2%' }}
            onClick={() => handleDeleteEvent(event.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          {/* To the google calendar */}
          <Button
            style={{ backgroundColor: 'hsl(211, 44%, 90%)', color: 'hsl(211, 44%, 50%)', marginTop: '2%', marginLeft: '2%', textTransform: 'none', height: '27px' }}
            onClick={() => window.open('https://calendar.google.com/calendar/u/2/r?pli=1', '_blank')}
          >
            <FontAwesomeIcon icon={faCalendar} style={{ marginRight: '8px' }} /> Add to Calendar
          </Button>
        </div>
      ))
    )}
  </div>
      )}
    </>
  );
}

export default Dashboard;
