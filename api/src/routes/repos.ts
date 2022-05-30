import { Router, Request, Response } from 'express';
const fs = require('fs');
const path = require('path');
export const repos = Router();

// fetch from local repo
const localRepoPath = fs.readFileSync(
  path.resolve(__dirname, '../../data/repos.json')
);

const localRepo = JSON.parse(localRepoPath);

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json([localRepo]);
});
