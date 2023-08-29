import React, { useState } from 'react';

export enum InputNames {
  Email = 'Email',
  Password = 'Password',
  RepeatPassword ='Repeat password',
  FirstName = 'First name',
  SecondName = 'Second name',
  CollectionName = 'Collection name'
}

export const useForm = () => {
  const values = new Map<string, string>();
  const [errors] = useState(new Map<string, string | null>());
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  }
  const validate = (event: React.ChangeEvent<HTMLInputElement>, name: string, value: string) => {
    switch (name) {
      case InputNames.Email: {
        if (!value.trim().length) {
          errors.set(name, `${name} can't be empty`)
        } else if(!isValidEmail(value)) {
          errors.set(name, `Email is invalid`)
        } else {
          errors.delete(name)
        }
        break
      }
      case InputNames.RepeatPassword:
      case InputNames.Password: {
        if(!value.trim().length) {
          errors.set(name, `${name} can't be empty`)
        } else if (value.length < 8) {
          errors.set(name, `Password can't be less than 8 characters`)
        } else {
          errors.delete(name)
        }
        break
      }
      case InputNames.FirstName:
      case InputNames.SecondName:
      case InputNames.CollectionName: {
        if(!value.trim().length) {
          errors.set(name, `${name} can't be empty`)
        } else if (value.length < 3) {
          errors.set(name, `${name} can't be less than 2 characters`)
        } else {
          errors.delete(name)
        }
        break
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    let name = event.target.name;
    let value = event.target.value;

    validate(event, name, value);
    values.set(name, value)
  }

  return({ values, errors, onChange });
}
