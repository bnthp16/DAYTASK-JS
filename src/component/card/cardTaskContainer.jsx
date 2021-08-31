import react,{ useState, useEffect } from 'react';
import './card.scss';
import { FormTask } from '../form/form';
import { CardTask } from '../card/cardTask';
import addTask from '../../utils/addTask';
import { v4 as uuidv4 } from 'uuid';

export const CardTaskContainer=()=>{
  const [category, setCategory]= useState("");
  const onChangeCategory = (e) => setCategory(e.target.value);
  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => setTitle(e.target.value);
  const [description, setDescription] = useState("");
  const onChangeDescription = (e) => setDescription(e.target.value);
  const [taskList, setTaskList] = useState([])
  const [id, setId] = useState(0)
  const newTaskList= addTask.addTaskList(id, category, title, description)
   
 const handleSubmit=()=>{
    setTaskList(taskList => taskList.concat(newTaskList))
    setTaskList(taskList => taskList.sort((a,b)=>{ return (a.category > b.category) ? 1 : -1}))
    localStorage.setItem('list-items', JSON.stringify(taskList))
    setId(id + 1)
  }
  const handleRemoveItem=(index)=>{
    setTaskList(taskList.filter(item => item.id !== index))
  }
    useEffect(()=>{
  },[handleRemoveItem, handleSubmit])

  return(
  <div id='container-card-task'>
    <header> 
      <h1>Salut 👋</h1>
      <p>Quelle mission veux-tu ajouter?</p>
     </header>
    <FormTask inputCategory={category} onChangeCat={onChangeCategory} inputTitle={title} onChangeTitle={onChangeTitle} inputDescription={description} onChangeDesc={onChangeDescription} handleFunction={handleSubmit} />
    <h4>Tâches ajoutées</h4>
     {
      taskList.map((item, index)=>{
        return(<>
             <CardTask key={uuidv4().toString()} category={item.category} title={item.title} desc={item.description} handlefunct={()=>handleRemoveItem(index)}/>
        </>)})
      }
     </div>)
    
 
}