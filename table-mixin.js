import { newObject } from './helpers'
import { getColumnValue } from './helpers'
export default {
  data () {
    return {
      filtered_data: [],
      filter_val: '',
      page_number: 0,
      paged_data: [],
      sort: {},
      sorted_data: [],
      table_data: null
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.filtered_data.length / 100)
    }
  },
  watch: {
    filter_val () {
      this.filterData()
    }
  },
  methods: {
    clearFilter () {
      this.filter_val = ''
    },
    filterData () {
      if (this.filter_val === '') {
        this.filtered_data = newObject(this.table_data)
      } else {
        const filterval = this.filter_val.toLowerCase()
        this.filtered_data = this.table_data.filter(data => {
          let found = false
          for (let a = 0, len = this.column_config.length; a < len; a++) {
            let col = this.column_config[a]
            let column_val = getColumnValue(data, col.property) + ''
            if (column_val.toLowerCase().indexOf(filterval) !== -1) {
              found = true
              break
            }
          }
          if (found) {
            return data
          }
        })
      }
      if (this.page_number > this.pages) {
        this.page_number = this.pages - 1
      }
      this.sortData()
    },
    firstPage () {
      this.page_number = 0
      this.pageData()
    },
    lastPage () {
      this.page_number = this.pages - 1
      this.pageData()
    },
    nextPage () {
      this.page_number++
      this.pageData()
    },
    pageData () {
      const start = this.page_number * 100

      const end = start + 100

      this.paged_data = this.sorted_data.slice(start, end)
    },
    prevPage () {
      this.page_number--
      this.pageData()
    },
    sortColumn (column) {
      this.sort = {
        col: column.property,
        dir: column.sort_dir,
        type: column.type
      }
      this.sortData()
    },
    sortData () {
      const data = newObject(this.filtered_data)
      data.sort((a, b) => {
        a = getColumnValue(a, this.sort.col)
        b = getColumnValue(b, this.sort.col)
        if (this.sort.type === 'datetime') {
          a = new Date(a).getTime()
          b = new Date(b).getTime()
        }
        if (this.sort.dir === 'asc') {
          return a < b ? -1 : a < b ? 1 : 0
        } else {
          return a > b ? -1 : a < b ? 1 : 0
        }
      })
      this.sorted_data = data
      this.pageData()
    }
  }
}
