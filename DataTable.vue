<template>
    <table class="table table-striped table-hover table-sm">
        <thead class="thead-dark">
            <tr>
                <th
                    v-for="column in columnConfig"
                    :key="column.property"
                    :class="column.sort === true ? 'sort-column' : ''"
                    @click="sortColumn(column)"
                >
                    {{ column.label }}
                    <span v-if="sort.col === column.property">
                        <sort-up v-if="sort.dir === 'asc'"></sort-up>
                        <sort-down v-if="sort.dir === 'desc'"></sort-down>
                    </span>
                    <span v-else>
                        <sort-up extra-classes="hide"></sort-up>
                    </span>
                </th>
                <th v-if="showActions">
                    &nbsp;
                </th>
            </tr>
        </thead>
        <tbody v-if="loading">
            <tr>
                <td class="text-center" :colspan="columnConfig.length + 1">
                    <spinner></spinner>
                </td>
            </tr>
        </tbody>
        <tbody v-else-if="!loading && tableData.length === 0">
            <tr>
                <td class="text-center" :colspan="columnConfig.length + 1">
                    There are no {{ tableType }} for this account.
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr v-for="(row, index) in tableData" :key="'row' + index">
                <td
                    v-for="(column, index2) in columnConfig"
                    :key="'column' + index2"
                >
                    {{ row | table_value(column) }}
                </td>
                <td v-if="showActions">
                    <field-action-items
                        v-if="tableType === 'fields'"
                        :data="row"
                        :index="index"
                        @delete-action="deleteAction"
                    ></field-action-items>
                    <user-action-items
                        v-if="tableType === 'users'"
                        :data="row"
                        :index="index"
                        @delete-action="deleteAction"
                    ></user-action-items>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import FieldActionItems from "../mart/FieldActionItems";
import SortDown from "../icons/SortDown";
import SortUp from "../icons/SortUp";
import Spinner from "../icons/Spinner";
import UserActionItems from "../user/UserActionItems";
export default {
    props: {
        columnConfig: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: true
        },
        showActions: {
            type: Boolean,
            default: false
        },
        sort: {
            type: Object,
            default: () => {}
        },
        tableData: {
            type: Array,
            default: () => []
        },
        tableType: {
            type: String,
            default: ""
        }
    },
    computed: {},
    components: {
        FieldActionItems,
        SortDown,
        SortUp,
        Spinner,
        UserActionItems
    },
    methods: {
        deleteAction(data) {
            this.$emit("delete-action", data);
        },
        sortColumn(col) {
            if (this.sort.col === col.property) {
                col.sort_dir = this.sort.dir === "desc" ? "asc" : "desc";
            }
            this.$emit("sort-column", col);
        }
    }
};
</script>
