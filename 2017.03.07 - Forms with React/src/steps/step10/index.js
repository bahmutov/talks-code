import React from 'react';


let Select = ({ options, ...props }) => (
  <select {...props}>
    {options.map(({ label, value }, i) => (
      <option key={i} value={value}>{label || value}</option>
    ))}
  </select>
);

let Textarea = ({ value, ...props }) => (
  <textarea {...props} />
);

let Input = ({ ...props }) => (
  <input {...props} />
);

let RadioGroup = ({ value: fieldValue, options, name, id, ...props }) => (
  <ul>
    {options.map(({ label, value }, i) => (
      <li key={i}>
        <label>
          <input type="radio" name={name} value={value} checked={value === fieldValue} {...props} /> {label || value}
        </label>
      </li>
    ))}
  </ul>
);

const INPUTS = {
  'textarea': Textarea,
  'select': Select,
  'text': Input,
  'radioGroup': RadioGroup,
};

let Field = ({ name, input, label, ...props }) => {
  const Component = typeof input === 'function' ? input : INPUTS[input] || Input;
  const inputProps = Component === Input ? { type: input, ...props } : props;

  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <Component id={name} name={name} {...inputProps} />
    </div>
  );
};

Field.defaultProps = {
  input: 'text',
};

const LENGTH_OPTIONS = [
  {value: 15, label: '15 minutes'},
  {value: 30, label: '30 minutes'},
  {value: 45, label: '45 minutes'},
];

const VIA_OPTIONS = [
  {value:'email', label: 'Email'},
  {value:'push', label: 'Push notification'},
  {value:'phone', label: 'Phone'},
];

export default class SubmissionForm extends React.Component {
  state = {
    fields: {
      speakerName: '',
      speakerEmail: '',
      talkTitle: '',
      talkDescription: '',
      talkLength: '15',
    },
    isSumitting: false,
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Speaker</h2>
        <Field name="speakerName" label="Name" value={this.state.fields.speakerName} onChange={this.handleInputChange} />
        <Field name="speakerEmail" label="Email" input="email" value={this.state.fields.speakerEmail} onChange={this.handleInputChange} />
        <h2>Talk</h2>
        <Field name="talkTitle" label="Title" value={this.state.fields.talkTitle} onChange={this.handleInputChange} />
        <Field name="talkDescription" label="Description" input="textarea" value={this.state.fields.talkDescription} onChange={this.handleInputChange} />
        <Field name="talkLength" label="Length" input="select" options={LENGTH_OPTIONS} value={this.state.fields.talkLength} onChange={this.handleInputChange} />
        <Field name="notifyVia" label="Notify me via" input="radioGroup" options={VIA_OPTIONS} value={this.state.fields.notifyVia} onChange={this.handleInputChange} />
        <input type="submit" value="Submit" disabled={this.state.isSubmitting} />
      </form>
    );
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const fields = {
      ...this.state.fields,
      [name]: value
    };

    this.setState({ fields });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });

    await remoteCall(this.state.fields);
  };
}

async function remoteCall(values) {
  // simulate remote call
  console.log(values);
}
