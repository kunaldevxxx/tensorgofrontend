import axios from 'axios';

export const triggerOverdueNotifications = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/api/automation/trigger-overdue', {
        email
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Failed to trigger overdue notifications:', error);
      throw error;
    }
  };
  
  export const sendPaymentReminder = async (invoiceId, recipientEmail) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/send-reminder`, {
        invoiceId,
        recipientEmail,
      });
      return response.data;
    
      
    } catch (error) {
      console.error('API Error:', error);
      return { error: 'Failed to send reminder' };
    }
  };