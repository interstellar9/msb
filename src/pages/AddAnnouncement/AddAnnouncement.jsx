// src/pages/AddAnnouncement/AddAnnouncement.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import agent from '../../api/agent';

const AddAnnouncement = () => {
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Tytuł jest wymagany'),
    description: Yup.string().required('Opis jest wymagany'),
    body: Yup.string().required('Treść jest wymagana'),
    tagList: Yup.string(),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const announcementData = {
      ...values,
      tagList: values.tagList.split(',').map((tag) => tag.trim()),
    };

    agent.Articles.create(announcementData)
      .then((response) => {
        console.log('Ogłoszenie dodane:', response.article);
        resetForm();
      })
      .catch((error) => {
        console.error('Błąd podczas dodawania ogłoszenia:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="add-announcement-page">
      <h1>Dodaj nowe ogłoszenie</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Tytuł</label>
              <Field name="title" type="text" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <label htmlFor="description">Opis</label>
              <Field name="description" type="text" />
              <ErrorMessage name="description" component="div" />
            </div>
            <div>
              <label htmlFor="body">Treść</label>
              <Field name="body" as="textarea" />
              <ErrorMessage name="body" component="div" />
            </div>
            <div>
              <label htmlFor="tagList">Tagi (oddzielone przecinkami)</label>
              <Field name="tagList" type="text" />
              <ErrorMessage name="tagList" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Dodaj ogłoszenie
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAnnouncement;
