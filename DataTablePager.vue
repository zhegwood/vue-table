<template>
    <div>
        <button
            class="btn btn-primary"
            :disabled="pageNumber <= 0"
            @click="firstPage"
        >
            <double-angle-left></double-angle-left>
        </button>
        <button
            class="btn btn-primary"
            :disabled="pageNumber <= 0"
            @click="prevPage"
        >
            <angle-left></angle-left>
        </button>
        <span>&nbsp;</span>
        <spinner v-if="tableData === null"></spinner>
        <span v-else>{{ pageNumber + 1 }} of {{ pages }}</span>
        <span>&nbsp;</span>
        <button
            class="btn btn-primary"
            :disabled="pageNumber === pages - 1"
            @click="nextPage"
        >
            <angle-right></angle-right>
        </button>
        <button
            class="btn btn-primary"
            :disabled="pageNumber === pages - 1"
            @click="lastPage"
        >
            <double-angle-right></double-angle-right>
        </button>
    </div>
</template>
<script>
import AngleLeft from "../icons/AngleLeft";
import AngleRight from "../icons/AngleRight";
import DoubleAngleLeft from "../icons/DoubleAngleLeft";
import DoubleAngleRight from "../icons/DoubleAngleRight";
import Spinner from "../icons/Spinner";
export default {
    props: {
        pageNumber: {
            type: Number,
            default: 0
        },
        pages: {
            type: Number,
            default: 1
        },
        tableData: {
            type: [Array, null],
            default: null
        }
    },
    components: {
        AngleLeft,
        AngleRight,
        DoubleAngleLeft,
        DoubleAngleRight,
        Spinner
    },
    methods: {
        firstPage() {
            this.$emit("first-page");
        },
        lastPage() {
            this.$emit("last-page");
        },
        nextPage() {
            this.$emit("next-page");
        },
        prevPage() {
            this.$emit("prev-page");
        }
    }
};
</script>
