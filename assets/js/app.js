
const cl = console.log;

let std = [
    {
        
        "id":"1",
        "stdname":"abhi",
        "stdlname":"sonawane",
        "contact":1234567890
    },
    {
        
        "id":"2",
        "stdname":"raj",
        "stdlname":"mohite",
        "contact":1234567890
    },
]


const express = require("express")

const app = express()

app.use(express.json())


//for all data 

app.get("/api/std", (req , res) =>{

    try {
        
        res.status(200).json({
            success:true,
            body:std,
            msg:"std data fetched successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })
    }
})


//for fetch single std


app.get("/api/std/:id", (req , res) =>{

    try {
        
        const id = req.params.id;

        const singlestd = std.find(s => s.id === id)

        if (!singlestd) {
            return res.status(404).json({
                success:false,
                msg:"single std data not found !!!"
            })
        }

        res.status(200).json({
            success:true,
            body:singlestd,
            msg:"single std data fetched successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.message
        })
    }

})



// for create new std

app.post("/api/std", (req , res ) =>{

    try {
        
        let newstd ={

             id:Date.now().toString(),
             stdname:req.body.stdname,
             stdlname:req.body.stdlname,
             contact:req.body.contact,

        }

        std.push(newstd)

        res.status(201).json({
            success:true,
            body:newstd,
            msg:"std data assed successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })
        
    }
})


// for update std

app.patch("/api/std/:id", (req , res) =>{

    try {
        
        let updatestd = std.find( u => u.id === req.params.id)

        if (!updatestd) {
            return res.status(404).json({
                success:false,
                msg:"std data not found !!!"
            })
        }

        updatestd.stdname = req.body.stdname;
        updatestd.stdlname = req.body.stdlname;
        updatestd.contact = req.body.contact;

        res.status(200).json({
            success:true,
            body:updatestd,
            msg:"std updated successfully !!!"
        })


    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })
    }
})


// for std delete


app.delete("/api/std/:id", (req , res) =>{

    try {
        
        let getindex = std.findIndex(d => d.id === req.params.id)

        if (getindex === -1) {
            
            res.status(404).json({
                success:false,
                msg:"std not found !!!"
            })
        }

        let deletestd = std.splice(getindex , 1)

        res.status(200).json({
            success:true,
            body:deletestd[0],
            msg:"std deleted successfully !!!"
        })

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"something went wrong !!!",
            error:err.msg
        })
    }
})


app.listen(3000, () =>{
    cl("std data fetched successfully !!!")
})