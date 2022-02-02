<template>
  <div class="grid-content">
    <el-table
      :data="users"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      @sort-change="customSort"
      empty-text="Пока нет данных"
      border
      default-expand-all>
      <el-table-column
        prop="name"
        label="Имя"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Телефон"
        sortable="custom"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'UsersTable',
  data() {
    return {}
  },

  computed: {
    ...mapGetters(['users'])
  },

  methods: {
    customSort(sortType) {
      this.$store.commit('sortUsers', sortType)
    }
  }
}
</script>

<style>
.grid-content {
  margin-top: 16px;
}
</style>
