let counter = 0;

        function deleteToDo(id) {
            const taskDivToRemove = document.getElementById(id);
            taskDivToRemove.parentNode.removeChild(taskDivToRemove);

            // check if there's no task remaining
            const boxDiv = document.getElementById("boxDiv");
            if(boxDiv.children.length==1){
                document.getElementById("emptyMessage").style.display = "block";
            }
        }

        function addToDo(){
            // counter += 1;  confused : where and how to use
            const taskDiv = document.createElement("div");
            const inputTask = document.querySelector("input").value.trim();

            if(inputTask!=null){
                document.getElementById("emptyMessage").style.display = "none";
            }

            // now time for 1 span tag and 2 button{inputTask,editButton,deleteButton} to be put inside the taskDiv 
            const taskSpan = document.createElement("span");
            taskSpan.textContent = inputTask;
            const editButton = document.createElement("button");
            editButton.textContent = "EDIT";
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "DELETE";

            // before assigning buttons to taskDiv.. setting their listeners
            deleteButton.addEventListener("click",() => deleteToDo('task-${counter}'));
            editButton.addEventListener("click",() => editToDo('task-${counter}'));

            taskDiv.appendChild(taskSpan);
            taskDiv.appendChild(editButton);
            taskDiv.appendChild(deleteButton);

            // now after completing taskDiv.. assign unique id to the taskDiv 
            taskDiv.setAttribute("id",'task-${counter}');
            taskDiv.setAttribute("class", "task");
            document.getElementById("boxDiv").appendChild(taskDiv);
            
            counter+= 1;
            document.querySelector("input").value = "";
        }