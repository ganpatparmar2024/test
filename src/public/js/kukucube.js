const colors = [];
        var count = 0
        var timecount = 25

        let correctclickcount = 0     
         
        
            
        for (let i = 0; i < 30; i++) {
                const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            colors.push(randomColor);
            }            
        
    


       function startGame() {
        
        currentColumn = document.querySelector(".row2col2")
        currentColumn.style.opacity = "1"
        correctclickcount++
        addFirstColumn()

        next()
        console.log(correctclickcount)
       }

       function next() {
        
        rowLen = document.querySelectorAll(".row").length
        colLen = document.querySelectorAll(".col1").length
        
        document.querySelector("table").style.backgroundColor= colors[count]
      
        randomCol = selectRandomCell()
        
        
        randomCol.style.opacity = "0.1"
        
        randomCol.setAttribute("onclick","addRowColumn()")
        
        
        count+=1
        
        
        

        
       }


       function addFirstColumn() {
        
        document.getElementById("count1").innerHTML = "<h1>"+"Your Score"+correctclickcount +"</h1>"
        rowLen = document.querySelectorAll(".row").length
        colLen = document.querySelectorAll(".col1").length
        const row = document.createElement("tr")
            for (let id = 1; id <= colLen; id++) {
                const col = document.createElement("td")
                
                    console.log(id,(rowLen+1))
                    classNamecol = "col" + (rowLen+1) + " " + "row" + (rowLen+1) + "col" +id                
                col.className = classNamecol
                const node = document.createTextNode("new")
                col.appendChild(node)
                
                row.appendChild(col)
                row.className =  "row" + " " + "row" + (rowLen+1) 
                console.log(col.className)
                
                                               
                
            }
            document.querySelector("table").appendChild(row)
            console.log(row.className) 

            rowLen = document.querySelectorAll(".row").length
            colLen = document.querySelectorAll(".col1").length

            for (let i = 1; i <= rowLen; i++) {
                
                const col = document.createElement("td")
                let classNameCol = "col" + i + " " + "row" + i + "col" + (colLen)
                col.className = classNameCol
                const node = document.createTextNode("new")
                col.appendChild(node)
               
                let rowName = "row row" + i
                const row = document.getElementsByClassName(rowName)[0]
                row.appendChild(col)
               
                
                
            }

       }


        function addRowColumn() {
            count+=1
            correctclickcount++
            document.getElementById("count1").innerHTML = "<h1>"+"Your Score"+correctclickcount +"</h1>"
            console.log(correctclickcount)
            rowLen = document.querySelectorAll(".row").length
            colLen = document.querySelectorAll(".col1").length
          
            document.querySelector("table").style.backgroundColor= colors[count]
            randomCol.style.opacity = "100"
            randomCol.setAttribute("onclick","")
            const row = document.createElement("tr")
            for (let id = 1; id <= colLen; id++) {
                const col = document.createElement("td")
                
                    console.log(id,(rowLen+1))
                    classNamecol = "col" + (rowLen+1) + " " + "row" + (rowLen+1) + "col" +id                
                col.className = classNamecol
                const node = document.createTextNode("new")
                col.appendChild(node)
                
                row.appendChild(col)
                row.className =  "row" + " " + "row" + (rowLen+1) 
                console.log(col.className)
                
                                               
                
            }



            document.querySelector("table").appendChild(row)
            console.log(row.className) 

            rowLen = document.querySelectorAll(".row").length
            colLen = document.querySelectorAll(".col1").length
            
            for (let i = 1; i <= rowLen; i++) {
                
                const col = document.createElement("td")
                let classNameCol = "col" + i + " " + "row" + i + "col" + (colLen)
                col.className = classNameCol
                const node = document.createTextNode("new")
                col.appendChild(node)
               
                let rowName = "row row" + i
                const row = document.getElementsByClassName(rowName)[0]
                row.appendChild(col)
               
                
                
            }
           
            next()

            
            
        }

        function selectRandomCell() {
            rowLen = document.querySelectorAll(".row").length
            colLen = document.querySelectorAll(".col1").length
            col = Math.floor(Math.random() * ( colLen- 1) + 1) 
            row = Math.floor(Math.random() * ( rowLen- 1) + 1)
            colName = "col" + row + " " + "row"+ row+ "col"+ col
            return document.getElementsByClassName(colName)[0]     
        }

        

     
        const timer = setInterval(function(){
            timecount--
            document.getElementById("count2").innerHTML = timecount
            if(timecount == 0){
                clearInterval(timer)
                document.getElementById("count2").innerHTML = "Game is up"
                alert(correctclickcount)    
            }
        },1000)
