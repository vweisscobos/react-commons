# React Commons

React Commons is a library of Components that are usually needed in React Applications. With it, you don't need to rewrite all the basics over and over again.

## Table of content

- [Installation](#installation)
- [Components](#components)
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
- [Complete example](#complete-example)

## Installation

## Components
 
### Date Input

Simple Date Input

```jsx
<DateInput
    name={'field-name'}
    label={'Field name'}
    placeholder={'Describe what the user has to type'}
    onChange={callOnChange} //  Function to call when user type something.
    value={fieldName} //    Value to keep in sync. Usually from a state attribute.
    error={fieldError} //   String to warn the user of an error in validation.     
/>
```

Check a [Live Example](http://localhost:80).

### Table
        

