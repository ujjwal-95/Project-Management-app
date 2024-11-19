import { useState } from "react";
import NewProject from "./components/Newproject.jsx";
import Noprojectselected from "./components/Noprojectselected.jsx";
import Projectsidebar from "./components/projectssidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
function App() {

  const [projectsState,setprojectsState]=useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  });

  function handleAddTask(text){
    setprojectsState((prevState)=>{
      const taskId=Math.random();
      const newTask={
         text:text,
         projectId:prevState.selectedProjectId,
        id:taskId,
  
      };
      return{
        ...prevState,
        tasks:[newTask,...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id){
    setprojectsState((prevState)=>{
      return{
        ...prevState,
        tasks:prevState.tasks.filter((task)=>task.id!==id),
      };
    });
  } 

  function handleSelectedProject(id){
    setprojectsState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:id,
      };
    });
  }

  function handleStartAddProject(){
    setprojectsState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:null,
      };
    });
  }

  function handleCancelAddProject(){
    setprojectsState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
      };
    });
  }

function handleAddProject(projectData){
  setprojectsState((prevState)=>{
    const projectId=Math.random();
    const newProject={
     ...projectData,
     id:projectId,

    };
    return{
      ...prevState,
      selectedProjectId:undefined,
      projects:[...prevState.projects,newProject]
    };
  });
}

function handleDeleteProject(){
  setprojectsState((prevState)=>{
    return{
      ...prevState,
      selectedProjectId:undefined,
      projects:prevState.projects.filter((project)=>project.id!==prevState.selectedProjectId),
    };
  });
}

const selectedProject=projectsState.projects.find(project=>project.id===projectsState.selectedProjectId);

let content=(
<SelectedProject 
project={selectedProject} 
onDelete={handleDeleteProject}
onAddTask={handleAddTask}
onDeleteTask={handleDeleteTask}
tasks={projectsState.tasks}
 />);

if(projectsState.selectedProjectId === null){
  content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
}
else if(projectsState.selectedProjectId === undefined){
     content=<Noprojectselected onStartAddProject={handleStartAddProject}/>;
}

  return (
    <main className="h-screen my-8 flex gap-8">
      <Projectsidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectedProject} selectedProjectId={projectsState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
