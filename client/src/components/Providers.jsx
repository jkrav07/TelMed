import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function Timeslots({ timeslots, selectedTimeslot, setSelectedTimeslot }) {
 function onTimeslotChange() {
  setSelectedTimeslot(event.target.value);
 }


  return (
    <div id="timeslots">
      <select className="sortDropdown" onChange={onTimeslotChange}>
        {
          timeslots.map(timeslot => {
            <RenderTimeslot timeslot={timeslot} />
          })
        }
      </select>

    </div>
  );
};


function RenderTimeslot(timeslot) {
  console.log(timeslot);
  return (
      <option value={timeslot.timeslot_id}>
        {timeslot.starttime}
        {'-'}
        {timeslot.endtime}
      </option>

  );
};
