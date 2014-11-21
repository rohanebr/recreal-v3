var mongoose = require('mongoose'),

    Candidate = mongoose.model('Candidate');
var studyfield=["Electrical Engineering","Computer Engineering",
                                            "Civil Engineering",
                                            "MBA",
                                            "BBA",
                                            "Physics",
                                            "Mathematics",
                                            "Chemistry"];

var degree=["Pre-Matriculation","O-level/Matriculation","Intermediate/A-Level","Certificate","Diploma","Bachelor's Degree","Master's Degree","Doctorate"];
var level=["Beginner","Intermediate","Expert"];
var career_level=["Student/Internship","Entry Level","Mid Career","Management","Executive (Director)","Senior Executive (CEO)"];
var salary_expectation=["10,000 - 15,000","15,000 - 30,000","30,000 - 60,000"];
exports.calculateMatchPercent=function(candidates,precedence,job)

{

	var priority=[];


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
           if(precedence[g].name=="employee_status")
           {

               if(job.employee_status==candidates.employee_status)
                xp=xp+getIndexOf("employee_status",precedence);

           }
             if(precedence[g].name=="employee_type")
           {

               if(job.employee_type==candidates.employee_type)
                xp=xp+getIndexOf("employee_type",precedence);

           }

             if(precedence[g].name=="visa_status")
             {}
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

           
             if(precedence[g].name=="degree_title")
             {
              var totalpoints=0;
                        for(var r=0,t=candidate.educations.length;r<t;r++)
                {   console.log(job.study_field+" "+candidate.educations[r].study_feild);

                       if(candidate.educations[r].study_feild==job.study_field)
                       {

                              var ww=degree.indexOf(candidate.educations[r].degree);
                              var dummy1= getIndexOf("degree_title",precedence)*((ww+1)/degree.length);
                              if(dummy1>totalpoints)
                                totalpoints=dummy1;
                                
                       }
                                 


                }

                console.log(totalpoints);
               xp=xp+totalpoints;



             }
             if(precedence[g].name=="gender")
             {

                if(job.gender==candidate.gender)
                     xp=xp+getIndexOf("gender",precedence);   



             }
             if(precedence[g].name=="skills")
             {

                     for(var xxx=0,yyy=candidate.skills.length;xxx<yyy;xxx++)
                     {
                            for(var k=0,jj=job.skills.length;k<jj;k++)
                            {
                              if(job.skills[k].title.toLowerCase()==candidate.skills[xxx].title.toLowerCase())
                              {
                                  
                                         for(u=0;u<level.length;u++)
                                         {

                                           if(candidate.skills[xxx].level==level[u])
                                               {
                                                 var oneskillvalue=getIndexOf("skills",precedence)/job.skills.length;
                                                
                                                 if(candidate.skills[xxx].experience>=5)
                                                 {
                                                 
                                                  oneskillvalue=oneskillvalue*((u+1)/level.length);
                                                  xp=xp+oneskillvalue;
                                                  }
                                                 else
                                                 {

                                                     oneskillvalue=oneskillvalue*(((u+1)/level.length)*candidate.skills[xxx].experience/5);

                                                     xp=xp+oneskillvalue;
                                              

                                                 }
             

                                               }

                                         }

                              }


                            }
                     

                     }





             }
}


console.log(candidate.displayName+" "+xp);
var alreadypresent=false;
for(var s=0,e=candidate.calculateScore.length;s<e;s++)
{
   if(candidate.calculateScore[s].jobname==job.id)
   {
     candidate.calculateScore[s].Score=xp;
     alreadypresent=true;
     break;
   }


}
if(!alreadypresent)
     candidate.calculateScore.push({jobname:job._id,Score:xp});
     candidate.markModified('calculateScore');
	 candidate.save();
   





    } 










};



var getIndexOf=function(element,precedence){


   var index=0;
   for(var h=0,j=precedence.length;h<j;h++)
   {
        if(precedence[h].name==element)
        {
            index=h;

            break;

        }




   }
 
   return precedence.length-h;



};

