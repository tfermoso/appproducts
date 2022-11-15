window.onload=()=>{
    document.getElementById("btnSubmit").onclick=(e)=>{
        
        let pass=document.getElementById("pass").value;
        let repass=document.getElementById("repass").value;
        if( pass !== repass){
            e.preventDefault();
            document.getElementById("pass").focus();
            alert("Las contraseñas deben ser iguales")
        }
    }

   
}