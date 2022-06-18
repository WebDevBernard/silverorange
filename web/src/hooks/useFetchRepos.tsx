import { useState, useEffect } from 'react';
import { Repo, Commit } from '../store/interface';
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
  const [selected, setSelected] = useState('');
  const [commitInfo, setCommitInfo] = useState<Commit[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);

  const handleChange = (url: string) => {
    setSelected(url);
  };
  useEffect(() => {
    const fetchRepos = async () => {
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

    const fetchCommit = async () => {
      const url = `${selected}/commits`;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response Status: ${response.status}`);
        }
        const responseData = await response.json();
        // lodash function gets the most recent date
        const getMostRecent = _.maxBy(responseData, (o: Commit) => {
          return o.commit.author.date;
        });
        console.log(getMostRecent);
        // setCommitInfo(getMostRecent);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommit();
    fetchRepos();
  }, [selected]);

  return { repos, commitInfo, handleChange };
};

export default useFetchRepos;
