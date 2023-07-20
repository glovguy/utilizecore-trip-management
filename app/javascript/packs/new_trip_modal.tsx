import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import { DatePicker } from "antd";


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

const AssigneeDropdown = ({ users, selectedAssignee, onChange }) => {
  const options = [...users].map(user => {
    return { value: user.id, label: user.full_name }
  });
  
  return (
    <Dropdown options={options} 
              value={selectedAssignee}
              onChange={onChange}
              placeholder="Select an option" />
  );
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

function NewTripModal({ users, owner_id }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedAssignee, setSelectedAssignee] = React.useState();
  const [address, setAddress] = React.useState('');
  const [eta, setEta] = React.useState(new Date());
  const [etc, setEtc] = React.useState(new Date());

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
      !selectedAssignee.value ||
      !owner_id ||
      !address ||
      !eta ||
      !etc) {
      return;
    }
    const payload = {
      assignee_id: selectedAssignee.value,
      owner_id: owner_id,
      address: address,
      eta: JSON.stringify(eta),
      etc: JSON.stringify(etc)
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
        <CreateTripModalHeader /><p />
        {/* <form> */}
          {/* <AssigneeDropdown users={users} onChange={setSelectedAssignee} /><p />
          Address: <input onChange={(e) => setAddress(e.target.value)} value={address} ></input><p />
          ETA: <DatePicker /><p />
          ETC: <input></input><p /> */}
          <CreateTripModalBody 
            users={users}
            selectedAssignee={selectedAssignee}
            setSelectedAssignee={setSelectedAssignee}
            address={address}
            setAddress={setAddress}
            eta={eta}
            setEta={setEta}
            etc={etc}
            setEtc={setEtc}
          /><p />
          <CreateTripModalFooter createTrip={createTrip} />
        {/* </form> */}
      </Modal>
    </div>
  );
}


