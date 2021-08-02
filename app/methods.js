var SERVER_URL = 'http://dev.cs.smu.ca:8146';
function save(){
var name = $("#name").val();
 var address = $("#address").val();
 var phone = $("#phone").val(); 

    //check empty fields
    if (name == '') {
        alert("Please enter the name of the university!");
        $("#name").focus();
        return false;
    }
    if (address == '') {
        alert("Please enter the address of the university!");
        $("#address").focus();
        return false;
    }
    if (phone == '') {
        alert("Please enter the phone number of the university!");
        $("#phone").focus();
        return false;
    }
    var tokens = phone.split('-');

    for (var i = 0; i < tokens.length; i++) {
        if (isNaN(tokens[i])) {
            alert("Please use only numbers or hyphens!");
            $("#phone").focus();
            return false;
        }//end if
    }//end for
    var firstChar = address.trim().substr(0, 1);

    if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#address").focus();
        return false;
    }
    if (validCharForStreetAddress(address)) {
        alert("Address should contain letters!");
        $("#address").focus();
        return false;
    }
    var universityInfo = {
        "Name": name ,
        "Address": address ,
        "Phone": phone 
    };
    var universities = localStorage.getItem("universities");
    //alert(universities)
    if(universities == null)
    {
	universities = [];
    }
    else
    {
	universities = JSON.parse(universities);
     }
     universities.push(universityInfo);
     localStorage.setItem("universities",JSON.stringify(universities));    //uni 
	
     $.POST(SERVER_URL + "/addUniversity",
                        universityInfo,
                        function (data) {
                        alert(data);
			alert("data inserted successfully");
    });
    //universities.length=0;

}
function validCharForStreetAddress(c) {
    if(",#-/ !@$%^*(){}|[]\\".indexOf(c) >= 0){
        return true
    }
    var regExp = /[a-zA-Z]/g;
    if(!regExp.test(c)){
        return true
    }
}


function remove()
{
var name = $("#name").val();
if (name == '') {
        alert("Please enter the name of the university!");
        $("#name").focus();
        return false;
    }
universities= localStorage.getItem("universities");
if(universities == null)
{
	alert("no record found");
}
else
{
	universities = JSON.parse(universities);
	for(var i=0;i<universities.length;i++)
	{
		var name = universities[i].Name;
		if($("#name").val()== name)
		{
			universities.splice(i,1);
			if(universities.length == 0)
			{
				localStorage.removeItem("universities");
			}
			else
			{
				localStorage.setItem("universities",JSON.stringify(universities));
			}
			alert("record deleted");
			$("#name").val("");
			$("#phone").val("");
			$("#address").val("");
			return;
		}
       	}
   }
   var universityInfo = {
            "Name": document.getElementById("name").value  };
    $.DELETE(SERVER_URL + "/deleteUniversity",
                        universityInfo,
                        function (data));

}

function showAll(ele)
{
	universities= localStorage.getItem("universities");
	if(universities == null)
	{
		alert("no record found");
	}
	else
	{
		universities = JSON.parse(universities);
		var r = table.insertRow();
		for(var i=0;i<universities.length;i++)
		{
			var name = universities[i].Name;
			
			var address = universities[i].Name;
			var phone = universities[i].Name;
			
			$("#name").val(name);
			$("#address").val(address);
			$("#phone").val(phone);
			
			
            		r.insertCell(-1).innerHTML = name;
            		r.insertCell(-1).innerHTML = address;
            		r.insertCell(-1).innerHTML = phone; 
            
				
		}
		return;			
	}
}

function show(ele){

var name = $("#search").val();

if (name == '') {
        alert("Please enter the name of the university!");
        $("#name").focus();
        return false;
    }

    universities= localStorage.getItem("universities");
    if(universities == null)
    {
		alert("no record found");
    }
    else
    {
	universities = JSON.parse(universities);
	for(var i=0;i<universities.length;i++)
	{
		var name = universities[i].Name;
		if($("#search").val()== name)
		{
			var address = universities[i].Address
			var phone = universities[i].Phone;
				
			$("#name").val(name);
			$("#address").val(address);
			$("#phone").val(phone);
		
			return;
		}
	
	}
        $.get(SERVER_URL + "/searchUniversity",
                            universityInfo,
                            function (data));
	alert("record not found");
    }
 
}
    
    
