import React from 'react';

import { Form } from 'react-bootstrap';

import { SectionType } from '../types.d';

interface TextAreaProps {
  type: SectionType;
  value: string;
  onChange: (value: string) => void,
  loading?: boolean;
};

const commonStyles = { border: 0, height:'200px'};

const getPlaceholder = (type: SectionType, loading: boolean) => {
  if( type === SectionType.From ) return "Enter a text";
  if( loading ) return 'Loading...';
  
  return 'Translation';
}

const TextArea: React.FC<TextAreaProps> = ({ type, value, loading, onChange}) => {

  const styles = type === SectionType.From
    ? commonStyles
    : {...commonStyles, backgoundColor:'#f5f5f5'}

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange(e.target.value)

    return (
      <Form.Control 
        autoFocus={type === SectionType.From}
        as='textarea'
        disabled={type === SectionType.To}
        placeholder={getPlaceholder(type, loading)}
        style={styles}
        value={value}
        onChange={handleChange}
      />
    );
};

export default TextArea