import React from 'react';
import { Form } from 'react-bootstrap'

import { SectionType, type FromLanguage, type Language } from '../types.d'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';

type LanguageDropProps = 
  | { type: SectionType.From, value:FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

const LanguageDrop: React.FC<LanguageDropProps> = ({value, onChange, type}) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange( e.target.value as Language);

    return (
      <Form.Select aria-label='Select language' onChange={handleOnChange} value={value}>
        { type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect Language</option> }

        {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
          <option key={key} value={key}>{literal}</option>
        ))}

      </Form.Select>
    );
};

export default LanguageDrop