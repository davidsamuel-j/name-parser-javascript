var nameParse = (function(){
	var name_pattern=[
	  //Firstname Lastname
	  {"pattern":/^[a-z]+\s+[a-z]+$/i, 'first_name':[/\s+[a-z]+$/i],'last_name':[/^[a-z]+\s+/i]},
	  //Lastname, Firstname
	  {"pattern":/^([a-z]+\s*)+,\s*[a-z]+$/i, 'first_name':[/^[a-z\s]*,\s*/i],'last_name':[/\s*,\s*[a-z]+/i]},
	  //Firstname Middlename Lastname
	  {"pattern":/^[a-z]{2,}\s+[a-z]+(\s+[a-z]+)+$/i, 'first_name':[{'pattern':/\s/i,'limit':2}],'last_name':[/^[a-z]+\s+[a-z]+\s/i]},
	  //Lastname, Firstname Middle Name
	  {"pattern":/^([a-z]+\s*)+,\s*[a-z]{2,}\s+[a-z]+$/i, 'first_name':[/^[a-z\s]*,\s*/i],'last_name':[/\s*,\s*[a-z]+\s+[a-z]+$/i]},
	  //Lastname, Title Firstname
	  {"pattern":/^([a-z]+\s*)+,\s*[a-z]{1,}\.?\s*[a-z]+$/i, 'first_name':[/^[a-z\s]*,\s*[a-z]{1,}\.?\s*/i],'last_name':[/\s*,\s*[a-z]{1,}\.?\s*[a-z]+/i]},
	  //Lastname, Title Firstname Middle Name
	  {"pattern":/^([a-z]+\s*)+,\s*[a-z]{1,}\.?\s*[a-z]+\s+[a-z]+$/i, 'first_name':[/[a-z\s]*,\s*[a-z]{1,}\.?\s*/i],'last_name':[/\s*,\s*[a-z]{1,}\.?\s*[a-z]+\s+[a-z]+/i]},  

	  //Title Firstname Lastname
	  {"pattern":/^[a-z]{1,}\.?\s*[a-z]+\s+[a-z]+$/i, 'first_name':[/\s[a-z]+$/i , /^[a-z]{1,}\.?\s*/i],'last_name':[/^[a-z]{1,}\.?\s*[a-z]+\s/i]},
	  //Title Firstname Middlename Lastname
	  {"pattern":/^[a-z]{1,}\.?\s*[a-z]+\s+[a-z]+(\s+[a-z]+)+$/i, 'first_name':[/^[a-z]{1,}\.?\s*/i , {"pattern":/\s/i,"limit":2}],'last_name':[/^[a-z]{1,}\.?\s*[a-z]+\s+[a-z]+\s+/i]},
	  //Title Firstname
	  {"pattern":/^[a-z]{1,}\.?\s*[a-z]+$/i, 'first_name':[/^[a-z]{1,}\.?\s*/i],'last_name':[/[a-z]{1,}\.?\s*[a-z]+/i]},
	  ];
  	var removeEmpty=function(n){ return n != ""   }
	var nameParser=function(name){
    var check=false;
    var parsed_name={
      'first_name':name,
      'last_name':name,
    }
    for (var i=0;i<name_pattern.length;i++){
      check=name_pattern[i].pattern.test(name)
      if(check){
        name_pattern[i].first_name.forEach(function(element){ 
          if(element.pattern===undefined){
            parsed_name.first_name=parsed_name.first_name.split(element).filter(removeEmpty).join([" "])
          }else{
            parsed_name.first_name=parsed_name.first_name.split(element.pattern,element.limit).filter(removeEmpty).join([" "])
          }         
        });
        name_pattern[i].last_name.forEach(function(element){
          if(element.pattern===undefined){
            parsed_name.last_name=parsed_name.last_name.split(element).filter(removeEmpty).join([" "])
          }
          else{
            parsed_name.last_name=parsed_name.last_name.split(element.pattern,element.limit).filter(removeEmpty).join([" "])
          }
        });
        break;
      }

    }    
    return parsed_name;
  };
	return nameParser;
})();