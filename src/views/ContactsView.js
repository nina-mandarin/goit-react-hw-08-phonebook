import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { CSSTransition } from 'react-transition-group';

import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Filter from '../components/Filter';
import Alert from '../components/Alert';
import PageTitle from '../components/PageTitle';
import Spinner from '../components/Spinner';
import contactsSelectors from '../redux/phonebook/contactsSelectors';
import phonebookActions from '../redux/phonebook/phonebookActions';

import styles from './ContactsView.module.css';

const ContactsView = ({ loading, error, hideError }) => (
  <>
    <Alert show={error} onHide={hideError} text="Contact already exists!" />

    <Box mb={5}>
      <PageTitle title="Phonebook" />
      <ContactForm />
    </Box>

    {loading && <Spinner />}

    <Box>
      <CSSTransition
        in={true}
        appear={true}
        timeout={800}
        classNames={styles}
        unmountOnExit
      >
        <Typography variant="h3">Contacts</Typography>
      </CSSTransition>
      <Filter />
      <ContactList />
    </Box>
  </>
);

const mapStateToProps = state => ({
  loading: contactsSelectors.getLoading(state),
  error: contactsSelectors.getError(state)
});

const mapDispatchToprops = {
  hideError: phonebookActions.hideError,
};

export default connect(mapStateToProps, mapDispatchToprops)(ContactsView);