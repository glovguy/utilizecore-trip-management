import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client';

import PropTypes from 'prop-types'

const Hello = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

// const TripsTable = (props) => (
  
// );

const TripsDashboard = (props) => {
  const [trips, setTrips] = useState();
  useEffect(() => {
    async function fetchTrips() {
      const response = await fetch('/trips');
      const tripsJson = await response.json();
      setTrips(tripsJson);
      console.log(tripsJson)
    }
    fetchTrips();
  }, []);
  if (!trips) { return <span>Loading...</span>; }

  return (
    <>
    <button>+</button>
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
            <td>{trip.assignee}</td>
            <td>{trip.owner}</td>
            <td>{trip.address}</td>
            <td>{trip.eta}</td>
            <td>{trip.etc}</td>
            <td>{trip.status}</td>
            <td>
              <button onClick={() => props.onEdit(trip.id)}>CHECK IN</button>
              {/* <button onClick={() => props.onDelete(trip.id)}>CHECK OUT</button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default TripsDashboard

const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<TripsDashboard />);