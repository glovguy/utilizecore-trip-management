import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AssigneeDropdown = ({ users, onChange }) => {
  const options = [...users].map(user => {
    return { value: user.id, label: user.full_name }
  });
  
  return (
    <Dropdown options={options} 
              onChange={onChange}
              placeholder="Select an option" />
  );
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

function NewTripModal({ users, owner_id }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedAssignee, setSelectedAssignee] = React.useState(false);
  // const [address, setAddress] = React.useState(false);
  // const [eta, setEta] = React.useState(false);
  // const [etc, setEtc] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (!users) {
    return <div>Loading...</div>
  }

  const createTrip = () => {
    if (!selectedAssignee || 
      !selectedAssignee.value) {
      return;
    }
    const payload = {
      assignee_id: selectedAssignee.value,
      owner_id: owner_id,
      address: '123 Main St',
      eta: '2020-01-01 12:00:00',
      etc: '2020-01-01 12:00:00'
    };
    fetch('/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    console.log(payload);
  };

  return (
    <div>
      <button onClick={openModal}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create New Trip Modal"
      >
        <h2>Create New</h2>
        <button onClick={closeModal}>close</button>
        <form>
          <AssigneeDropdown users={users} onChange={setSelectedAssignee} /><p />
          Address: <input></input><p />
          ETA: <input></input><p />
          ETC: <input></input><p />
          <button onClick={() => createTrip()} >CREATE</button>
        </form>
      </Modal>
    </div>
  );
}

export default NewTripModal;
