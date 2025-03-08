// import React from 'react'
// import { Link, useNavigate, useMatch } from 'react-router-dom'
// import { Formik, Form, Field } from 'formik'
// import axios from 'axios'
// import { FormErrors } from '../components'
// import { useAuth } from '../hooks'

// function Auth() {
//   const navigate = useNavigate()
//   const isRegister = useMatch('/register')
//   const { login } = useAuth()

//   async function onSubmit(values, actions) {
//     try {
//       const { data } = await axios.post(`/users${isRegister ? '' : '/login'}`, { user: values })

//       login(data.user)

//       navigate('/')
//     } catch (error) {
//       const { status, data } = error.response

//       if (status === 422) {
//         actions.setErrors(data.errors)
//       }
//     }
//   }

//   const loginInitialValues = { email: '', password: '' }

//   return (
//     <div className="auth-page">
//       <div className="container page">
//         <div className="row">
//           <div className="col-md-6 offset-md-3 col-xs-12">
//             <h1 className="text-xs-center">Sign {isRegister ? 'up' : 'in'}</h1>
//             <p className="text-xs-center">
//               <Link to="/register">{isRegister ? 'Have' : 'Need'} an account?</Link>
//             </p>
//             <Formik
//               onSubmit={onSubmit}
//               initialValues={isRegister ? { ...loginInitialValues, username: '' } : loginInitialValues}
//             >
//               {({ isSubmitting }) => (
//                 <>
//                   <FormErrors />
//                   <Form>
//                     {isRegister && (
//                       <fieldset className="form-group">
//                         <Field
//                           type="text"
//                           name="username"
//                           className="form-control form-control-lg"
//                           placeholder="Your Name"
//                         />
//                       </fieldset>
//                     )}
//                     <fieldset className="form-group">
//                       <Field type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
//                     </fieldset>
//                     <fieldset className="form-group">
//                       <Field
//                         type="password"
//                         name="password"
//                         className="form-control form-control-lg"
//                         placeholder="Password"
//                       />
//                     </fieldset>
//                     <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary pull-xs-right">
//                       Sign {isRegister ? 'up' : 'in'}
//                     </button>
//                   </Form>
//                 </>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Auth

import React, { useState } from 'react';
import { Link, useNavigate, useMatch } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Auth() {
  const navigate = useNavigate();
  const isRegister = useMatch('/register');
  const [accountType, setAccountType] = useState('entrepreneur');

  const initialValues = isRegister
    ? {
        nip: '',
        companyName: '',
        street: '',
        buildingNumber: '',
        localNumber: '',
        postalCode: '',
        city: '',
        owner: '',
        email: '',
        ceidgFile: null,
        description: '',
        industry: '',
        cardNumber: '',
        password: '',
        passwordRepeat: '',
        termsAccepted: false,
      }
    : { email: '', password: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
    password: Yup.string().min(8, 'Hasło musi mieć co najmniej 8 znaków').required('Hasło jest wymagane'),
    ...(isRegister && {
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać')
        .required('Powtórzenie hasła jest wymagane'),
      termsAccepted: Yup.boolean().oneOf([true], 'Musisz zaakceptować regulamin').required('Musisz zaakceptować regulamin'),
    }),
  });

  // async function onSubmit(values) {
  //   try {
  //     const url = isRegister ? '/users' : '/users/login';
  //     const { data } = await axios.post(url, { user: values });
  //     console.log(isRegister ? 'Zarejestrowano' : 'Zalogowano', data.user);
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Błąd logowania/rejestracji', error.response);
  //   }
  // }

// poprawiona funkcja onSubmit
  async function onSubmit(values) {
    try {
      // Tworzymy użytkownika
      const { data: user } = await axios.post('/users', {
        email: values.email,
        password: values.password,
        role: accountType === 'entrepreneur' ? 'przedsiębiorca' : 'mieszkaniec',
      });
  
      // Tworzymy profil użytkownika
      await axios.post('/user_profiles', {
        user_id: user.id,
        nip: values.nip || null,
        company_name: values.companyName || null,
        address: values.street ? `${values.street} ${values.buildingNumber}` : null,
        postal_code: values.postalCode || null,
        city: values.city || null,
        industry: values.industry || null,
      });
  
      console.log('Zarejestrowano użytkownika:', user);
      navigate('/');
    } catch (error) {
      console.error('Błąd rejestracji', error.response);
    }
  }

  
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{isRegister ? 'Rejestracja' : 'Logowanie'}</h1>
            <p className="text-xs-center">
              <Link to={isRegister ? '/login' : '/register'}>
                {isRegister ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
              </Link>
            </p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  {isRegister && (
                    <>
                      <fieldset className="form-group">
                        <label className="custom-radio">
                          <Field type="radio" name="accountType" value="entrepreneur" checked={accountType === 'entrepreneur'} onChange={() => setAccountType('entrepreneur')} />
                          Rejestracja jako przedsiębiorca
                        </label>
                        <label className="custom-radio">
                          <Field type="radio" name="accountType" value="individual" checked={accountType === 'individual'} onChange={() => setAccountType('individual')} />
                          Rejestracja jako osoba fizyczna
                        </label>
                      </fieldset>
                      {accountType === 'entrepreneur' && (
                        <>
                          <div className="d-flex">
                            <Field className="form-control" type="text" name="nip" placeholder="NIP" />
                            <button type="button" className="btn btn-secondary" disabled>Dalej</button>
                          </div>
                          <Field className="form-control" type="text" name="companyName" placeholder="Nazwa firmy" />
                          <Field className="form-control" type="text" name="street" placeholder="Ulica" />
                          <Field className="form-control" type="text" name="buildingNumber" placeholder="Nr budynku" />
                          <Field className="form-control" type="text" name="postalCode" placeholder="Kod pocztowy" />
                          <Field className="form-control" type="text" name="city" placeholder="Miasto" />
                          <label>Wypis z CEIDG (PDF)</label>
                          <Field className="form-control" type="file" name="ceidgFile" />
                          <Field className="form-control" type="text" name="description" placeholder="Opis firmy" />
                          <Field className="form-control" as="select" name="industry">
                            <option value="">Wybierz branżę</option>
                            <option value="opcja1">Opcja 1</option>
                            <option value="opcja2">Opcja 2</option>
                          </Field>
                        </>
                      )}
                    </>
                  )}
                  <fieldset className="form-group">
                    <Field type="email" name="email" className="form-control" placeholder="Email" />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field type="password" name="password" className="form-control" placeholder="Hasło" />
                  </fieldset>
                  {isRegister && (
                    <fieldset className="form-group">
                      <Field type="password" name="passwordRepeat" className="form-control" placeholder="Powtórz hasło" />
                    </fieldset>
                  )}
                  {isRegister && (
                    <fieldset className="form-group">
                      <label className="custom-checkbox">
                        <input type="checkbox" name="termsAccepted" checked={values.termsAccepted} onChange={(e) => setFieldValue('termsAccepted', e.target.checked)} /> Zapoznałem się z regulaminem
                      </label>
                      <ErrorMessage name="termsAccepted" component="div" className="text-danger" />
                    </fieldset>
                  )}
                  <button type="submit" className="btn btn-lg btn-primary pull-xs-right" disabled={isSubmitting || (isRegister && !values.termsAccepted)}>
                    {isRegister ? 'Zarejestruj się' : 'Zaloguj się'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;


