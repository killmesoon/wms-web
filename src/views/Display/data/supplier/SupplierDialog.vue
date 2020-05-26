<template>
    <div>
        <el-form :model="form" size="small" label-position="left" :inline="isFormInline">
            <el-form-item label="供应商编码" :label-width="formLabelWidth">
                <el-input v-model="form.supplierCode" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="供应商名称" :label-width="formLabelWidth">
                <el-input v-model="form.supplierName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商简称" :label-width="formLabelWidth">
                <el-input v-model="form.shortName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商类型" :label-width="formLabelWidth">
                <el-select v-model="form.supplierType" placeholder="请选择供应商类型">
                    <el-option v-for="item in dicSupplierTypeList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form :model="form" size="small" label-position="left" :inline="isFormInline">
            <el-form-item label="供应商状态" :label-width="formLabelWidth">
                <el-select v-model="form.supplierStatus" placeholder="请选择供应商状态">
                    <el-option v-for="item in dicSupplierStatusList" :key="item.dicCode" :label="item.dicName"
                               :value="item.dicId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!flag" label="供应商地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="联系人" :label-width="formLabelWidth">
                <el-input v-if="!flag" v-model="form.contact" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="联系电话" :label-width="formLabelWidth">
                <el-input v-if="!flag" v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="form" size="small" label-position="left" :inline="isFormInline">
            <el-form-item v-if="!flag" label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.mail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="!flag" label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.note" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'SupplierDialog',
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
                'dicSupplierTypeList',
                'dicSupplierStatusList'
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
