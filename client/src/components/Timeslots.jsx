import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function Timeslots({ timeslots, selectedTimeslot, setSelectedTimeslot }) {

  function onTimeslotChange(event) {
    setSelectedTimeslot(event.target.value);
  }

  return (
    <div id="timeslots">
      <select className="timeslotsDropdown" onChange={(event) => {onTimeslotChange(event)}}>
        {
          timeslots.map(timeslot => {
            return <RenderTimeslot timeslot={timeslot} />
          })
        }
      </select>

    </div>
  );
};


function RenderTimeslot( {timeslot} ) {


  return (
      <option value={timeslot.timeslot_id}>
        {timeslot.starttime}
        {' - '}
        {timeslot.endtime}
      </option>

  );
};
