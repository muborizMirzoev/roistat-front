<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <div class="grid-content">
        <el-table
          :data="users"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          empty-text="Пока нет данных"
          border
          default-expand-all>
          <el-table-column
            prop="name"
            label="Имя"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="Телефон"
            sortable
          >
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'UsersTable',
  data () {
    return {}
  },

  computed: {
    ...mapGetters(['users'])
  }
}
</script>
