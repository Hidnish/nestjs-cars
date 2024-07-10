import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => { // configured inside the jest-e2e.json
  try {
    await rm(join(__dirname, '..', 'test.sqlite')); // __dirname is a reference to the /test folder -> go up one dir '..' -> find the test.sqlite file
  } catch (err) {
    // if test.sqlite is not found, there is no need to throw error
  } 
});