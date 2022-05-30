import { useState, useEffect } from 'react';
import { IProps } from '../store/interface';
import * as _ from 'lodash';

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
