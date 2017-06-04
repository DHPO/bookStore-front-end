<template>
    <div id="test">
        <comp pram="Bar"></comp>
        <tb :attrs="heads" :datas="datas" tableURL="test"></tb>
        <button @click="show" class="btn btn-primary">show</button>
        <modal :show.sync="showModal" effect="zoom" :backdrop="false" >
            <div slot="modal-header" class="modal-header"><h4>MyModal</h4></div>
            <div slot="modal-body" class="modal-body">
                <p>Hello World, {{$route.params.id}}</p>
            </div>
            <div slot="modal-footer" class="modal-footer">
                <button class="btn btn-default" @click="showModal=false">close</button>
                <button class="btn btn-success" @click="hide">OK</button>
            </div>
        </modal>
    </div>
</template>

<script>
    import comp from "./componentTest.vue"
    import tb from "./table.vue"
    import {modal} from "vue-strap"
    
    export default {
        name:"test",
        data(){return {
            showModal: false,
            heads:["a", "b", "c", "d"],
            datas:[{"a":1, "b":2, "c":3, "d":4},{"a":5, "b":6, "c":7, "d":8}]
        };},
        methods:{
            show(){this.showModal=true;},
            hide(){this.showModal=false;}
        },
        components:{comp, modal, tb}
    }
</script>

<style lang="css">
    div{font-size:20px;}
</style>