<template>
    <div>
        <el-form :model="form" size="small" label-position="left" :inline="isFormInline">
            <el-form-item label="单位编码" :label-width="formLabelWidth">
                <el-input v-model="form.uomCode" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="单位名称" :label-width="formLabelWidth">
                <el-input v-model="form.uomName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位类型" :label-width="formLabelWidth">
                <el-select v-model="form.uomType" placeholder="请选择供应商类型">
                    <el-option v-for="item in dicUomTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否主单位" :label-width="formLabelWidth">
                <el-select v-model="form.primaryFlag" placeholder="请选择供应商状态">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否有效" :label-width="formLabelWidth">
                <el-select v-model="form.enableFlag" placeholder="请选择供应商状态">
                    <el-option v-for="item in dicYNList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="与主单位换算" :label-width="formLabelWidth">
                <el-input v-model="form.conversionRatio" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="保留小数位" :label-width="formLabelWidth">
                <el-input v-model="form.decimalNumber" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "UomDialog",
        props: {
            data: Object,
            flag: Boolean
        },
        data() {
            return {
                form: JSON.parse(JSON.stringify(this.data)),
                isFormInline: true,
                formLabelWidth: '100px'
            }
        },
        computed: {
            ...mapGetters([
                'dicUomTypeList',
                'dicYNList'
            ])
        },
        watch: {
            data(current, old) {
                this.form = JSON.parse(JSON.stringify(current))
            }
        }
    }
</script>

<style scoped>

</style>
