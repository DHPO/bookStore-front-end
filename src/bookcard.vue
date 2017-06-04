<template>
    <div>
        <div class="bookWapper">
            <div class="bookid">ID: {{book.id}}</div>
            <div class="bookImage">此处应有图片</div>
            <div class="bookName" >{{book.name}}</div>
            <div class="bookPrice">价格: {{book.price}}</div>
            <button class="shopCar btn btn-primary btn-sm">+购物车</button>
        </div>
    </div>
</template>

<script>
    export default{
        name: "bookcard",
        props:{book:{required: true}}
    }
</script>

<style>
    .bookWapper{border: 1px solid #AAA; border-radius: 10px; width:200px; height:300px; padding:15px; margin:10px; float:left;}
    .bookWapper:hover{box-shadow: 0px 0px 5px #888888; transition: 0.2s;}
    .bookid{color: #BBB;}
    .shopCar{position:relative; right:0px; bottom: 5px; font-size:14px; margin:5px; float:right;}
    .bookName{font-size:18px; margin:5px; height:40px; overflow:auto;}
    .bookPrice{font-size:14px; color:red; margin:2px; float:left}
    .bookImage{width:100%; margin-left:auto; height:180px; border: 2px dotted black; border-radius: 5px;}
</style>
