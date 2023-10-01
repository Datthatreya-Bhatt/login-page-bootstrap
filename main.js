let base = 'ed1fe119502b4092a014a4b9df3f678b';


window.onload = ()=>{
	axios.get(`https://crudcrud.com/api/${base}/test`)
	.then((res)=>{
		
		
		let length = res.data.length;
		for(let i =0;i<length;i++){
			
			let li = list(`${res.data[i].name}-${res.data[i].email}-${res.data[i].phoneNumber}`);
			let id = res.data[i]._id;
			

			let del = (id)=>{
				axios.delete(`https://crudcrud.com/api/${base}/test/${id}`)
				.then(
					li.parentNode.removeChild(li))
				.catch( rej => console.log(rej));
			};
		    let ed = (id)=>{
		    	axios.get(`https://crudcrud.com/api/${base}/test/${id}`)
		    	.then( (res)=>{
		    		console.log(res);
		    		document.getElementById("username").value = res.data.name;
		    		document.getElementById("useremail").value = res.data.email;
		    		document.getElementById("phone").value = res.data.phoneNumber;
		    		li.parentNode.removeChild(li);
		    		axios.delete(`https://crudcrud.com/api/${base}/test/${id}`)
		    		.then( ()=>{console.log("edited")})
		    		.catch( (rej)=>console.log(rej)); 
		    	})
		    	.catch( (rej)=>console.log(rej));
		    }
			
		    li.appendChild(delbtn( ()=>{del(id)}));
		    li.appendChild(editbtn( ()=>{ ed(id)}));
		    document.getElementById("listOfItems").appendChild(li);
		    
		};
	})
	.catch( (rej)=>{
		console.log(rej);
	});
}

//delete button function
function delbtn(click){
	//creating delete button
   	let del = document.createElement("input");
   	del.setAttribute("type","button");
   	del.setAttribute("value","Delete");
   	del.className = "btn btn-danger";
   
   	//delete function
    del.onclick =()=>{
	 //deleting from server
	 	click();
	 }

	 return del;
}
//edit button function
function editbtn(click){
	 //creating edit button
    let edit = document.createElement("input");
    edit.setAttribute("type","button");
    edit.setAttribute("value","Edit");
    edit.className = "btn btn-success";

	//edit function
	edit.onclick = () =>{

	 	click();
	 }
	 return edit;
}

//list items functiom
function list(item){
	let li = document.createElement('li');
	li.innerHTML = item;
	return li;
}


function print(event){
	event.preventDefault();
	let user_name = document.getElementById("username").value; 
	let email = document.getElementById("useremail").value;
	let phone = document.getElementById("phone").value;

	//Posting data to crudcrud
	axios.post(`https://crudcrud.com/api/${base}/test`,{
		name : `${user_name}`,
		email : `${email}`,
		phoneNumber : `${phone}`,
	})
	.then(()=>{axios.get(`https://crudcrud.com/api/${base}/test`)
	.then((res)=>{
			let last = res.data.length-1;
			let li = list(`${res.data[last].name}-${res.data[last].email}-${res.data[last].phoneNumber}`);
			let id = res.data[last]._id;

			let del = (id)=>{
				axios.delete(`https://crudcrud.com/api/${base}/test/${id}`)
				.then(
					li.parentNode.removeChild(li))
				.catch( rej => console.log(rej));
			};
		    
		    let ed = (id)=>{
		    	axios.get(`https://crudcrud.com/api/${base}/test/${id}`)
		    	.then( (res)=>{
		    		document.getElementById("username").value = res.data.name;
		    		document.getElementById("useremail").value = res.data.email;
		    		document.getElementById("phone").value = res.data.phoneNumber;
		    		li.parentNode.removeChild(li);
		    		axios.delete(`https://crudcrud.com/api/${base}/test/${id}`)
		    		.then( ()=>{console.log("edited")})
		    		.catch( (rej)=>console.log(rej)); 
		    	})
		    	.catch( (rej)=>console.log(rej));
		    }




		    li.appendChild(delbtn( ()=>{del(id)}));
		    li.appendChild(editbtn( ()=>{ed(id)}));
		    document.getElementById("listOfItems").appendChild(li);
		    
		
	})
	.catch( (rej)=>{
		console.log(rej);
	})})
	.catch( (rej)=>{console.log(rej)});
   	


   

}


