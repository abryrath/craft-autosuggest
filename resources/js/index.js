import React from 'react';
import ReactDOM from 'react-dom';
import "core-js/stable";
import "regenerator-runtime/runtime";
import Autosuggest from './components/Autosuggest';

window.autosuggestCreateField = function(opts) {
  const { id, sources, options, type } = opts;
  ReactDOM.render(
    <Autosuggest id={id} type={type} sources={sources} options={options} />,
    document.getElementById(`${id}-target`),
  );
};

