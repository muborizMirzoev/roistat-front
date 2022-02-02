<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <el-button type="primary" round @click="openModal">Добавить</el-button>
      <UsersTable/>
      <AddUserModal v-if="showModal" @close="closeModal" :formVisible="showModal"/>
    </el-col>
  </el-row>
</template>

<script>
import UsersTable from "./components/UsersTable";
import AddUserModal from "./components/AddUserModal";

export default {
  name: 'App',
  components: {
    UsersTable,
    AddUserModal
  },

  data() {
    return {
      showModal: false
    }
  },

  methods: {
    openModal() {
      console.log('sss')
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

