len =  document.getElementsByTagName("td").length
        toggle = 0
        visited = []
        result = [['1','2','3'],['3','2','1'],['1','4','7'],['7','4','1'],['1','5','9'],['9','5','1'],['2','5','8'],['8','5','2'],['3','5','7'],['7','5','3'],['3','6','9'],['9','6','3'],['4','5','6'],['6','5','4'],['7','8','9'],['9','8','7']]
        result0 = []
        result1 = []


            for (let i = 0; i < len; i++) {
             document.getElementsByTagName("td")[i].setAttribute("onclick", "addimage(this)")     
             document.getElementsByTagName("td")[i].setAttribute("id",i+1)
            // document.querySelector("td").setAttribute()  
             console.log(document.getElementsByTagName("td")[i])
        }
        


    
      

        function addimage(element) {
            
            if ((toggle == 0) && (visited.includes(element.id) == false)) {

                element.innerHTML = "<h1>O</h1>"
                visited.push(String(element.id))
                result0.push(String(element.id))
                if (result0.length>=3 ) {
                    let data = new Array(3);
                    if (result0.length + result1.length == 9) {
                            alert("Match is Draw")
                            window.location.reload()
                        }
                        
                    combinationUtil(result0,data,0,result0.length-1,0,3,iteam = "0")
                    
                                       
                }
                
                toggle = 1
            }

            else{

                if (visited.includes(element.id) == false) {
                    element.innerHTML = "<h1>X<h1/>"
                    visited.push(String(element.id))
                    result1.push(String(element.id))
                    if (result1.length>=3) {
                        let data1 = new Array(3)
                        if (result0.length + result1.length == 9) {
                            alert("Match is Draw")
                            window.location.reload()
                        }
                        combinationUtil(result1,data1,0,result1.length-1,0,3,iteam = "1")
                        
                    }

                    toggle = 0
                }
                
            }


        }

        function combinationUtil(arr,data,start,end,index,r,iteam)
        {
            
            if (index == r)
            {
                let temp = Array()
                for (let j=0; j<r; j++)
                {
                
                    temp.push(data[j])
                }
                
                
                
                 for (let j = 0; j < result.length; j++) {
                    if ((JSON.stringify(temp) == JSON.stringify(result[j])) || (JSON.stringify (temp.reverse) ==  JSON.stringify(result[j]))){
                        if (iteam == "0") {
                            alert("Player 1 Won Game")  
                            window.location.reload()
                        }
                        else{
                            alert("Player 2 Won Game")
                            window.location.reload()
                        }  
                                              
                    }
                    
                    
                 }
                
            }

           
            for (let i=start; i<=end && end-i+1 >= r-index; i++)
            {
                data[index] = arr[i];
                combinationUtil(arr, data, i+1, end, index+1, r,iteam);
            }
        }