// import React from 'react';
import { h, render } from 'preact';

export default function SuggestionsDataList(props) {
  return (
    <datalist id={props.id}>
      {props.suggestions.all.map(sug => (
        <option key={sug.id}>{sug.title}</option>
      ))}
    </datalist>
  );
}
