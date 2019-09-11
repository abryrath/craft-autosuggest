import Axios from 'axios';

const axios = Axios.create({
    baseURL: '/actions/autosuggest',
    headers: {
        Accept: 'application/json'
    }
});

export default axios;