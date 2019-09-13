if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}

import { h, render } from 'preact';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Autosuggest from './components/Autosuggest';
import AutosuggestDemo from './components/AutosuggestDemo';

window.autosuggestCreateField = function(opts) {
  const { id, sources, options, type } = opts;
  render(
    <Autosuggest id={id} type={type} sources={sources} options={options} />,
    document.getElementById(`${id}-target`),
  );
};

window.autosuggestCreateDemo = function(opts) {
  const { id } = opts;
  render(<AutosuggestDemo id={id} />, document.getElementById(`${id}-target`));
};
