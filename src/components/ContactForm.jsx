import { useState } from 'react';
import s from './Phonebook.module.css';
export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  function onNameChange(e) {
    setName(e.currentTarget.value);
  }
  function onNumberChange(e) {
    setNumber(e.currentTarget.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(name, number);
    e.target.reset();
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className={s.fieldset}>
        <label>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onNameChange}
          />
        </label>
        <label>
          Phone
          <input
            className={s.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onNumberChange}
          />
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </fieldset>
    </form>
  );
}
