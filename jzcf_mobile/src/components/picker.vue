<template>
 <transition name='fade'>
    <div class="picker-container" v-if="status" @click="closePicker">
        <div class="picker-wrapper">
            <div class="pickerBtn">
                <button class="closeBtn" @click="closePicker">取消</button>
                <button class="sureBtn" @click="getPickerVal">确定</button>
            </div>
            <mt-picker :slots="myAddressSlots" valueKey="name" ref="pickerVal" @change="onValuesChange" v-if="pickerType=='address' || pickerType=='wrokAddress'"></mt-picker>
            <mt-picker :slots="data" ref="pickerVal" v-else></mt-picker>
        </div>
    </div>
 </transition>
   
</template>
<script>
import { picker } from 'mint-ui'
export default {
    data(){
        return{
            pickerVal: '',
            myAddressSlots: [],
            addressVal: ""
        }
    },
    props: [
        'status',
        'data',
        'pickerType'
    ],
    methods: {
        getPickerVal(){//确定后获取当前value
         if(this.pickerType=='address' || this.pickerType=='wrokAddress'){
             this.pickerVal = this.addressVal;
         }else{
             this.pickerVal = this.$refs.pickerVal.getValues()[0];
         }
         this.$emit('pickerVal',{
                status: false,
                pickerVal: this.pickerVal,
                pickerType: this.pickerType
            });
            
        },
        closePicker(){//关闭时间轴
           this.$emit('pickerVal',{
                status: false
            });
        },
         onValuesChange (picker, values) {
            
            if (!values[0]) {
                this.$nextTick(() => {
                if (this.myAddressSlots) {
                   this.addressVal = values[0].name+""+values[1].name+""+values[2].name
                    // 赋默认值
                } else {
                    //picker.setValues([this.myAddressSlots[0], this.myAddressSlots[0].children[0], this.myAddressSlots[0].children[0].children[0]]);
                    this.addressVal = values[0].name+""+values[1].name+""+values[2].name
                }
                })
            } else {
                picker.setSlotValues(1, values[0].children)
                let town = []
                if (values[1]) {
                town = values[1].children
                }
                picker.setSlotValues(2, town)
                if(this.pickerType=='address'){
                    this.addressVal = values[0].name+""+values[1].name+""+values[2].name
                }else if(this.pickerType=='wrokAddress'){
                     this.addressVal =values[0].name+""+values[1].name
                }
            }
        }
    },
    watch: {
        'data'(data){
            if(this.pickerType=='address'){
                this.myAddressSlots = [
                        {
                            flex: 1,
                            values: data,
                            defaultIndex: 0,
                            className: 'slot1',
                            textAlign: 'center'
                        }, {
                            divider: true,
                            content: '--',
                            className: 'slot2'
                        }, {
                            flex: 1,
                            values: data[0].children,
                            defaultIndex: 0,
                            className: 'slot3',
                            textAlign: 'center'
                        }, {
                            divider: true,
                            content: '--',
                            className: 'slot4'
                        }, {
                            flex: 1,
                            values: data[0].children[0].children,
                            defaultIndex: 0,
                            className: 'slot5',
                            textAlign: 'center'
                        }
                    ]
            }else if(this.pickerType=='wrokAddress'){
                this.myAddressSlots = [
                        {
                            flex: 1,
                            values: data,
                            defaultIndex: 0,
                            className: 'slot1',
                            textAlign: 'center'
                        }, {
                            divider: true,
                            content: '--',
                            className: 'slot2'
                        }, {
                            flex: 1,
                            values: data[0].children,
                            defaultIndex: 0,
                            className: 'slot3',
                            textAlign: 'center'
                        }
                    ]
            }
            
        }
    }
}
</script>
<style lang="less">
.picker-container{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(59,70,100,.6);
    .picker-wrapper{
        width: 100%;
        height: auto;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
.pickerBtn{
    width: 100%;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom:1px solid #F6F6FF;
    button{
        width: auto;
        text-align: center;
        padding: 30px 30px;
        font-size: 28px;
    }
    .closeBtn{
        color:#9DA3B4;
        text-align: left;
    }
    .sureBtn{
        color: #3063AD;
        text-align: right;
    }
}
.picker-slot{
    width: 100%;
    .picker-item{
        width: 100%;
        font-size: 28px;
        color: #9DA3B4;
    }
    .picker-selected{
        font-size: 32px;
        color: #3063AD!important;
    }
}
.picker-center-highlight{
    border-top: 1px solid #FAFAFF;
    border-bottom: 1px solid #FAFAFF;
}
.slot1,.slot3,.slot5{
    flex: auto!important;
}
.slot2,.slot4{
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
}
</style>
