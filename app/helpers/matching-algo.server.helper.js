var mongoose = require('mongoose'),
  
    Candidate = mongoose.model('Candidate');

var career_level=["Student/Internship","Entry Level","Mid Career","Management","Executive (Director)","Senior Executive (CEO)"];
var salary_expectation=["10,000 - 15,000","15,000 - 30,000","30,000 - 60,000"];
exports.calculateMatchPercent=function(candidates,precedence,job)

{

	var priority=[];

console.log(precedence);
if(precedence)
	{
   
     for(var t=0,r=precedence.length;t<r;t++)
     {   
      priority.push({name:precedence[t].name,nameinjob:precedence[t].nameinjob});

     }
   
    }
else
	{
   precedence=[{name:"career_level",nameinjob:"career_level"},{name:"skills",nameinjob:"skills"},{name:"salary_expectation",nameinjob:"salary_range"}];

	}
    

    for(var h=0,j=candidates.length;h<j;h++)
    
    {
        var xp=0;
console.log(candidates.length+" "+candidates[h].displayName);
        var candidate=candidates[h];

             for(var g=0;g<precedence.length;g++)
             	{
                  if(precedence[g].name=="career_level")
             {
                for(var q=0,tt=career_level.length;q<tt;q++)
                {
                       if(candidate[precedence[g].name]==career_level[q])
                       {var a=(career_level.indexOf(career_level[q])+1)/(career_level.length);

                          a=a*getIndexOf("career_level",precedence);
                           xp=xp+a;
                           
                       }
         
             	}

             }

             if(precedence[g].name=="salary_expectation")
             {

for(var q=0,tt=salary_expectation.length;q<tt;q++)
                {
                       if(candidate[precedence[g].name]==salary_expectation[q])
                       {var a=(salary_expectation.indexOf(salary_expectation[q])+1)/(salary_expectation.length);
                        a = salary_expectation.length-a;
                        a=a*getIndexOf("salary_expectation",precedence);
                           xp=xp+a;
                           
                       }
         
                }


             }
}

  console.log("XP"+xp);

     candidate.calculateScore.push({jobname:job._id,Score:xp});
     candidate.markModified('calculateScore');
	 candidate.save();
   





    } 










};



var getIndexOf=function(element,precedence){

console.log("getindexof");
   var index=0;
   for(var h=0,j=precedence.length;h<j;h++)
   {
        if(precedence[h].name==element)
        {
            index=h;

            break;

        }




   }
  console.log(precedence.length-h+" "+precedence.length+" "+h);
   return precedence.length-h;



};