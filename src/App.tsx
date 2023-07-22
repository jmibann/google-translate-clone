import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Stack
} from 'react-bootstrap';

import { useStore, useDebounce } from './hooks';
import { SectionType } from './types.d';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants';
import { translate } from './services';
import {
  TextArea,
  ArrowsIcon,
  SpeakerIcon,
  ClipboardIcon,
  LanguageDropdown,
 } from './components';

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedText = useDebounce(fromText, 300);

  useEffect(() => {
    if(debouncedText === '') return;
    
    translate({fromLanguage, toLanguage, text: fromText})
      .then(result => {
        if( result === null) return;
        setResult(result ?? '');
      })
      .catch(error => setResult(error))

  }, [debouncedText]);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const handleClipboard = () =>
    navigator.clipboard.writeText(result)
      .catch(error => console.log(' ==> ERROR <== ', error));

  return (
    <Container fluid>
      <h2>Google Translate Clone App</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageDropdown
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
            />

            <TextArea 
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />

          </Stack>
        </Col>
          
        <Col xs='auto'>
          <Button
            variant='link'
            disabled={ fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
            >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageDropdown
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />

            <div style={{ position: 'relative' }}>
              <TextArea 
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />

              <div style={{ position: 'absolute', left: 0, bottom:0, display: 'flex' }}>
                <Button variant='link' onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>

                <Button variant='link' onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
