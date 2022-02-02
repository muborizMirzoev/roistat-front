<template>
  <div>
    <el-button type="primary" round >Добавить</el-button>
    <UsersTable/>
    <AddUserModal/>
  </div>
</template>

<script>


import UsersTable from "./components/UsersTable";
import AddUserModal from "./components/AddUserModal";

export default {
  name: 'App',
  components: {
    UsersTable,
    AddUserModal
  }
}
</script>

<style>

</style>
