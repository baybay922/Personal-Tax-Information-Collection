<template>
    <!-- 年月选择 -->
    <mt-datetime-picker
        lockScroll="true"
        ref="datePicker"
        v-model="dateVal"
        class="myPicker"
        type="date"
        year-format="{value}年"
        month-format="{value}月"
        date-format="{value}日"
        @confirm="dateConfirm()"
        :start-date="startDate"
        :end-date='endDate'
        @cancel="checkinCancel">
    </mt-datetime-picker>
</template>
 
<script>
import {DatetimePicker } from 'mint-ui'

export default {
    data () {
        return {
            dateVal: '', // 默认是当前日期
            selectedValue: '',
            startDate: new Date('1969/01/01'),
            endDate: new Date('2039/01/01'),
        }
    },
    props:[
        "status",
        "pickerType"
    ],
    methods: {
        checkinCancel(){
            this.$emit('datePicker',{
                status: false
            });
        },
        selectData () { // 打开时间选择器
            // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
            if (this.selectedValue) {
                this.dateVal = this.selectedValue
            } else {
                this.dateVal = new Date()
            }
            this.$refs['datePicker'].open()
        },
        dateConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
            var t = new Date(this.dateVal)
            var year = t.getFullYear()
            var month = t.getMonth() + 1
            if (month < 10) { month = '0' + month }
            var date = t.getDate()
            if (date < 10) { date = '0' + date }
            var hour = t.getHours();
            this.$emit('datePicker',{
                status: false,
                pickerVal: year + '-' + month,
                pickerType: this.pickerType
            });
        }
    },
    watch: {
        "status"(data){
             if(data){
                this.selectData();
            }
        }
    }
}
</script>
 
<style scoped lang="less">
    .pickerDemo{
        width: 100%;
        height: 18rem;
        background-color: #fff;
        .showTime{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 2rem;
            .timeDes{
                font-size: 0.4rem;
                color: red;
            }
            .selectTime{
                display: inline-block;
                width: 4rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                background-color: #ff776d;
                color: #fff;
                font-size: 0.24rem;
                border-radius: 8px;
                margin-top: 1rem;
            }
        }
    }
    .pickerPop{
       
    }
/deep/ .picker{
    .picker-toolbar{
        background-color: #fff;
        padding: 30px;
        border-bottom: 1px solid #F6F6FF;
        .mint-datetime-action{
            font-size: 28px;
            color: #3063AD!important;
        }
        .mint-datetime-cancel{
            text-align: left;
            color: #9DA3B4!important;
        }
        .mint-datetime-confirm{
            text-align: right;
        }
    }
    .picker-items .picker-slot:nth-child(3){
        display: none
    }
}
</style>