import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import NewTripModal from './new_trip_modal.tsx';
import EditTripModal from './edit_trip_modal.tsx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);
const standardDateTimeFormat = 'MM/DD/YYYY h:mm A';

const TripsDashboard = ({ current_user_id }) => {
  const [trips, setTrips] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    async function fetchTrips() {
      const response = await fetch('/trips');
      const tripsJson = await response.json();
      tripsJson.forEach((trip) => {
        if (dayjs(trip.eta) < dayjs()) {
          trip.status = 'overdue';
        }
      })
      setTrips(tripsJson);
    }
    async function fetchUsers() {
      const response = await fetch('/users');
      const usersJson = await response.json();
      setUsers(usersJson);
    }
    fetchTrips();
    fetchUsers();
  }, []);
  if (!trips || !users) { return <span>Loading...</span>; }
  
  const newTripCreated = (newTrip) => {
    setTrips([...trips, newTrip]);
  };

  const tripEdited = (editedTrip) => {
    const newTrips = trips.map((trip) => (trip.id === editedTrip.id) ? editedTrip : trip);
    setTrips(newTrips);
  };

  const updateTripStatus = async (trip_id, status) => {
    const payload = {
      status: status
    };
    const response = await fetch(`/trips/${trip_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    tripEdited(data);
  };

  return (
    <div style={{ width: '95%', padding: '8px', backgroundColor: '#CFE0FD' }}>
      <div className="Checkbox" style={{height: '28px', padding: '8px'}}>
        <NewTripModal users={users} currentUserId={current_user_id} newTripCreated={newTripCreated} />
      </div>
      <table>
        <thead>
          <tr style={{minWidth: '100%', height: '24px', paddingRight: '8px', background: '#FBFDFF', borderRadius: '4px', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'inline-flex'}}>
            <th className="BaseId" style={{paddingLeft: '8px', flex: '1 1 0', height: '18px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
              <div className="BaseInvoiceDetails" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div className="BaseInvoiceNo" style={{height: '18px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                  <div className="Assignee" style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '21px', wordWrap: 'break-word'}}><b>Assignee</b></div>
                </div>
              </div>
            </th>
            <th className="BaseId" style={{flex: '1 1 0', height: '18px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
              <div className="BaseInvoiceDetails" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div className="BaseInvoiceNo" style={{height: '18px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                  <div className="Owner" style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '21px', wordWrap: 'break-word'}}><b>Owner</b></div>
                </div>
              </div>
            </th>
            <th className="BaseId" style={{flex: '1 1 0', height: '18px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
              <div className="BaseInvoiceDetails" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div className="BaseInvoiceNo" style={{height: '18px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                  <div className="Address" style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '21px', wordWrap: 'break-word'}}><b>Address</b></div>
                </div>
              </div>
            </th>
            <th className="BaseId" style={{flex: '1 1 0', height: '18px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
              <div className="BaseInvoiceDetails" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div className="BaseInvoiceNo" style={{height: '18px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                  <div className="Eta" style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '21px', wordWrap: 'break-word'}}><b>ETA</b></div>
                </div>
              </div>
            </th>
            <th className="BaseId" style={{flex: '1 1 0', height: '18px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
              <div className="BaseInvoiceDetails" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div className="BaseInvoiceNo" style={{height: '18px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                  <div className="Etc" style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '21px', wordWrap: 'break-word'}}><b>ETC</b></div>
                </div>
              </div>
            </th>
            <th className="BaseTableHeader" style={{flex: '1 1 0', height: '24px', justifyContent: 'flex-start', alignItems: 'center', gap: '16px', display: 'flex'}}>
              <div className="BaseDueDetails" style={{justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex'}}>
                <div className="BaseDueDate" style={{justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <div className="Status" style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '21px', wordWrap: 'break-word'}}><b>Status</b></div>
                </div>
              </div>
            </th>
            <th className="BaseTableHeader" style={{flex: '1 1 0', height: '24px', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', display: 'flex'}}>
              <div className="BaseDueDetails" style={{justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex'}}>
                <div className="BaseDueDate" style={{justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                  <div className="Actions" style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '21px', wordWrap: 'break-word'}}><b>Actions</b></div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <TripTableRow key={trip.id} trip={trip} users={users} tripEdited={tripEdited} updateTripStatus={updateTripStatus} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TripTableRow = ({ trip, users, tripEdited, updateTripStatus }) => {
  return (
    <tr style={{width: '100%', height: '41px', paddingRight: '8px', background: '#FBFDFF', borderRadius: '4px', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'inline-flex'}}>
      <td style={{flex: '1 1 0', paddingLeft: '8px', minHeight: '18px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{minHeight: '18px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '21px', wordWrap: 'break-word'}}>
              {users.find(user => user.id === trip.assignee_id).email}
            </div>
          </div>
        </div>
      </td>
      <td style={{flex: '1 1 0', height: '18px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{height: '18px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '21px', wordWrap: 'break-word'}}>
              {users.find(user => user.id === trip.owner_id).email}
            </div>
          </div>
        </div>
      </td>
      <td style={{flex: '1 1 0', height: '18px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{color: '#12274A', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '21px', wordWrap: 'break-word'}}>
              {trip.address}
            </div>
          </div>
        </div>
      </td>
      <td style={{flex: '1 1 0', height: '16px', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex'}}>
        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          <div style={{color: '#536B95', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word'}}>
            {dayjs(trip.eta).format(standardDateTimeFormat)}
          </div>
        </div>
      </td>
      <td style={{flex: '1 1 0', height: '16px', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex'}}>
        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          <div style={{color: '#536B95', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word'}}>
            {dayjs(trip.etc).format(standardDateTimeFormat)}
          </div>
        </div>
      </td>
      <td style={{flex: '1 1 0', height: '28px', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <Status status={trip.status} trip={trip} />
      </td>

      <td style={{height: '28px', minWidth: '206px', borderRadius: '4px', overflow: 'hidden', justifyContent: 'flex-end', alignItems: 'flex-start', gap: '1px', display: 'flex'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex'}}>
            <div style={{color: 'white', paddingLeft: '12.45px', paddingRight: '12.45px', borderRadius: '4px', background: '#1A6EFB', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '500', textTransform: 'uppercase', lineHeight: '14.40px', wordWrap: 'break-word'}}>
              {trip.status === "not_started" && <button style={{cursor: 'pointer', paddingTop: '4px', paddingBottom: '4px', padding: '4px', background: 'transparent', border: 'none', color: 'white'}} onClick={() => updateTripStatus(trip.id, 'in_progress')}>CHECK IN</button>}
              {(trip.status === "in_progress" || trip.status === "overdue") && <button style={{cursor: 'pointer', paddingTop: '4px', paddingBottom: '4px', padding: '4px', background: 'transparent', border: 'none', color: 'white'}} onClick={() => updateTripStatus(trip.id, 'completed')}>CHECK OUT</button>}
            </div>
            {
            (trip.owner_id == current_user_id || 
              trip.assignee_id == current_user_id) && 
              (
                <div style={{background: '#1A6EFB', paddingLeft: '12.45px', paddingRight: '12.45px', borderRadius: '4px', color: 'white', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '500', textTransform: 'uppercase', lineHeight: '14.40px', wordWrap: 'break-word'}}>
                  <EditTripModal trip={trip} users={users} tripEdited={tripEdited} />
                </div>
              )
            }
          </div>
      </td>
    </tr>
  );
};

const UnstartedIcon = () => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_101_95470)">
    <path d="M16.1903 8.00001L14.5636 6.14667L14.7903 3.69334L12.3836 3.14667L11.1236 1.02667L8.85695 2.00001L6.59029 1.02667L5.33029 3.14667L2.92362 3.68667L3.15029 6.14001L1.52362 8.00001L3.15029 9.85334L2.92362 12.3133L5.33029 12.86L6.59029 14.98L8.85695 14L11.1236 14.9733L12.3836 12.8533L14.7903 12.3067L14.5636 9.85334L16.1903 8.00001ZM9.52362 11.3333H8.19029V10H9.52362V11.3333ZM9.52362 8.66667H8.19029V4.66667H9.52362V8.66667Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_101_95470">
    <rect width="16" height="16" fill="white" transform="translate(0.857117 0.5)"/>
    </clipPath>
    </defs>
    </svg>
  );
};

const InProgressIcon = () => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_101_95508)">
    <path d="M8.85712 1.83334C5.17712 1.83334 2.19045 4.82001 2.19045 8.50001C2.19045 12.18 5.17712 15.1667 8.85712 15.1667C12.5371 15.1667 15.5238 12.18 15.5238 8.50001C15.5238 4.82001 12.5371 1.83334 8.85712 1.83334ZM9.52378 13.1667H8.19045V11.8333H9.52378V13.1667ZM10.9038 8.00001L10.3038 8.61334C9.82378 9.10001 9.52378 9.50001 9.52378 10.5H8.19045V10.1667C8.19045 9.43334 8.49045 8.76668 8.97045 8.28001L9.79712 7.44001C10.0438 7.20001 10.1904 6.86668 10.1904 6.50001C10.1904 5.76668 9.59045 5.16668 8.85712 5.16668C8.12378 5.16668 7.52378 5.76668 7.52378 6.50001H6.19045C6.19045 5.02668 7.38378 3.83334 8.85712 3.83334C10.3305 3.83334 11.5238 5.02668 11.5238 6.50001C11.5238 7.08668 11.2838 7.62001 10.9038 8.00001Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_101_95508">
    <rect width="16" height="16" fill="white" transform="translate(0.857117 0.5)"/>
    </clipPath>
    </defs>
    </svg>
  );
};

const CompletedIcon = () => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_101_95650)">
    <path d="M16.6071 8.5C16.6071 12.7802 13.1373 16.25 8.85711 16.25C4.5769 16.25 1.10712 12.7802 1.10712 8.5C1.10712 4.21978 4.5769 0.75 8.85711 0.75C13.1373 0.75 16.6071 4.21978 16.6071 8.5ZM7.96068 12.6036L13.7107 6.85356C13.9059 6.65831 13.9059 6.34172 13.7107 6.14647L13.0036 5.43937C12.8083 5.24409 12.4917 5.24409 12.2965 5.43937L7.60711 10.1287L5.41777 7.93934C5.22252 7.74409 4.90593 7.74409 4.71065 7.93934L4.00355 8.64644C3.8083 8.84169 3.8083 9.15828 4.00355 9.35353L7.25355 12.6035C7.44883 12.7988 7.7654 12.7988 7.96068 12.6036Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_101_95650">
    <rect width="16" height="16" fill="white" transform="translate(0.857117 0.5)"/>
    </clipPath>
    </defs>
    </svg>
  );
};

const OverdueIcon = () => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_101_95580)">
    <path d="M16.6071 8.5C16.6071 12.7812 13.137 16.25 8.85711 16.25C4.57721 16.25 1.10712 12.7812 1.10712 8.5C1.10712 4.22134 4.57721 0.75 8.85711 0.75C13.137 0.75 16.6071 4.22134 16.6071 8.5ZM8.85711 10.0625C8.06321 10.0625 7.41961 10.7061 7.41961 11.5C7.41961 12.2939 8.06321 12.9375 8.85711 12.9375C9.65102 12.9375 10.2946 12.2939 10.2946 11.5C10.2946 10.7061 9.65102 10.0625 8.85711 10.0625ZM7.49233 4.89544L7.72415 9.14544C7.73499 9.34431 7.89943 9.5 8.09858 9.5H9.61565C9.8148 9.5 9.97924 9.34431 9.99008 9.14544L10.2219 4.89544C10.2336 4.68063 10.0626 4.5 9.84746 4.5H7.86674C7.65161 4.5 7.48061 4.68063 7.49233 4.89544Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_101_95580">
    <rect width="16" height="16" fill="white" transform="translate(0.857117 0.5)"/>
    </clipPath>
    </defs>
    </svg>
  );
};

const Status = ({ status, trip }) => {
  let icon, buttonText, backgroundColor;
  let now = new Date();
  
  useEffect(() => {
    const oneMinute = 60 * 1000;
    const interval = setInterval(() => {
      now = new Date();
    }, oneMinute);
    return () => clearTimeout(interval);
  }, []);

  console.log(now, trip.start_time)
  if (status === 'not_started') {
    icon = <UnstartedIcon />;
    buttonText = 'Not Started';
    backgroundColor = '#6994DE';
  } else if (status === 'in_progress') {
    icon = <InProgressIcon />;
    buttonText = `In Progress - Total ${dayjs(now - new Date(trip.start_time)).format('h:mm')}`;
    backgroundColor = '#FFA525';
  } else if (status === 'completed') {
    icon = <CompletedIcon />;
    buttonText = 'Complete';
    backgroundColor = '#4CAF4F';
  } else if (status === 'overdue') {
    icon = <OverdueIcon />;
    buttonText = 'Overdue';
    backgroundColor = '#FF5252';
  }
  return (
    <div style={{paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px', background: backgroundColor, borderRadius: '4px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex'}}>
      <div style={{minWidth: '73px', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', display: 'flex'}}>
        <div style={{minWidth: '16px', alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
              <div style={{minWidth: '16px', height: '16px', position: 'relative'}}>
                {icon}
              </div>
            </div>
          </div>
        </div>
        <div style={{color: 'white', fontSize: '12px', fontFamily: 'Roboto', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word'}}>
          {buttonText}
        </div>
      </div>
    </div>
  );
};

export default TripsDashboard

const current_user_id = document.querySelector("#session").attributes["data-current-user-id"].value
const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<TripsDashboard current_user_id={current_user_id}/>);
