import React, { useState, useEffect } from 'react'
import Select from 'react-select'



const AssigneeDropdown = ({ users, selectedAssignee, setSelectedAssignee }) => {
  const options = [...users].map(user => {
    return { value: user.id, label: user.email }
  });
  
  return (
    <Select options={options} 
            value={selectedAssignee}
            onChange={setSelectedAssignee}
            placeholder="Select an option" />
  );
}

export default AssigneeDropdown;
