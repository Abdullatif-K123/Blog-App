//jshint version:6
var _ = require("lodash");
  var finds = function(findName, Posts ){ 
    let obj = {
     
         tit: "Not found such an Titles", 
         blog: "This page doesn't exstis bitch don't waste my fucking time or I will fuck somebodys wife"
    } ;
     for(let i = 0; i < Posts.length;i++){
        if(_.lowerCase(Posts[i].Titles).replace(/ /g,'')  === _.lowerCase(findName).replace(/ /g,'')){
          obj = { 
              
              tit: Posts[i].Titles,
              blog: Posts[i].Blogs
          };
        }
      
     }
     return obj;

  }; 
  var obj = {
    finds: finds
  };
 module.exports = {obj}; 