import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: () => ({
    tableData: [
      {
        id: 1, parentId: "main", name: 'Марина', phone: '8 923 432 12 31', children: [
          {
            id: 6, parentId: 1, name: 'Виктория', phone: '8 923 233 11 11', children: [
              {id: 7, parentId: 6, name: 'Маша', phone: '8 923 113 11 22', children: []}
            ]
          },
          {id: 8, parentId: 1, name: 'Андрей', phone: '8 923 103 11 11', children: []},
          {id: 9, parentId: 1, name: 'Иван', phone: '8 923 103 11 10', children: []}
        ]
      },
      {id: 2, parentId: "main", name: 'Сергей', phone: '8 923 432 11 32', children: []},
      {id: 3, parentId: "main", name: 'Андрей', phone: '8 923 432 10 32', children: []},
      {id: 4, parentId: "main", name: 'Влад', phone: '8 923 432 12 32', children: []},
      {id: 5, parentId: "main", name: 'Саша', phone: '8 923 432 12 32', children: []},
    ]
  }),

  getters: {
    users: state => state.tableData
  },

  mutations: {
    addUser(state, payload) {
      if (payload.parentId === 'main') {
        state.tableData.push(payload)
        return
      }

      const user = findObjectById(state.tableData, payload.parentId)
      user.children.push(payload)

      function findObjectById(array, id) {
        let result
        for (let obj of array) {
          if (obj.id === id) {
            return obj
          }
          if (obj.children.length !== 0) {
            result = findObjectById(obj.children, id)
            if (result) {
              return result
            }
          }
        }
        return result
      }
    },

    sortUsers({tableData}, {prop, order}) {
      if (!order) return

      if (order === 'ascending') {
        tableData.sort(ascendingSort);
      }
      if (order === 'descending') {
        tableData.sort(descendingSort);
      }

      function ascendingSort(a, b) {
        if (a.children.length > 1) {
          a.children.sort(ascendingSort);
        }
        if (a[prop] < b[prop]) {
          return -1;
        }
        if (a[prop] > b[prop]) {
          return 1;
        }
        return 0;
      }

      function descendingSort(a, b) {
        if (a.children.length > 1) {
          a.children.sort(descendingSort);
        }
        if (a[prop] > b[prop]) {
          return -1;
        }
        if (a[prop] < b[prop]) {
          return 1;
        }
        return 0;
      }
    },

    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    }
  },
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store
