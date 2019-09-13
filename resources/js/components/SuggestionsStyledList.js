import React from 'react';

export default function SuggestionsStyledList(props) {
  const wrapperStyles = {
    position: 'relative',
    display: 'inline-block',
  };

  const listStyles = {
    position: 'absolute',
    zIndex: 2,
    top: '100%',
    borderTop: 'none',
    borderBottom: 'none',
    border: '1px solid #888',
    left: 0,
    right: 0,
  };

  const listItemStyles = {
    padding: '10px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #888',
  };

  const selectedListItemStyles = {
    ...listItemStyles,
    backgroundColor: 'red',
  };

  const { id, children, suggestions, selected } = props;
  return (
    <div id={id} style={wrapperStyles}>
      {children}
      {suggestions.all.length ? (
        <div style={listStyles}>
          {suggestions.all.map((sug, i) => (
            <div
              key={sug.id}
              style={
                i === selected
                  ? selectedListItemStyles
                  : listItemStyles
              }
            >
              {sug.title}
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
