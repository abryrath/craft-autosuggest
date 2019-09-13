import React from 'react';

export default function SuggestionsDataList(props) {
  return (
    <datalist id={props.id}>
      {props.suggestions.all.map(sug => (
        <option key={sug.id}>{sug.title}</option>
      ))}
    </datalist>
  );
}
