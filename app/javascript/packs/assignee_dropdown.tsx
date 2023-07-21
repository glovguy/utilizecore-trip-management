import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown';


const AssigneeDropdown = ({ users, selectedAssignee, setSelectedAssignee }) => {
  const options = [...users].map(user => {
    return { value: user.id, label: user.email }
  });
  
  return (
    <Dropdown options={options} 
              value={selectedAssignee}
              onChange={setSelectedAssignee}
              placeholder="Select an option" />
  );
}

export default AssigneeDropdown;
