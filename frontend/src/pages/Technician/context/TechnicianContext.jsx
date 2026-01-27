import React, { createContext, useContext, useState } from 'react';

const TechnicianContext = createContext();

export const useTechnician = () => {
  const context = useContext(TechnicianContext);
  if (!context) {
    throw new Error('useTechnician must be used within TechnicianProvider');
  }
  return context;
};

export const TechnicianProvider = ({ children }) => {
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 1,
      customer: 'John Doe',
      service: 'Smartphone Repair',
      location: '123 Main St, City',
      phone: '+1 234-567-8900',
      description: 'iPhone screen cracked and touch not working properly',
      preferredTime: '10:00 AM - 12:00 PM',
      requestedDate: '2024-01-20',
      priority: 'high',
      estimatedDuration: '2 hours',
      serviceCharge: '₹1,500'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      service: 'Washing Machine Repair',
      location: '456 Oak Ave, City',
      phone: '+1 234-567-8901',
      description: 'Washing machine not spinning and making loud noise',
      preferredTime: '2:00 PM - 4:00 PM',
      requestedDate: '2024-01-20',
      priority: 'medium',
      estimatedDuration: '3 hours',
      serviceCharge: '₹2,000'
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      service: 'Laptop Repair',
      location: '789 Pine Rd, City',
      phone: '+1 234-567-8902',
      description: 'Laptop overheating and battery not charging',
      preferredTime: '4:00 PM - 6:00 PM',
      requestedDate: '2024-01-21',
      priority: 'low',
      estimatedDuration: '2.5 hours',
      serviceCharge: '₹2,500'
    }
  ]);

  const [schedules, setSchedules] = useState([
    {
      id: 4,
      customer: 'Sarah Wilson',
      service: 'Smart TV Repair',
      address: '321 Elm St, City',
      phone: '+1 234-567-8903',
      description: 'TV not turning on, power LED blinking',
      scheduledTime: '11:00 AM - 1:00 PM',
      date: '2024-01-22',
      status: 'completed',
      priority: 'medium',
      estimatedDuration: '2 hours',
      serviceCharge: '₹1,800'
    },
    {
      id: 5,
      customer: 'David Brown',
      service: 'Refrigerator Repair',
      address: '654 Maple Dr, City',
      phone: '+1 234-567-8904',
      description: 'Refrigerator not cooling properly, compressor issue',
      scheduledTime: '9:00 AM - 11:00 AM',
      date: '2024-01-19',
      status: 'completed',
      priority: 'high',
      estimatedDuration: '3 hours',
      serviceCharge: '₹3,500'
    },
    {
      id: 6,
      customer: 'Lisa Garcia',
      service: 'Washing Machine Repair',
      address: '987 Cedar St, City',
      phone: '+1 234-567-8905',
      description: 'Washing machine leaking water from bottom',
      scheduledTime: '1:00 PM - 3:00 PM',
      date: '2024-01-18',
      status: 'completed',
      priority: 'medium',
      estimatedDuration: '2 hours',
      serviceCharge: '₹1,800'
    }
  ]);

  const acceptRequest = (requestId) => {
    const request = serviceRequests.find(req => req.id === requestId);
    if (request) {
      setServiceRequests(prev => prev.filter(req => req.id !== requestId));
      
      const newSchedule = {
        ...request,
        address: request.location,
        scheduledTime: request.preferredTime,
        date: request.requestedDate,
        status: 'accepted'
      };
      setSchedules(prev => [...prev, newSchedule]);
    }
  };

  const declineRequest = (requestId) => {
    const request = serviceRequests.find(req => req.id === requestId);
    if (request) {
      setServiceRequests(prev => prev.filter(req => req.id !== requestId));
      
      const newSchedule = {
        ...request,
        address: request.location,
        scheduledTime: request.preferredTime,
        date: request.requestedDate,
        status: 'cancelled'
      };
      setSchedules(prev => [...prev, newSchedule]);
    }
  };

  const updateScheduleStatus = (scheduleId, newStatus) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === scheduleId 
          ? { ...schedule, status: newStatus }
          : schedule
      )
    );
  };

  const value = {
    serviceRequests,
    schedules,
    acceptRequest,
    declineRequest,
    updateScheduleStatus
  };

  return (
    <TechnicianContext.Provider value={value}>
      {children}
    </TechnicianContext.Provider>
  );
};