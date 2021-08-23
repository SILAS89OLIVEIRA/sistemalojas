function comboxultimasrevistas(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.revNumRev+">"+values.revNom+"</option>";
      });
    return combox;
    
}

function comboxcidade(titulo,data,id,nome){
    var combox = "<option></option>";
    var data =  data.data;
 //   console.log(data);
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.cidCod+">"+values.cidNome+"</option>";
      });
    return combox;
}

function comboxestado(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
 //   console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.estCod+">"+values.estUf+"</option>";
      });
    return combox;
    
}
function comboxtipoend(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
 //   console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.tipendCod+">"+values.tipendDesc+"</option>";
      });
    return combox;
    
}
function comboxvalorLoja(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
 //   console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.lojCod+">"+values.lojNom+"</option>";
      });
    return combox;
    
}

function comboxvalordescbas(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    
    var data =  data.data;
  //  console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.descbasica_id+">"+values.descbasica_nome+"</option>";
      });
    return combox;
    
}

function comboxvalorvendedora(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    
    var data =  data;
   console.log(data);

    

    $jx.each(data,function(key,value){
       
        
        combox = combox+"<option value="+value.numero+">"+value.numero+" - "+value.nome+"</option>";
      });
    return combox;
    
}

function comboxvalorfornecedor(titulo,data,id,nome,a,tipo2){
 
    var combox = "<option></option>";
   
  //  console.log(data);
    
    if(a !== '1'){
        
      var data =  data.data;
        
    }
    
    
    console.log("asdasdasd+]hugo");
    console.log(tipo2+"tipo");
    if(tipo2 === '1'){
    console.log("TESTE ");
        console.log(data);
        $.each(data,function(key,values){
         if(values.for_rev0_par1 === 1){
            
            combox = combox+"<option value="+values.for_cod+">"+values.for_cod+"-"+values.forvin_nom+"</option>";
         }
         }); 
        
    }else{
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.for_cod+">"+values.for_cod+"-"+values.forvin_nom+"</option>";
      });
    }
    return combox;
    
}

function comboxvalorsegmento(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    
    var data =  data.data;
  //  console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.segCod+">"+values.segNom+"</option>";
      });
    return combox;
    
}

function comboxvalorrevista(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    
    var data =  data.data;
 //   console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.revNumRev+">"+values.revNumRev+" - "+values.revNom+"</option>";
      });
    return combox;
    
}

function comboxvalortamanho(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
//    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.tam_cod+">"+values.tam_nom+"</option>";
      });
    return combox;
    
}

function comboxvaloritensRevista(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
 //   console.log(data);

    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.produtos_dbasica+";"+values.produtos_imagem+";"+values.produtos_pagina+">"+values.produtos_pagina+" - "+values.produtos_descricao+"</option>";
      });
    return combox;
    
}

function comboxproduto(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
//    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.produtos_descricao+">"+values.produtos_descricao+"</option>";
      });
    return combox;
    
}
function comboxvalorLoja(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.lojCod+">"+values.lojNom+"</option>";
      });
    return combox;
    
}

function comboxvalordescbas(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.descbasica_id+">"+values.descbasica_nome+"</option>";
      });
    return combox;
    
}
/*
function comboxvalorfornecedor(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.forCod+">"+values.forNom+"</option>";
      });
    return combox;
    
}  */

function comboxvalorsegmento(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.segCod+">"+values.segNom+"</option>";
      });
    return combox;
    
}

function comboxvalorrevista(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.revNumRev+">"+values.revNumRev+" - "+values.revNom+"</option>";
      });
    return combox;
    
}

function comboxvalortamanho(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.tam_cod+">"+values.tam_nom+"</option>";
      });
    return combox;
    
}

function comboxbrinde(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.brin_cod+">"+values.brin_desc+"</option>";
      });
    return combox;
    
}
function comboxvalortipoend(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.tipendCod+">"+values.tipendDesc+"</option>";
      });
    return combox;
    
}
function comboxvaloruf(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.estCod+">"+values.estUf+"</option>";
      });
    return combox;
    
}
function comboxvalorcidade(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
  
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.cidCod+">"+values.cidNome+"</option>";
      });
    return combox;
    
}
function comboxvalorestciv(titulo,data,id,nome){
 
    var combox = "<option></option>";
   
    var data =  data.data;
    console.log(data);

    
    
    $.each(data,function(key,values){
       combox = combox+"<option value="+values.estcivCod+">"+values.estcivDesc+"</option>";
      });
    return combox;
    
}
