const withAuth= (req,res,next)=>{
    if(req.session.looged_in){
        res.rediredct('/login');//redirect to the the login route which 
        //which is found in the homeRoutes.js file
    }else{
        next();
    }
};

module.exports=withAuth;