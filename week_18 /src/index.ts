import { PrismaClient } from '@prisma/client';
import express, { Router } from "express";


const client = new PrismaClient();
const app = express();

app.get("/users",async (req,res)=>{
    const users = await client.user.findMany();
    res.json(users);
})

app.get("/todos/:userId", async (req,res)=>{
    const userId = parseInt(req.params.userId);
    const todos = await client.todo.findMany({
        where : {
            userId : userId
        },
        include : {
            user : {
                select : {
                    username : true
                }
            }
        }
    })
    res.json(todos);
})

app.listen(3000);