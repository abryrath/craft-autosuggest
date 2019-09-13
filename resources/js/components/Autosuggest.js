import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
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

  //   const [tagGroupId, setTagGroupId] = useState([]);
  const [tags, setTags] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchSources() {
      if (props.sources) {
        const requests = [];
        if (props.sources.tags) {
          console.log('fetch tags');
          const { ids } = props.sources.tags;
          //   const { data } =
          requests.push(
            axios.post('tags/search-for-tags', {
              tagGroupId: ids,
            }),
          );
          //   setTags(data);
        }
        if (props.sources.categories) {
          console.log('fetch categories');
          const { ids } = props.sources.categories;
          requests.push(
            axios.post('categories/search-for-categories', {
              categoryGroupId: ids,
            }),
          );
        }
        const responses = await Promise.all(requests);
        responses.forEach(response => {
          if (response.config.url.indexOf('search-for-tags') >= 0) {
            setTags(response.data);
          } else if (
            response.config.url.indexOf('search-for-categories') >= 0
          ) {
            setCategories(response.data);
          }
        });
        console.log(responses);
      }
    }

    fetchSources();
  }, []);

  useEffect(() => {
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
          <SuggestionsStyledList
            suggestions={suggestions}
            id={listId}
            selected={selected}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
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
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            list={listId}
          />
          <SuggestionsDataList suggestions={suggestions} id={listId} />
        </div>
      );
  }
}
