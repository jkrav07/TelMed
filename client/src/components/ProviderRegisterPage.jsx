import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


export default function ProviderRegisterPage() {
  const navigate = useNavigate();
  const [email, setProviderEmail] = useState('');
  const [password, setProviderPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [licenseN, setLicenseN] = useState('');
  const [credentials, setCredentials] = useState('');


  function onInputChange(event, set) {
      set(event.target.value);
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log('Signed up with', user);
        const newUser = {
          email,
          fullname,
          licenseN,
          credentials,
        };
        console.log('NEW USER OBJ:', newUser);
        // axios.post('/api/register', newUser)
        //   .then(() => {
        //     alert('You have been registered!');
        //     navigation.navigate('Login');
        //   });
        navigate('/ProviderLoginPage');
        alert('You have been registered!');

      })
      .catch((err) => alert(err.message));
  };


  function onHomeClick() {
    navigate('/ProviderLoginPage');
  }

  return (
    <div>
      <form onSubmit={(e) => handleSignUp(e)}>
        <div className="dialog fixed z-50 overflow-x-hidden overflow-y-auto  bg-gray-50 rounded-lg shadow dark:bg-gray-700  border-2 border-blue-500 text-center">
              <div className="relative">
                <div className="ml-6 mt-20 font-extrabold antialiased text-3xl">Provider Registration</div>
                <div id="provider-email" className="ml-6 mt-12">
                  <input className="patient-name-input dg-input" type="email" maxLength="60" placeholder="Email" onChange={(event) => {onInputChange(event, setProviderEmail)}} required />
                </div>

                <div id="patient-emailv" className="ml-6 mt-6 min-w">
                  <input className="patient-email-input dg-input" type="password" maxLength="60" placeholder="Password" onChange={(event) => {onInputChange(event, setProviderPassword)}} required />
                </div>

                <div id="patient-emailv" className="ml-6 mt-6 min-w">
                  <input className="patient-email-input dg-input" type="text" maxLength="60" placeholder="Firstname Lastname" onChange={(event) => {onInputChange(event, setFullname)}} required />
                </div>

                <div id="patient-emailv" className="ml-6 mt-6 min-w">
                  <input className="patient-email-input dg-input" type="text" maxLength="60" placeholder="License Number" onChange={(event) => {onInputChange(event, setLicenseN)}} required />
                </div>

                <div id="patient-emailv" className="ml-6 mt-6 min-w">
                  <input className="patient-email-input dg-input" type="text" maxLength="60" placeholder="Credentials (ex: NP, MD, DO)" onChange={(event) => {onInputChange(event, setCredentials)}} required />
                </div>

                <button id="book-home" type="button" className="dg-button" onClick={onHomeClick}>BACK</button>
                <button id="book-button" type="submit" className="dg-button">REGISTER</button>

                  {/*
                  <div className="mt-16">Do not have an account?</div>
                  <button id="book-button" type="button" className="sp-button mt-1" onClick={() => {navigate('/ProviderRegisterPage')}}>REGISTER</button>
                  <div>
                    <button type="cancel" className="dg-button" onClick={onCancelClick}>BACK</button>*/}

              </div>
        </div>
      </form>
    </div>
  )
}



