<template>
    <div class="row">
        <div class="col-sm-8">
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="type to filter"
                    :value="value"
                    :disabled="tableData === null || processing > 0"
                    @input="updateInput($event)"
                />
            </div>
        </div>
        <div class="col-sm-4">
            <div class="form-group d-inline">
                <button
                    class="btn btn-primary"
                    :disabled="value === ''"
                    @click="clearFilter"
                >
                    Clear
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    props: {
        tableData: {
            type: [Array, null],
            default: null
        },
        value: {
            type: String,
            required: true,
            default: ""
        }
    },
    computed: {
        ...mapState(["processing"])
    },
    methods: {
        clearFilter() {
            this.$emit("clear-filter");
        },
        updateInput(e) {
            this.$emit("input", e.target.value);
        }
    }
};
</script>
