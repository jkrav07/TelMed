import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function Providers({ setSelectedProvider, providers }) {

  function onProviderClick(provider) {
    setSelectedProvider(provider);
  }

  return (
    <div className="providers">
      {
        providers.map(provider => {
          return <Provider provider={provider} />
        })
      }
    </div>
  )


  function Provider({ provider }) {
    return (
      <div className="provider" onClick={() => {onProviderClick(provider)}}>
        <img src='./assets/_MG_0171.jpg' height="100"/>
        <div>{provider.provider_name}</div>
        <div>${provider.price}</div>
      </div>
    )
  }
}