const CreateTripModalHeader = () => {
  return (
    <div style={{width: '500px', height: 48, padding: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
      <div style={{flex: '1 1 0', height: '32px', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex'}}>
        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
              <div style={{width: '24px', height: '24px', position: 'relative'}}>
                <div style={{width: '24px', height: '24px', left: '0px', top: '0px', position: 'absolute'}}></div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_101_96026)">
                <path d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill="#12274A"/>
                </g>
                <defs>
                <clipPath id="clip0_101_96026">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div style={{paddingTop: '2px', paddingBottom: '2px', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', display: 'flex'}}>
          <div style={{color: '#12274A', fontSize: '22px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: 28, wordWrap: 'break-word'}}>Create New</div>
        </div>
      </div>
      <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
          <div style={{width: '20px', height: '20px', position: 'relative'}}>
            {/* <div style={{width: '20px', height: '20px', left: '0px', top: '0px', position: 'absolute'}}></div> */}
            {/* <div style={{width: '11.67px', height: '11.67px', left: '4.17px', top: '4.17px', position: 'absolute', background: '#12274A'}}></div> */}
            <button style={{'border':'none', 'backgroundColor': 'transparent', 'outline': 'none', 'cursor': 'pointer', 'backgroundRepeat': 'no-repeat'}}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_101_96033)">
                  <path d="M15.8333 5.34166L14.6583 4.16666L9.99996 8.82499L5.34163 4.16666L4.16663 5.34166L8.82496 9.99999L4.16663 14.6583L5.34163 15.8333L9.99996 11.175L14.6583 15.8333L15.8333 14.6583L11.175 9.99999L15.8333 5.34166Z" fill="#12274A"/>
                </g>
                <defs>
                  <clipPath id="clip0_101_96033">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateTripModalFooter = ({ createTrip }) => {
  return (
    <div style={{width: '500px', height: '36px', paddingLeft: '16px', paddingRight: '16px', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
      <div style={{width: '124px', height: '36px', paddingLeft: '16px', paddingRight: '16px', background: '#1A6EFB', borderRadius: '4px', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex'}}>
          <button onClick={createTrip} style={{cursor: 'pointer', border: 'none', backgroundColor: 'transparent', color: 'white', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', textTransform: 'uppercase', lineHeight: '19.20px', wordWrap: 'break-word'}}>CREATE</button>
        </div>
      </div>
    </div>
  );
};

const CreateTripModalBody = ({ 
  users,
  selectedAssignee, setSelectedAssignee,
  address, setAddress,
  eta, setEta,
  etc, setEtc
}) => {
  return (
    <div style={{width: '500px', height: '236px', padding: '16px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '16px', display: 'inline-flex'}}>
      <div style={{alignSelf: 'stretch', minHeight: '204px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', height: '45px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', height: '13px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{width: '10px', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  <div style={{width: '10px', alignSelf: 'stretch', background: '#FBFDFF', borderTopLeftRadius: '4px', borderLeft: '0.50px #536B95 solid', borderTop: '0.50px #536B95 solid'}} />
                </div>
                <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <div style={{width: '54px', alignSelf: 'stretch', paddingLeft: '2px', paddingRight: '2px', background: '#FBFDFF', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '10px', display: 'flex'}}>
                    <div style={{color: '#536B95', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word'}}>Assignee</div>
                  </div>
                  <div style={{flex: '1 1 0', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', background: '#FBFDFF', borderTop: '0.50px #536B95 solid'}} />
                  </div>
                </div>
                <div style={{width: '10px', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  <div style={{width: '10px', alignSelf: 'stretch', background: '#FBFDFF', borderTopRightRadius: '4px', borderTop: '0.50px #536B95 solid', borderRight: '0.50px #536B95 solid'}} />
                </div>
              </div>
              <div style={{alignSelf: 'stretch', paddingBottom: '12px', paddingLeft: '12px', paddingRight: '12px', background: '#FBFDFF', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', borderLeft: '0.50px #536B95 solid', borderRight: '0.50px #536B95 solid', borderBottom: '0.50px #536B95 solid', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                {/* foo */}
                <AssigneeDropdown users={users} onChange={setSelectedAssignee} style={{alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}} />
                {/* <div style={{flex: '1 1 0', height: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <div style={{flex: '1 1 0', height: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  </div>
                </div> */}
                <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                  <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'inline-flex'}}>
                    <div style={{width: '20px', height: '20px', position: 'relative'}}>
                      {/* <div style={{width: '20px', height: '20px', left: '0px', top: '0px', position: 'absolute'}}></div> */}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_101_96060)">
                      <path d="M5.83337 8.33334L10 12.5L14.1667 8.33334H5.83337Z" fill="#12274A"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_101_96060">
                      <rect width="20" height="20" fill="white"/>
                      </clipPath>
                      </defs>
                      </svg>
                      {/* <div style={{width: '8.33px', height: '4.17px', left: '5.83px', top: '8.33px', position: 'absolute', background: '#12274A'}}></div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: '45px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', height: '13px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{width: '10px', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  <div style={{width: '10px', alignSelf: 'stretch', background: '#FBFDFF', borderTopLeftRadius: '4px', borderLeft: '0.50px #536B95 solid', borderTop: '0.50px #536B95 solid'}} />
                </div>
                <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <div style={{width: '49px', alignSelf: 'stretch', paddingLeft: '2px', paddingRight: '2px', background: '#FBFDFF', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '10px', display: 'flex'}}>
                    <div style={{color: '#536B95', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word'}}>Address</div>
                  </div>
                  <div style={{flex: '1 1 0', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', background: '#FBFDFF', borderTop: '0.50px #536B95 solid'}} />
                  </div>
                </div>
                <div style={{width: '10px', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  <div style={{width: '10px', alignSelf: 'stretch', background: '#FBFDFF', borderTopRightRadius: '4px', borderTop: '0.50px #536B95 solid', borderRight: '0.50px #536B95 solid'}} />
                </div>
              </div>
              <div style={{alignSelf: 'stretch', paddingBottom: '12px', paddingLeft: '12px', paddingRight: '12px', background: '#FBFDFF', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', borderLeft: '0.50px #536B95 solid', borderRight: '0.50px #536B95 solid', borderBottom: '0.50px #536B95 solid', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', minHeight: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} style={{flex: '1 1 0', minHeight: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex', background: 'transparent', border: 'none'}}>
                    {/* <div style={{color: '#12274A', fontSize: '14px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word'}}>Select Address</div> */}
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
          <div style={{width: '195px', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', height: '13px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{width: '10px', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  <div style={{width: '10px', alignSelf: 'stretch', background: '#FBFDFF', borderTopLeftRadius: '4px', borderLeft: '0.50px #536B95 solid', borderTop: '0.50px #536B95 solid'}} />
                </div>
                <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <div style={{width: '26px', alignSelf: 'stretch', paddingLeft: '2px', paddingRight: '2px', background: '#FBFDFF', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '10px', display: 'flex'}}>
                    <div style={{color: '#536B95', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word'}}>ETA</div>
                  </div>
                  <div style={{flex: '1 1 0', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', background: '#FBFDFF', borderTop: '0.50px #536B95 solid'}} />
                  </div>
                </div>
                <div style={{width: '10px', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  <div style={{width: '10px', alignSelf: 'stretch', background: '#FBFDFF', borderTopRightRadius: '4px', borderTop: '0.50px #536B95 solid', borderRight: '0.50px #536B95 solid'}} />
                </div>
              </div>
              <div style={{alignSelf: 'stretch', paddingBottom: '12px', paddingLeft: '12px', paddingRight: '12px', background: '#FBFDFF', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', borderLeft: '0.50px #536B95 solid', borderRight: '0.50px #536B95 solid', borderBottom: '0.50px #536B95 solid', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', height: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <DatePicker selected={eta} onChange={setEta} format={'MM/DD/YYYY - hh:mm'} />
                  {/* style={{flex: '1 1 0', height: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}} */}
                    {/* <div style={{color: '#12274A', fontSize: '14px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word'}}>MM/DD/YYYY - 00:00</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1, display: 'flex'}}>
          <div style={{width: '195px', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', height: '13px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{width: '10px', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  <div style={{width: '10px', alignSelf: 'stretch', background: '#FBFDFF', borderTopLeftRadius: '4px', borderLeft: '0.50px #536B95 solid', borderTop: '0.50px #536B95 solid'}} />
                </div>
                <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <div style={{width: '26px', alignSelf: 'stretch', paddingLeft: '2px', paddingRight: '2px', background: '#FBFDFF', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '10px', display: 'flex'}}>
                    <div style={{color: '#536B95', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word'}}>ETC</div>
                  </div>
                  <div style={{flex: '1 1 0', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', background: '#FBFDFF', borderTop: '0.50px #536B95 solid'}} />
                  </div>
                </div>
                <div style={{width: '10px', alignSelf: 'stretch', paddingTop: '2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
                  <div style={{width: '10px', alignSelf: 'stretch', background: '#FBFDFF', borderTopRightRadius: '4px', borderTop: '0.50px #536B95 solid', borderRight: '0.50px #536B95 solid'}} />
                </div>
              </div>
              <div style={{alignSelf: 'stretch', paddingBottom: '12px', paddingLeft: '12px', paddingRight: '12px', background: '#FBFDFF', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', borderLeft: '0.50px #536B95 solid', borderRight: '0.50px #536B95 solid', borderBottom: '0.50px #536B95 solid', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', height: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <DatePicker selected={etc} onChange={setEtc} format={'MM/DD/YYYY - hh:mm'} />
                  {/* <DateTimePicker value={etc} onChange={setEtc} style={{flex: '1 1 0', height: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}} /> */}
                    {/* <div style={{color: '#12274A', fontSize: '14px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word'}}>MM/DD/YYYY - 00:00</div> */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTripModal;
