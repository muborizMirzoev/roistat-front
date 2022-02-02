<template>
  <el-dialog title="Добавление пользователя" :visible="formVisible" @close="$emit('close')">
    <el-form
      ref="ruleForm"
      :label-position="labelPosition"
      label-width="100px"
      :model="form"
      :rules="rules">
      <el-form-item label="Имя" prop="name">
        <el-input v-model="form.name" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="Телефон" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label=Начальник prop="parent">
        <el-select v-model="form.parent" placeholder="Начальник">
          <el-option label="Нет начальника" value="main"></el-option>
          <el-option
            v-for="parent of allParents"
            :key="parent.id"
            :label="parent.name"
            :value="parent.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="saveFormData" round type="primary">Сохранить</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'AddUserModal',
  props: {
    formVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],

  data() {
    return {
      labelPosition: 'right',
      form: {
        name: '',
        phone: '',
        parent: ''
      },
      allParents: [],
      rules: {
        name: [
          {required: true, message: 'Пожалуйста ведите имя', trigger: blur}
        ],
        phone: [
          {required: true, message: 'Пожалуйста ведите Телефон', trigger: blur},
        ],
        parent: [
          {required: true, message: 'Пожалуйста выберите начальника', trigger: blur}
        ],
      }
    }
  },

  computed: {
    ...mapGetters(['users'])
  },

  methods: {
    findAllParents(users) {
      users.forEach((user) => {
        if (user.children) {
          this.allParents.push(user)
          this.findAllParents(user.children)
        } else {
          this.allParents.push(user)
        }
      })
    },
    saveFormData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const user = {
            id: Date.now(),
            name: this.form.name,
            phone: this.form.phone,
            parentId: this.form.parent,
            children: []
          }

          this.$store.commit('addUser', user)
          this.allParents.push(user)
          this.form.name = ''
          this.form.phone = ''
        } else {
          console.error('Error Submit!!!')
          return false
        }
      })
    }
  },

  mounted() {
    this.findAllParents(this.users)
  }
}
</script>

