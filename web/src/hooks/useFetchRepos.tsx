import { useState, useEffect } from 'react';
import { IProps } from '../store/interface';
import originalFetch from 'isomorphic-fetch';
import fetchBuilder from 'fetch-retry-ts';
import * as _ from 'lodash';

// https://www.npmjs.com/package/fetch-retry-ts
// retry fetch request every 1second if 400 error up to 3 times
const options = {
  retries: 3,
  retryDelay: 1000,
  retryOn: [400],
};

const fetch = fetchBuilder(originalFetch, options);

const useFetchRepos = () => {
  const [repos, setRepos] = useState<IProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:4000/repos';
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const responseData = await response.json();
        // lodash sort by reverse chrono
        setRepos(_.orderBy(responseData.data, 'created_at', 'desc'));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return { repos };
};

export default useFetchRepos;
