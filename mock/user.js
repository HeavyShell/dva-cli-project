
const Mock=require('mockjs');

let db=Mock.mock({
    'data|50-100':[{
        id:'@id',
        // 'id|+1':1,
        name:'@cname',
        'age|18-100':1,
        create_time:'@datetime',
        // avatar:'@image(100x100,#4A7BF7,hello)',
        avatar:function() {
            return Mock.Random.image('100x100',Mock.Random.color(),Mock.Random.string('upper', 3))
        },
        address:'@county(true)',
        email:'@email',
        love_color:'@color',
        // 'love_color|2-5':[
        //     '@color'
        // ],
        'description':'@csentence(10, 20)'
    }]
});

module.exports={
    //列表查询get
    [`GET /mock/api/users`](req,res){
        
        let pagesize=req.headers&&req.headers.pagesize;
        let current=req.headers&&req.headers.current;

        res.header('total', db.data.length);
        res.status(200).json(db.data.slice((current-1)*pagesize,current*pagesize));
    },
    //单条查询get
    [`GET /mock/api/users/:id`](req,res){

        let id=req.params.id;
        let info={
            data:{}
        };
        db.data.map(item=>{
            if(item.id==id){
                info.data=item
            }
        })
        
        res.status(200).json(info);
    },
    //新增post
    [`POST /mock/api/users`](req,res){

        let user=req.body;
        user.id=Mock.mock('@id');
        db.data.push(user);
        
        res.status(200).json(user);
    },
    //修改put
    [`PUT /mock/api/users/:id`](req,res){

        let id=req.params.id;
        let user=req.body;
        user.id=id;
        db.data.map((item,index)=>{
            if(item.id==id){
                db.data[index]=user;
            }
        })
        
        res.status(200).json(user);
    },
    //删除delete
    [`DELETE /mock/api/users/:id`](req,res){

        let id=req.params.id;
        db.data.map((item,index)=>{
            if(item.id==id){
                db.data.splice(index,1);
            }
        })
        
        res.status(200).json({id:id});
    },
    
}