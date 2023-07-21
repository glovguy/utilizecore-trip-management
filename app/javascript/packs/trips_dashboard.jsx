import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import NewTripModal from './new_trip_modal.tsx';
import EditTripModal from './edit_trip_modal.tsx';


const TripsDashboard = ({ current_user_id }) => {
  console.log(current_user_id)
  const [trips, setTrips] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    async function fetchTrips() {
      const response = await fetch('/trips');
      const tripsJson = await response.json();
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
  if (!trips) { return <span>Loading...</span>; }

  return (
    <>
    <NewTripModal users={users} currentUserId={current_user_id} />
    <table>
      <thead>
        <tr>
          <th>Assignee</th>
          <th>Owner</th>
          <th>Address</th>
          <th>ETA</th>
          <th>ETC</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trips.map((trip) => (
          <tr key={trip.id}>
            <td>{users.find(user => user.id === trip.assignee_id).full_name}</td>
            <td>{users.find(user => user.id === trip.owner_id).full_name}</td>
            <td>{trip.address}</td>
            <td>{trip.eta}</td>
            <td>{trip.etc}</td>
            <td>{trip.status}</td>
            <td>
              <button onClick={() => props.onEdit(trip.id)}>CHECK IN</button>
              {
                (trip.owner_id == current_user_id || 
                  trip.assignee_id == current_user_id) && 
                  <EditTripModal trip={trip} users={users} currentUserId={current_user_id} />
                }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default TripsDashboard

const current_user_id = document.querySelector("#session").attributes["data-current-user-id"].value
const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<TripsDashboard current_user_id={current_user_id}/>);
