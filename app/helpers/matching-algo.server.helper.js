var mongoose = require('mongoose'),
  
    Candidate = mongoose.model('Candidate');


exports.calculateMatchPercent=function(candidates,precedence,job)

{

	//very important, important ,ok 
	//50, 30, 10 
console.log(job['career_level']);
if(precedence)
	console.log("PRECEDENCE PROVIDED BY EMPLOYER");
else
	{
   precedence=[{name:"career_level",nameinjob:"career_level",precedence:50},{name:"salary_expectation",nameinjob:"salary_range",precedence:30}];

	}
    

    for(var h=0,j=candidates.length;h<j;h++)
    {var xp=0;

        var candidate=candidates[h];

             for(var g=0;g<precedence.length;g++)
             	{   
             		console.log(job[precedence[g].nameinjob]+" "+candidate[precedence[g].name]);
                   if(job[precedence[g].nameinjob]==candidate[precedence[g].name])
                   	   xp=xp+precedence[g].precedence;

             	}


     candidate.calculateScore.push({jobname:job._id,Score:xp});
     candidate.markModified('calculateScore');
	 candidate.save();
     console.log("XP"+xp);






    } 










};