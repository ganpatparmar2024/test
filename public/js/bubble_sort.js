function sorting() {

    elements = document.getElementById("inp")
    unsorted = elements.value.split(" ")
   
    if (checkInt(unsorted)) {
        for (let i = 0; i  < unsorted.length; i++) {
    for (let j = 0; j < unsorted.length-i-1; j++) {
        
        if (parseInt(unsorted[j]) >parseInt(unsorted[j+1]) ) {

            let temp = parseInt(unsorted[j])
            unsorted[j] = parseInt(unsorted[j+1])
            unsorted[j+1] = temp
        }
        
    }


        
    }

    }

    else{
        for (let i = 0; i  < unsorted.length; i++) {
    for (let j = 0; j < unsorted.length-i-1; j++) {
        
        if (unsorted[j] >unsorted[j+1] ) {

            let temp = unsorted[j]
            unsorted[j] = unsorted[j+1]
            unsorted[j+1] = temp
        }
        
    }


        
    }


    }
  

document.getElementById("sort").innerHTML =  "Sorted Elemens :- "+unsorted
              
}

function checkInt(list) {
    
    console.log(list)
    for (let i = 0; i < list.length; i++) {
        a = list[i]
        for (let j = 0; j < a.length; j++) {
          
            if (a.charCodeAt(j)>= 48 && a.charCodeAt(j) <=57) {
                continue
            }
            else{
                
                return false
            }
        }
        
        
            
       
        
    }

    return true
}