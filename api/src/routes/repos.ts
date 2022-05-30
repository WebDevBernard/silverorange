import axios from 'axios';
import { Repo } from '../models/Repo';
import { Router, Request, Response } from 'express';
const fs = require('fs');
const path = require('path');
export const repos = Router();

// fetch from api repo
const getApiRepos = async () => {
  try {
    const response = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );

    response.data.map((repo: Repo) => getRepos.push(repo));
  } catch (err) {
    console.log(err);
  }
};
getApiRepos();

// fetch from local repo
const localRepoPath = fs.readFileSync(
  path.resolve(__dirname, '../../data/repos.json')
);

const getRepos: Repo[] = JSON.parse(localRepoPath);

// helper function -- Only return repositories where `repository.fork` is `false`

const filterForRepoFork = (i: Repo[]) => i.filter((repo) => !repo.fork);

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json({ data: filterForRepoFork(getRepos) });
});
