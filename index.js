import React from 'react';
import PropTypes from 'prop-types';

/*
 * Use with smart autocomplete component. This component just show the list of search results
 * onChange: function to call when the user change the input value.
 * onSelect: function to be call when the user select a value from the list
 */
const DumbAutocomplete = ({onChange, placeholder, onSelect, value, data, name, label}) => {

  const onListItemClicked = (evt) => {
    onSelect(evt.currentTarget.rowIndex);
  };

  const testSearchMatch = () => {
    return data.length === 1  && value === data[0];
  };

  return <div
    className={'ga-autocomplete ga-form-group'}
  >
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      className={'ga-form-control ga-autocomplete__input'}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
    <table
      className={'ga-autocomplete__list'}
      style={{
        visibility: testSearchMatch() || value.trim() === '' ? 'hidden' : 'visible'
      }}
    >
      {
        data.map((res, index) => {
          return <tr
            key={index}
            onClick={onListItemClicked}
          >
            <td>{res}</td>
          </tr>;
        })
      }
    </table>
  </div>;
};

DumbAutocomplete.propTypes = {
  search: PropTypes.func,
  onResponse: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  data: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string
};

/*
 * Input number that receives a mask for formatted doc number of phone number
 * mask: string with a 'd' where it should be a number. Ex: (dd) ddddd dddd or ddd.ddd.ddd-dd
 */
const MaskedNumberInput = ({name, label, onChange, placeholder, value, mask, error}) => {
  let wrapperClass = 'ga-form-group';
  let formatted  = '';
  let lastReplaced = 0;
  let maxLength = mask.match(/d/g).length;

  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }

  for (let i = 0; i < mask.length; i++) {
    if (lastReplaced === value.length) {
      break;
    }

    if (mask.charAt(i) === 'd') {
      formatted += value.charAt(lastReplaced);
      lastReplaced++;
    } else {
      formatted += mask.charAt(i);
    }
  }

  const onKeyup = (evt) => {
    if (value.length >= maxLength) {
      evt.preventDefault();
    }

    if (evt.keyCode === 8) {
      evt.target.value = value.slice(0, -1);
      onChange(evt);
    }

    if (Number.isInteger(parseInt(evt.key)) && !(value.length >= maxLength)) {
      evt.target.value = value + evt.key;
      onChange(evt);
    }
  };

  return <div className={wrapperClass}>
    <label htmlFor={name}>{label}</label>
    <div className={'ga-form-field'}>
      <input
        type={'text'}
        name={name}
        className={'ga-form-control'}
        placeholder={placeholder}
        value={formatted}
        onKeyUp={onKeyup}
      />
      {error && <div className={'alert alert-danger'}>{error}</div>}
    </div>
  </div>;
};

MaskedNumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  mask: PropTypes.string,
  error: PropTypes.string
};

/*
 * Input for pure numbers
 */
const NumberInput = ({name, label, onChange, placeholder, value, error, min, max, step, disabled}) => {
  let wrapperClass='ga-form-group';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className={'ga-form-field'}>
        <input
          type={'number'}
          name={name}
          className={'ga-form-control'}
          placeholder={placeholder}
          value={value}
          min={min + ''}
          max={max + ''}
          step={step + ''}
          disabled={disabled}
          onChange={onChange} />
        { error && <div className={'alert alert-danger'}>{error}</div> }
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  error: PropTypes.string
};

const SearchField = ({placeholder, label, name, search, onResponse}) => {
  const TYPING_DELAY = 500;
  let lastChange = Date.now();
  let searchSchedule;

  const onValueChange = (evt) => {
    let value = evt.target.value;

    if (Date.now() - lastChange < TYPING_DELAY) {
      clearTimeout(searchSchedule);
    }

    searchSchedule = setTimeout(() => {
      callSearch(value);
    }, TYPING_DELAY);
    lastChange = Date.now();
  };

  const callSearch = (value) => {
    search(value)
      .then(
        res => onResponse(res),
        err => console.log(err)
      );
  };

  return <div className={'ga-form-group'}>
    <label htmlFor={name}>{label}</label>
    <input
      placeholder={placeholder}
      className={'ga-form-control'}
      type={'text'}
      onChange={onValueChange}
    />
  </div>;
};

export default SearchField;

const Section = ({title, path, subsections, location}) => {
  let activePath = location.split('/');

  activePath = activePath[activePath.length - 1];

  return <section className={'ga-section'}>
    <h1>{title}</h1>
    <nav className={'ga-section__navigation'}>
      {
        subsections.map((subsection, index) => {
          return <div
            key={index}
            className={`ga-section__navigation__link ${(subsection.path === activePath ? 'ga-section__navigation__link-active' : '')}`}
          >
            <Link to={`/${path}/` + subsection.path}>{subsection.label}</Link>
          </div>;
        })
      }
    </nav>
    <div className={'ga-section__subsection'}>
      {
        subsections.map((subsection, index) => {
          return <Route
            key={index}
            path={`/${path}/` + subsection.path}
            component={subsection.component}/>;
        })
      }
    </div>
  </section>;
};

