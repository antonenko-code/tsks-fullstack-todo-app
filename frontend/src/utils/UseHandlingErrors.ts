import React, { useState } from 'react';

export enum InputNames {
  Email = 'email',
  Password = 'password',
  RepeatPassword ='repeatPassword',
  FirstName = 'firstName',
  SecondName = 'secondName',
  CollectionName = 'collectionName',
  TodoName= 'todoName'
}

export const UseHandlingErrors = () => {
  const [errors, setErrors] = useState(new Map<string, string | null>());
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validate = (event: React.ChangeEvent<HTMLInputElement>, name: string, value: string) => {
    switch (name) {
      case InputNames.Email: {
        if (value.trim().length === 0) {
          setErrors(prevState =>
            prevState.set(name, `Field can't be empty`));
        } else if (!isValidEmail(value)) {
          setErrors(prevState =>
            prevState.set(name, `Email is invalid`));
        } else {
          setErrors(prevState => {
            prevState.delete(name)
            return prevState;
          });
        }
        break
      }
      case InputNames.RepeatPassword:
      case InputNames.Password: {
        if (value.trim().length === 0) {
          setErrors(prevState =>
            prevState.set(name, `Field can't be empty`));
        } else if (value.length < 8) {
          setErrors(prevState =>
            prevState.set(name, `Password can't be less than 8 characters`));
        } else {
          setErrors(prevState => {
            prevState.delete(name)
            return prevState;
          });
        }
        break
      }
      case InputNames.TodoName:
      case InputNames.FirstName:
      case InputNames.SecondName:
      case InputNames.CollectionName: {
        if (value.trim().length === 0) {
          setErrors(prevState =>
            prevState.set(name, `Field can't be empty`));
        } else if (value.length < 2) {
          setErrors(prevState =>
            prevState.set(name, `Text can't be less than 2 characters`));
        } else {
          setErrors(prevState => {
            prevState.delete(name)
            return prevState;
          });        }
        break
      }
    }
  };

  const onChangeValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    let { name, value } = event.target;
    validate(event, name, value);
  };

  const onSubmitValidation = (data: object, keys: string[]) => {
    Object.entries(data).forEach(entry => {
      const [key, value] = entry;
      if (keys.includes(key) && (!value || value.length === 0)) {
        setErrors(prevState =>
        prevState.set(key, 'Please, enter some text'))
      }
    })
  };

  return({
    errors, onChangeValidation, onSubmitValidation });
};
