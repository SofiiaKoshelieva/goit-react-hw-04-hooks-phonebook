import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
export default function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        {
          id: 'id-1',
          name: 'Rosie Simpson',
          number: '459-12-56',
        },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  function addContact(name, number) {
    let isNameAlreadyExists = contacts.find(element => element.name === name);
    if (isNameAlreadyExists) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => {
      return [
        ...prevState,
        {
          name: name,
          id: nanoid(),
          number: number,
        },
      ];
    });
  }

  function changeFilter(e) {
    setFilter(e.currentTarget.value);
  }

  function filterContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  function deleteContact(contactId) {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <ContactList contacts={filterContacts()} deleteContacts={deleteContact} />
      <Filter value={filter} onChange={changeFilter} />
    </div>
  );
}
