

exports.dynamicSort=function(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

exports.dynamicSortDescending=function(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



exports.getNames = function(filter) {

    var names = [];
    filter.forEach(function(entry) {
        names.push(entry.name);


    });

    return names;


}

exports.sortandfilter = function(type, candidates, incomingfiltersit, filters) {
    var incomingfilters = [];
    incomingfiltersit.forEach(function(entry) {
       
       
        for (var h = 0, j = entry.name.length; h < j; h++) {

            incomingfilters.push({
                name: entry.name[h],
                type: entry.type
            });
        }
    });


    candidates.sort(this.dynamicSort(type));
    this.generateFilter(type, candidates, filters, incomingfilters);
    return filters;
}




exports.generateFilter = function(filterType, candidates, filters, incomingfilters) {
    var filterValue = 'invalid_value';
    for (var i = 0, len = candidates.length; i < len; i++) {
        var candidate = candidates[i];
        var isPresent = false;

        if (candidate[filterType] !== filterValue) {
            filterValue = candidate[filterType];
            incomingfilters.forEach(function(entry) {
                if (entry.name == filterValue)

                    isPresent = true;
            });
            filters.push({
                type: filterType,
                name: filterValue,
                count: 0,
                value: isPresent

            });
        }
        filters[filters.length - 1].count++;
    }

};
exports.sortCandidates=function(candidate,job)
{ var cc=[];
    var candidatecopy = candidate.slice();
                        for(var aa=0,bb=candidatecopy.length;aa<bb;aa++)
                        {
                                for(var c=0,dd=candidatecopy[aa].calculateScore.length;c<dd;c++)
                                {
                                   if(candidatecopy[aa].calculateScore[c].jobname==job.id)
                                    {  
                                        cc.push({id:candidatecopy[aa]._id,tempScore:candidatecopy[aa].calculateScore[c].Score});
                                   
                                    break;


                                    }


                                }



                        }
                        cc.sort(this.dynamicSortDescending('tempScore'));
                       
                    for(var aa=0,bb=candidatecopy.length;aa<bb;aa++)
                    {var dummy=0;
                       for(var c=0,dd=cc.length;c<dd;c++)
                       {
                        if(cc[c].id==candidatecopy[aa].id)
                         { 
                            dummy=candidatecopy[c];
                            candidatecopy[c]=candidatecopy[aa];
                            candidatecopy[aa]=dummy;}
                       }


                    }



return candidatecopy;

                  };



exports.sortandfilterArray= function(type, candidates, incomingfiltersit, filters) {
    var incomingfilters = [];
    incomingfiltersit.forEach(function(entry) {
     
       
        for (var h = 0, j = entry.name.length; h < j; h++) {

            incomingfilters.push({
                name: entry.name[h],
                type: entry.type
            });
        }
    });


   
   
    this.generateFilterArray(type, candidates, filters, incomingfilters);
    return filters;
};

exports.generateFilterArray = function(filterType, candidates, filters, incomingfilters) {
    
    for (var i = 0, len = candidates.length; i < len; i++) {
        var candidate = candidates[i];
       
     
        if(filterType=="educations")
        {     for(var n=0,len1=candidate.educations.length;n<len1;n++)
              {var infilter=false;
                var target=0;
                      var isPresent = false;
                     incomingfilters.forEach(function(entry) {
                        console.log("ENTRY"+entry.name);
                         if (entry.name == candidate.educations[n].degree)
 
                    isPresent = true;
            });
                           for(var ddd=0,fff=filters.length;ddd<fff;ddd++)

                           {
                                if(filters[ddd].name==candidate.educations[n].degree)
                                    {infilter=true;
                                        target=ddd;
                                        break;}


                           }
                       if(!infilter && candidate.educations.length!=0)
                       {
                         filters.push({
                type: filterType,
                name: candidate.educations[n].degree,
                count: 1,
                value: isPresent

            });


                       }
                       if(infilter && candidate.educations.length!=0)
                       {

                    filters[target].count++;

                       }
 

                     


              }}
        if(filterType=="skills"){
              for(var n=0,len1=candidate.skills.length;n<len1;n++)
              {var infilter=false;
                var target=0;
                      var isPresent = false;
                     incomingfilters.forEach(function(entry) {
                        console.log("ENTRY"+entry.name);
                         if (entry.name == candidate.skills[n].title)
 
                    isPresent = true;
            });
                           for(var ddd=0,fff=filters.length;ddd<fff;ddd++)

                           {
                                if(filters[ddd].name==candidate.skills[n].title)
                                    {infilter=true;
                                        target=ddd;
                                        break;}


                           }
                       if(!infilter && candidate.skills.length!=0)
                       {
                         filters.push({
                type: filterType,
                name: candidate.skills[n].title,
                count: 1,
                value: isPresent

            });


                       }
                       if(infilter && candidate.skills.length!=0)
                       {

                    filters[target].count++;

                       }
 

                     


              }}
      
    }

};