// import React, { useState, useEffect } from 'react';
import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from '../utils/axios';
import Axios from 'axios';
import SuggestionsDataList from './SuggestionsDataList';
import SuggestionsStyledList from './SuggestionsStyledList';

const defaultSuggestions = {
  tags: [],
  categories: [],
  all: [],
};

export default function Autosuggest(props) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState(defaultSuggestions);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  async function fetchSources() {
    if (props.sources) {
      const requests = [];
      const callbacks = [];
      if (props.sources.tags) {
        console.log('fetch tags');
        const { ids } = props.sources.tags;
        requests.push(
          axios.post('tags/search-for-tags', {
            tagGroupId: ids,
          }),
        );
        callbacks.push(data => setTags(data));
      }
      if (props.sources.categories) {
        console.log('fetch categories');
        const { ids } = props.sources.categories;
        requests.push(
          axios.post('categories/search-for-categories', {
            categoryGroupId: ids,
          }),
        );
        callbacks.push(data => setCategories(data));
      }

      console.log(requests);
      Axios.all(requests).then(
        Axios.spread((...args) => {
          args.map((resp, i) => {
            callbacks[i](resp.data);
          });
        }),
      );
    }
  }

  useEffect(() => {
    console.log('sources changed', props.sources);
    fetchSources();
  }, [props.sources]);

  useEffect(() => {
    console.log('input changed', input);
    if (!input) {
      setSuggestions(defaultSuggestions);
      return;
    }
    const matchingTags = tags
      .filter(
        candidate =>
          candidate.title.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      )
      .filter(
        candidate => candidate.title.toLowerCase() !== input.toLowerCase(),
      );
    const matchingCategories = categories
      .filter(
        candidate =>
          candidate.title.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      )
      .filter(
        candidate => candidate.title.toLowerCase() !== input.toLowerCase(),
      );

    setSuggestions({
      tags: matchingTags,
      categories: matchingTags,
      all: [...matchingTags, ...matchingCategories],
    });
  }, [input]);

  const displayType = props.type || 'datalist';
  const wrapperClasses = `Autosuggest ${props.wrapperClass || ''}`;
  const { debug } = props.options;
  const debugOutput = debug ? (
    <div>
      Suggestions: <pre>{JSON.stringify(suggestions, null, 2)}</pre>
    </div>
  ) : (
    ''
  );
  switch (displayType.toLowerCase()) {
    case 'styledlist':
      const [selected, setSelected] = useState(0);
      function keydownListener(e) {
        const { keyCode } = e;
        console.log(keyCode);
        switch (keyCode) {
          case 40: // Down
            if (selected + 1 < suggestions.all.length) {
              setSelected(selected + 1);
            }
            break;
          case 38: // Up
            if (selected - 1 >= 0) {
              setSelected(selected - 1);
            }
            break;
          case 39: // Right
          case 13: // Enter
            const value = suggestions.all[selected];
            console.log(value);
            setInput(value.title);
            setSuggestions(defaultSuggestions);
          default:
            return;
        }
      }

      return (
        <div className={wrapperClasses} id={props.id}>
          {debugOutput}
          <SuggestionsStyledList
            suggestions={suggestions}
            id={listId}
            selected={selected}
          >
            <input
              type="text"
              value={input}
              onKeyUp={e => setInput(e.target.value)}
              onKeyDown={keydownListener}
            />
          </SuggestionsStyledList>
        </div>
      );

    case 'datalist':
    default:
      const listId = `${props.id}-list`;
      return (
        <div className={wrapperClasses} id={props.id}>
          {debugOutput}
          <input
            type="text"
            value={input}
            onKeyUp={e => setInput(e.target.value)}
            list={listId}
          />
          <SuggestionsDataList suggestions={suggestions} id={listId} />
        </div>
      );
  }
}
