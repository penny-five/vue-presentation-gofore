<template>
  <div class="app-wrapper">
    <site-heading title="EVIL-ERP"></site-heading>
    <transition name="fade" mode="out-in">
      <loading-spinner v-if="isLoading"></loading-spinner>
      <div v-else>
        <searchbox v-model="searchPhrase"></searchbox>
        <ul>
          <employee-item
            v-for="employee in filteredEmployees"
            class="list-item"
            :key="employee.id"
            :employee="employee"
            :is-processing="isBeingProcessed(employee)"
            @fire="onFireEmployee">
          </employee-item>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import * as api from '../api/employees';
import EmployeeItem from './employee-item';
import LoadingSpinner from './loading-spinner';
import Searchbox from './searchbox';
import SiteHeading from './site-heading';

export default {
  name: 'App',
  components: {
    EmployeeItem,
    LoadingSpinner,
    Searchbox,
    SiteHeading
  },
  data: () => ({
    employees: null,
    employeesBeingProcessed: [],
    searchPhrase: ''
  }),
  computed: {
    isLoading() {
      return this.employees == null;
    },
    filteredEmployees() {
      if (this.searchPhrase.length === 0) {
        return this.employees;
      }
      const search = this.searchPhrase.toLowerCase();
      return this.employees.filter(employee => employee.name.toLowerCase().indexOf(search) > -1);
    }
  },
  methods: {
    isBeingProcessed(employee) {
      return this.employeesBeingProcessed.includes(employee);
    },
    onFireEmployee(employee) {
      this.employeesBeingProcessed.push(employee);
      api.fire(employee.id).then(() => {
        this.employeesBeingProcessed.splice(this.employeesBeingProcessed.indexOf(employee), 1);
        this.employees.splice(this.employees.indexOf(employee), 1);
      });
    }
  },
  mounted() {
    api.getAll().then(employees => {
      this.employees = employees;
    });
  }
};

</script>

<style lang="scss">
@import 'assets/style';

.app-wrapper {
  margin: 50px auto;
  max-width: 700px;
}
</style>
