//deals with our GENERAL application functionality
//like rendering homepage, existing blog posts, and render log in page
const router= require('express').Router();
const { post } = require('.');
const {BlogPost}= require('../models/blogpost')


router.get('/', async (req,res)=>{
    try{
        const blogPostData= await BlogPost.findAll();
        const blogPosts= blogPostData.map((post)=> post.get({plain:true}));

        res.render ('homepage')
    }catch(err){

    }
})