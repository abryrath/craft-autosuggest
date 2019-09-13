import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import Autosuggest from './Autosuggest';

const defaultSources = {
  categories: {
    ids: [],
  },
  tags: {
    ids: [],
  },
};

const defaultOptions = {
  debug: true,
};

export default function AutosuggestDemo(props) {
  const [type, setType] = useState('styledlist');
  const [sources, setSources] = useState(defaultSources);
  const [options, setOptions] = useState(defaultOptions);

  function toggleSource(opts) {
    const { category, tag } = opts;

    if (category) {
      if (sources.categories.ids.includes(category)) {
        setSources(
          Object.assign({}, sources, {
            categories: {
              ids: sources.categories.ids.filter(c => c != category),
            },
          }),
        );
      } else {
        setSources(
          Object.assign({}, sources, {
            categories: {
              ids: [...sources.categories.ids, category],
            },
          }),
        );
      }
    }
    if (tag) {
      if (sources.tags.ids.includes(tag)) {
        setSources(
          Object.assign({}, sources, {
            tags: {
              ids: sources.tags.ids.filter(t => t != tag),
            },
          }),
        );
      } else {
        setSources(
          Object.assign({}, sources, {
            tags: {
              ids: [...sources.tags.ids, tag],
            },
          }),
        );
      }
    }
  }

  return (
    <div>
      <div>
        <div>
          <select onChange={e => setType(e.target.value)}>
            <option value="datalist">datalist</option>
            <option value="styledlist" selected>
              styledlist
            </option>
          </select>
        </div>
        <div>
          <strong>Sources</strong>
          Categories:
          <label>
            1
            <input
              type="checkbox"
              name="categories"
              onChange={() => toggleSource({ category: 1 })}
            />
          </label>
          Tags:
          <label>
            1
            <input
              type="checkbox"
              name="tags"
              onChange={() => toggleSource({ tag: 1 })}
            />
          </label>
        </div>
      </div>
      <div>
        <pre>{JSON.stringify(sources, null, 2)}</pre>
      </div>
      <Autosuggest id="demo" type={type} sources={sources} options={options} />
    </div>
  );
}
