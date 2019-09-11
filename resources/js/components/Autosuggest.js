import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import axios from '../utils/axios';

export default function Autosuggest(props) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [tagGroupId, setTagGroupId] = useState([]);
  //   const [tags, setTags] = useState([]);
  //   const [{error: tagError, loading: tagLoading, data: allTags}, refetchTags] = useAxios({
  //       url: '/actions/craftcms/tags/search-for-tags',
  //       method: 'post',
  //       headers: {
  //           'Accepts': 'application/json'
  //       },
  //       data: {
  //           tagGroupId: props.sources.tags,
  //       }
  //   }, { manual: true });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      console.log(props);
      if (props.sources) {
        if (props.sources.tags) {
          console.log('fetch tags');
          const tagGroups = props.sources.tags;
          setTagGroupId(tagGroups);
          const { data } = await axios.post('tags/search-for-tags', {
            tagGroupId: tagGroups,
          });
          setTags(data);
        }
      }
    }
    fetchTags();
  }, []);

  useEffect(() => {
    console.log('input changed', input);
    const matchingTags = tags.filter(
      candidate =>
        candidate.title.toLowerCase().indexOf(input.toLowerCase()) > -1,
    );

    setSuggestions([...matchingTags]);
  }, [input]);

  return (
    <div className="Autosuggest">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <ul>
        {suggestions.map(sug => (
          <li key={sug.id}>{sug.title}</li>
        ))}
      </ul>
    </div>
  );
}
