import _ from 'lodash/fp';
import faker from 'faker';

const NUM_GENERATED_EMPLOYEES = 100;
const ARTIFICIAL_DELAY = 2000;

const employees = _.times(() => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  jobTitle: faker.name.jobTitle()
}))(NUM_GENERATED_EMPLOYEES);

export const getAll = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(employees);
  }, ARTIFICIAL_DELAY);
});

export const fire = employeeId => new Promise(resolve => {
  setTimeout(() => {
    _.remove(employee => employee.id === employeeId)(employees);
    resolve();
  }, ARTIFICIAL_DELAY);
});
