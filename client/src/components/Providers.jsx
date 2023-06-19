import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function Providers({ setSelectedProvider, providers, selectedProvider }) {

  function onProviderClick(provider) {
    setSelectedProvider(provider);
  }

  return (
    <div className="providers overflow-auto">
      {
        providers.map(provider => {
          return <Provider provider={provider} selected={provider === selectedProvider} />
        })
      }
    </div>
  )


  function Provider({ provider, selected }) {
    const providerPhoto = provider.provider_photo;
    console.log(provider);
    let providerClassName = "providerCard border-black border-2 rounded-md hover:bg-gray-300";
    if (selected) { providerClassName += " selectedProvider" }
    return (
      <div className={providerClassName}>
        <div className="mygrid grid grid-rows-3 grid-flow-col" onClick={() => {onProviderClick(provider)}}>
            <img className="provider row-span-3" src={
              providerPhoto ? providerPhoto : './assets/_MG_0171.jpg'
            }/>

          <div className="col-span-1">{provider.provider_name}</div>
          <div className="row-span-1 col-span-1">${provider.price}/appointment</div>
        </div>
      </div>
    )
  }
}