Section.propTypes = {
  paths: PropTypes.array,
  components: PropTypes.array
};

export default Section;


const SelectInput = ({ name, label, onChange, options, value, defaultOption, error}) => {
  return (
    <div className={'ga-form-group'}>
      <label htmlFor={name}>{label}</label>
      <div className={'ga-form-field'}>
        <select
          className={'ga-form-control'}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value={''}>{ defaultOption }</option>
          {
            options.map((option, index) => {
              return <option
                key={index}
                value={option.value}
              >
                {option.text}
              </option>;
            })
          }
        </select>
        { error && <div className={'alert alert-danger'}>{error}</div> }
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;


const TYPING_DELAY = 300;
let lastChange = Date.now();
let searchSchedule = null;

class SmartAutoComplete extends React.Component {
  constructor() {
    super();

    this.state = {
      searchedTerm: '',
      searchResults: [],
      readyToSend: null
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.scheduleSearch = this.scheduleSearch.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.callSearch = this.callSearch.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(value) {
    this.setState({
      searchedTerm: value
    }, this.scheduleSearch);
  }

  onSearchChange(evt) {
    this.updateSearch(evt.target.value);
  }

  onItemSelect(index) {
    let newSearchedValue = this.state.searchResults[index];

    this.updateSearch(this.props.toString(newSearchedValue));
  }

  scheduleSearch() {
    if (this.state.searchedTerm.length === 1) {
      lastChange = Date.now();
      return;
    }

    if (lastChange - Date.now() < TYPING_DELAY) {
      clearTimeout(searchSchedule);
    }

    searchSchedule = setTimeout(this.callSearch);
    lastChange = Date.now();
  }

  callSearch() {
    this.props.search(this.state.searchedTerm)
      .then(this.updateResults)
      .catch(console.log);
  }

  updateResults(results) {
    if (this.state.searchedTerm.trim() === '') {
      results = [];
    }

    this.setState({
      searchResults: results
    }, () => {
      if (this.state.searchResults.length === 1 &&
        this.props.toString(this.state.searchResults[0]) === this.state.searchedTerm) {
        this.props.returnValue(this.state.searchResults[0]);
      } else {
        this.props.returnValue(null);
      }
    });
  }

  render() {
    const {
      name,
      label,
      placeholder,
      toString
    } = this.props;

    const {
      searchedTerm,
      searchResults
    } = this.state;

    return <DumbAutocomplete
      onChange={this.onSearchChange}
      placeholder={placeholder}
      onSelect={this.onItemSelect}
      value={searchedTerm}
      data={searchResults.map(toString)}
      name={name}
      label={label}
    />;
  }
}

SmartAutoComplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  toString: PropTypes.func,
  returnValue: PropTypes.func,
  search: PropTypes.func
};

export default SmartAutoComplete;

const Table = ({data, labels, attributesMap, onRowClick, selectedRow}) => {
  if (labels.length !== attributesMap.length) {
    throw new Error('Invalid number of labels/attributes');
  }

  return <div className={'ga-table-wrapper'}>
    <table className={'ga-table'}>
      <thead className={'ga-table__header'}>
      <tr className={'ga-table__row'}>
        {
          labels.map((label, index) => {
            return <th key={index}>{label}</th>;
          })
        }
      </tr>
      </thead>
      <tbody className={'ga-table__body'}>
      {
        data.map((row, index) => {
          return <TableRow
            key={index}
            obj={row}
            onRowClick={onRowClick}
            attributes={attributesMap}
            selectedRow={selectedRow}
            index={index}
          />;
        })
      }
      </tbody>
    </table>
  </div>;
};

export default Table;

const TableRow = ({obj, attributes, onRowClick, selectedRow, index}) => {
  return <tr
    onClick={onRowClick}
    className={'ga-table__row' + (selectedRow === index ? ' ga-table__row-selected' : '')}
  >
    {
      attributes.map((attr, index) => {
        return <td key={index}>{obj[attr]}</td>;
      })
    }
  </tr>;
};

export default TableRow;

const TextInput = ({name, label, onChange, placeholder, value, error}) => {
  let wrapperClass = 'ga-form-group';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className={'ga-form-field'}>
        <input
          type={'text'}
          name={name}
          className={'ga-form-control'}
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
        {error && <div className={'alert alert-danger'}>{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;

const DateInput = ({name, label, onChange, placeholder, value, error}) => {
  let wrapperClass = 'ga-form-group';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className={'ga-form-field'}>
        <input
          type={'time'}
          name={name}
          className={'ga-form-control'}
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
        {error && <div className={'alert alert-danger'}>{error}</div>}
      </div>
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default DumbAutocomplete;
export default DateInput;
export default MaskedNumberInput;
export default NumberInput;