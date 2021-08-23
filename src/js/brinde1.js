  function validacao(cpfcnpj,brinde,loja){
 
      var retorno = "leite";
      var urll = 'http://192.99.210.173:8082/think/webresources/cpfbrinde/procurarRegistro/'+cpfcnpj+'/'+brinde;    

      
    $.ajax({
    	
    url : urll,
    
    type : "GET",
    dataType : "json",
	  xhrFields: {
     
    withCredentials: false
  },
	success : function(html){
	console.log(html.success);
	if(html.success){
	var r=confirm(html.msg);
if (r==true)
  {
       inserirDados(cpfcnpj,brinde,loja);
  }
else
  {
  //x="Você pressionou Cancelar!";
  };
     
	}else{
		
	alert(html.msg)	;
	}   
	
	
	 
	}, error : function(e) {
	   alert(e);
        console.log("Log Leite:"+e)
      
	}
	
	}

      );
  
  };

  function inserirDados(cpfcnpj,brinde,loja){
 
      var retorno = "leite";
      var urll = 'http://192.99.210.173:8082/think/webresources/cpfbrinde/inserirRegistro/'+cpfcnpj+'/'+brinde+'/'+loja;    

      
    $.ajax({
    	
    url : urll,
    
    type : "GET",
    dataType : "json",
	  xhrFields: {
     
    withCredentials: false
  },
	success : function(html){
	
	  console.log(html);
	  if(html.success){
		   alert(html.msg)	;
	  }
     

	}, error : function(e) {
	   alert(e);
        console.log("Log Leite:"+e)
      
	}
	
	}

      );
  
  };
