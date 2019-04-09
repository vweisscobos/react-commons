# React Commons

React Commons is a library of Components that are usually needed in React Applications. With it, you don't need to rewrite all the basics over and over again.

## Table of content

- [Installation](#installation)
- [Inputs](#inputs)
  - [Date Input](#date-input)
  - [Dumb Autocomplete](#dumb-autocomplete)
  - [Masked Number Input](#masked-number-input)
  - [Number Input](#number-input)
  - [Search Field](#search-field)
  - [Select Input](#select-input)
  - [Table](#table)
  - [Table Row](#table-row)
  - [Text Input](#text-input)
  - [Time Input](#time-input)

## Installation

## Components
 
### Inputs

All the available inputs are related in the complete example below

```jsx
import React from 'react';
import {
    DateInput,
    NumberInput,
    SelectInput,
    TextInput,
    TimeInput
} from 'react-commons';

class Form extends React.Components {
    constructor() {
        super();
        
        this.state = {
            name: '',
            errors: {}
        };
    }
    
    onFormFieldChange(evt) {
        let newState = Object.assign({}, this.state);
        newState[evt.target.name] = evt.target.value;
        this.setState(state);
    }

    render() {
        return (
            <form>
                <TextInput
                    name={'name'}
                    label={'Name'}
                    placeholded={'Type your name'}
                    onChange={this.onFormFieldChange}
                    value={this.state.name}
                    error={this.state.errors.name}
                />
                //  birthday
                //  number of fingers
                //  race
                //  what's time is it?
            </form>
        );
    }
}
```

### Table
        

