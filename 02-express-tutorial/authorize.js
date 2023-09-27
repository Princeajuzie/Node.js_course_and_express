const authorize = (req, res, next) => {
    const { user } = req.query;
    if (user === 'prince') {
        req.user = { name: 'prince', id: 3 }
      
        next()
    } else {
        res.status(401).send('unathorized')
     
    }
    
 next() 
};



module.exports = authorize;

