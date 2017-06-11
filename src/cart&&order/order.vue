<template>
    <table class="table table-striped table-condensed table-bordered">
        <tbody>
            <tr>
                <th>书名</th>
                <th>单价</th>
                <th>数量</th>
                <th>总价</th>
            </tr>
            <tr v-for="book in books">
                <td>{{book.name}}</td>
                <td>{{book.price | currency('￥')}}</td>
                <td>{{book.num}}</td>
                <td>{{(book.price*book.num) | currency('￥')}}</td>
            </tr>
            <tr>
                <td></td><td></td><td></td>
                <td>{{total | currency('￥')}}</td>
            </tr>
        </tbody>
    </table>

</template>

<script>
    export default{
        name:"order",
        props:{
            books:{required:true}
        },
        computed:{
            total(){
                var total = 0;
                for(var i in this.books){
                    total += this.books[i].num * this.books[i].price;
                }
                return total;
            }
        }
    }
</script>

<style>

</style>
