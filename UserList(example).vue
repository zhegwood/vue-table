<template>
    <div>
        <div class="row">
            <div class="col-sm-12">
                <h1>Data Dictionary Users</h1>
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <data-table-filter
                            v-model="filter_val"
                            @clear-filter="clearFilter"
                            :table-data="table_data"
                        ></data-table-filter>
                    </div>
                    <div class="col-sm-12 col-md-6 text-right">
                        <data-table-pager
                            :pages="pages"
                            :page-number="page_number"
                            :table-data="table_data"
                            @first-page="firstPage"
                            @last-page="lastPage"
                            @next-page="nextPage"
                            @prev-page="prevPage"
                        ></data-table-pager>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <data-table
                            :column-config="column_config"
                            :loading="users === null"
                            :sort="sort"
                            :table-data="paged_data"
                            :show-actions="true"
                            table-type="users"
                            @delete-action="deleteUser"
                            @sort-column="sortColumn"
                        ></data-table>
                    </div>
                </div>
            </div>
        </div>
        <modal-confirm-delete-user></modal-confirm-delete-user>
    </div>
</template>
<script>
import DataTable from "../shared/DataTable";
import DataTableFilter from "../shared/DataTableFilter";
import DataTablePager from "../shared/DataTablePager";
import ModalConfirmDeleteUser from "./ModalConfirmDeleteUser";
import table_mixin from "../../table-mixin";
import { mapState } from "vuex";
import { newObject } from "../../helpers";
export default {
    data() {
        return {
            column_config: [
                {
                    label: "First Name",
                    property: "first_name",
                    type: "string",
                    sort: true,
                    sort_dir: "desc"
                },
                {
                    label: "Last Name",
                    property: "last_name",
                    type: "string",
                    sort: true,
                    sort_dir: "desc"
                },
                {
                    label: "Username",
                    property: "username",
                    type: "string",
                    sort: true,
                    sort_dir: "desc"
                },
                {
                    label: "AmeriLINK Role",
                    property: "amerilink_role.role",
                    type: "string",
                    sort: true,
                    sort_dir: "desc"
                },
                {
                    label: "DoD Role",
                    property: "dod_role.role",
                    type: "string",
                    sort: true,
                    sort_dir: "desc"
                },
                {
                    label: "Created",
                    property: "created_at",
                    type: "datetime",
                    sort: true,
                    sort_dir: "desc"
                },
                {
                    label: "Last Login",
                    property: "last_login",
                    type: "datetime",
                    sort: true,
                    sort_dir: "desc"
                }
            ],
            sort: {
                col: "created_at",
                dir: "desc",
                type: "datetime"
            }
        };
    },
    computed: {
        ...mapState(["selected_user", "users"])
    },
    components: {
        DataTable,
        DataTableFilter,
        DataTablePager,
        ModalConfirmDeleteUser
    },
    mixins: [table_mixin],
    watch: {
        filter_val() {
            this.filterData();
        },
        selected_user(new_val, old_val) {
            if (new_val === null && old_val !== null) {
                $("#ModalConfirmDeleteUser").modal("hide");
            }
        },
        users(new_val) {
            if (new_val === null) {
                return;
            }
            this.table_data = newObject(new_val);
            this.filterData();
        }
    },
    created() {
        this.$store.dispatch("userList");
    },
    methods: {
        deleteUser(user) {
            this.$store.commit("selected_user", user);
            $("#ModalConfirmDeleteUser").modal("show");
        }
    }
};
</script>
