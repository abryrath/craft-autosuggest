import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from './components/Autosuggest';

window.autosuggestCreateField = function(opts) {
  const { id, sources, options } = opts;
  ReactDOM.render(
    <Autosuggest sources={sources} options={options} />,
    document.getElementById(`${id}-target`),
  );
};

