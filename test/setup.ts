import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'car_pricing_test.sqlite'));
  } catch (err) {
    console.log(err);
  }
});
