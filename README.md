# React Crumbs

React Crumbs is a library of Components that are usually needed in React Applications. With it, you don't need to rewrite all the basics over and over again.

## Table of content

- [Installation](#installation)
- [Components](#components)
  - [Autocomplete](#autocomplete)
  - [DateInput](#date-input)
  - [MaskedNumberInput](#masked-number-input)
  - [NumberInput](#number-input)
  - [SearchField](#search-field)
  - [SelectInput](#select-input)
  - [Table](#table)
  - [TableRow](#table-row)
  - [TextInput](#text-input)
  - [TimeInput](#time-input)
- [Complete example](#complete-example)

## Installation

Install via npm.

`npm install react-crumbs`

## How to use

Import the wanted components in the top of the file and put them inside your component's render function.

```jsx
import react from 'react';
import {TextInput} from 'react-crumbs';

class SomeComponent extends React.Component {
    render() {
        return (
            <div>
                <TextInput
                    //  props...
                />
            </div>
        );
    }
}    
```

## Components

### Autocomplete

Autocomplete component that consumes a search service and displays the possible results for a given term.

```jsx
<Autocomplete
    name={'name'}
    label={'Label'}
    placeholder={'Describe the search'}
    toString={listToString} // Function used to map the list from search service into an array of strings.
    returnValue={onValueMatch} // Function called when the string in the search field matches a list object.
    search={callService} //  Function called when value change. Should receive a string as argument. 
/>
```
 
### DateInput

Simple Date Input.

```jsx
<DateInput
    name={'field-name'}
    label={'Field name'}
    placeholder={'Describe what the user has to type'}
    onChange={callOnChange} //  Function to call when user type something.
    value={fieldName} //  Value to keep in sync. Usually from a state attribute.
    error={fieldError} //  String to warn the user of an error in validation.     
/>
```

### Table
        

