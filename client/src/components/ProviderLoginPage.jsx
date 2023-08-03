import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


export default function ProviderLoginPage() {
const [email, setProviderEmail] = useState('');
const [password, setProviderPassword] = useState('');
const navigate = useNavigate();

  function onInputChange(event, set) {
      set(event.target.value);
  }

  function onProviderLogin(e) {
    e.preventDefault();
    console.log('AUTH', auth);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log('Logged In with', user);
      navigate('/ProviderPage', {state: {email}});
    })
    .catch(err => alert(err.message));
  };


  function onHomeClick() {
    navigate('/');
  }

  return (
    <div>
      <form onSubmit={(e) => onProviderLogin(e)}>
        <div className="dialog fixed z-50 overflow-x-hidden overflow-y-auto  bg-gray-50 rounded-lg shadow dark:bg-gray-700 border-2 border-blue-500 text-center">
              <div className="relative">
              <div className="ml-6 mt-20 font-extrabold antialiased text-3xl">Provider Login</div>
                <div id="provider-email" className="ml-6 mt-12">
                  <input className="patient-name-input dg-input" type="email" maxLength="60" placeholder="Email" onChange={(event) => {onInputChange(event, setProviderEmail)}} required />
                </div>
              <div id="patient-emailv" className="ml-6 mt-6 min-w">
                <input className="patient-email-input dg-input" type="password" maxLength="60" placeholder="Password" onChange={(event) => {onInputChange(event, setProviderPassword)}} required />
              </div>
              <button type="button" className="dg-button" onClick={onHomeClick}>MAIN</button>
              <button id="book-button" type="submit" className="dg-button">LOGIN</button>
              <div className="mt-16">Do not have an account?</div>
              <button type="button" className="sp-button mt-1" onClick={() => {navigate('/ProviderRegisterPage')}}>REGISTER</button>
              <div>
                {/*<button type="cancel" className="dg-button" onClick={onCancelClick}>BACK</button>*/}

              </div>
          </div>
        </div>
      </form>
    </div>
  )
}



