import { useState} from 'react';
import{Row,Container,Col,Card,Table,Button,Form} from 'react-bootstrap';
import data from './Data/data.json';
import "./frontstyle.css";
function Assignment(){ 
    const [table,setTable]=useState(data);
    //to add data
    const [addData,setAddData]=useState({
        head:'',
        desc:'',
    });
    //checking errors
    const[error,setError]=useState({
        titleemp:'',
        desemp:'',
    });
    //after input
    const  afterTakingInput=(event)=>
    {
        event.preventDefault();
        const field_name=event.target.getAttribute('name');
        const field_value=event.target.value;
        if(!field_value){
            switch(field_name){
                case "head":
                    error.titleemp="title is empty";
                    break;
                case "desc":
                    error.desemp="Description is empty";
                    break;
                default:
                    break;
            }
        }
        else{
             const erc={
                 titleemp:'',
                 desemp:'',
             }
            setError(erc)
            const newFormData={...addData};
            newFormData[field_name]=field_value;
            setAddData(newFormData);
        }
       
    }
    
    //after submit
    const afterSubmit=(event)=>
    {
        event.preventDefault();
        let date = new Date();
        let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const checkt=table.findIndex((table)=>table.title===addData.head);
        const checkd=table.findIndex((table)=>table.description===addData.desc);
        if((!addData.head )|| (!addData.desc) || (checkd!==-1) || (checkt!==-1) ||(addData.desc.match(/^ &$/)!==null) )
        {
            
        alert("Field Must Be Unique And Non-Empty");
        }
        else{
        const newDetail={
            id:table.length+1,
            title:addData.head,
            description:addData.desc,
            createdAt:dateMDY,
        };
        const newRow=[newDetail,...table];
        const newRows=[newDetail,...serchData]
        setTable(newRow);
        setSearchData(newRows)
        
         }
    
    }
    //searching
    const[search,setSearch]=useState([]);
    const[serchData,setSearchData]=useState([])
    const filterData=(event)=>
    {
          if(event.target.value!==""){
               setSearch(event.target.value);
               const filtertable=table.filter(o=>Object.keys(o).some(k=>String(o[k]).toLowerCase().includes(event.target.value.toLowerCase())));
               setSearchData([...filtertable]);
               if(filtertable.length===0){
                   alert("element not found");
               }
            
          }
          else{
              setSearch(event.target.value);
              setTable([...table]);
          }
    }
    //delete
    const handleDelete=(tableid)=>{
        const newTable=[...table];
        const index=table.findIndex((table)=>table.id===tableid);
        newTable.splice(index,1)
        setTable(newTable);
        setSearchData(newTable);
    }
    //sorting
    const sorting=(event)=>
    {
        const field=event.target.value;
        if(field==="title"){
        const sortedarr=[...table].sort((a,b)=> a.title.localeCompare(b.title));
        setTable(sortedarr);
        }
       else if(field==="details"){
            const sortedarr=[...table].sort((a,b)=> a.description.localeCompare(b.description));
            setTable(sortedarr);
        }
        else if(field==="createOn"){
            const sortedarr=[...table].sort((a,b)=>a.createdAt.split('/').reverse().join().localeCompare(b.createdAt.split('/').reverse().join())); 
            setTable(sortedarr);
        }
        else{
            const sortedarr=[...table].sort((a,b)=> a.id - b.id);
            setTable(sortedarr);
        }
    }
    const warn=(num)=>{
        const permit=window.confirm("Do You Really Want To Delete"); 
        if(permit===true){handleDelete(num)}
    }
    return (
        <div>
            <Container className="con">
               <Row>
                    <Col xs={4}>
                        <Card border="light" bg="dark" className="card1">
                            <br/><h1 >Assignment No:01</h1>
                            <Form>
                            <br/>
                                <Form.Group className="mb-3" controlId="title" >
                                     <Form.Label>Title:</Form.Label>
                                     <Form.Control type="Text" name="head"onChange={afterTakingInput} placeholder="Enter Title" required="required" />
                                     <span>{error.titleemp}</span>
                                     <br/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="descrip" style={{margin:"5%",width:"90%"}}>
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control type="Text" onChange={afterTakingInput} name="desc" placeholder="Enter Description" required="required"/>
                                    <span>{error.desemp}</span>
                                </Form.Group>
                                <br/>
                                 <Button className="b1" variant="success" type="submit" onClick={afterSubmit} size="lg">Insert</Button><br/><br/>
                                 <Button className="b2" variant="primary"  type="reset" size="lg">Reset</Button>
                            </Form>
                        </Card>
                   </Col>
                   <Col xs={8}>
                       <Card ClassName="card2" border="light" bg="dark" style={{marginTop:"40px"}} >
                          <Form.Group className="mb-3" controlId="search" style={{width:"70%"}}>
                                <Form.Control type="Text" onChange={filterData} name="search" placeholder="Search Here..." />
                          </Form.Group>
                          <Form.Group className="mb-3 c" controlId="title">
                            <Form.Label className="sortl">Sort By:</Form.Label>
                          </Form.Group>
                          <Form.Select
                                id="select"
                                className="mt-2"
                                onChange={sorting}
                                style={{width:"70%"}}
                           >{["default","title","details","createOn"].map((p) => (<option key={p} value={p}>{p}</option>))}
                           </Form.Select>
                        <Card border="light" className="table" bg="dark">
                            <Table  bordered hover variant="dark">
                                <thead>
                                    <tr >
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Details</th>
                                        <th>Created On</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { search.length>0 ? serchData.map((table)=>(
                                <tr key={table.id}>
                                    <td>{table.id}</td>
                                    <td>{table.title}</td>
                                    <td>{table.description}</td>
                                    <td>{table.createdAt}</td>
                                    <td>
                                        <Button 
                                         variant="danger"
                                        onClick={()=>{warn(table.id)}} >
                                            Delete
                                        </Button>
                                    </td>
                                    </tr>
                                ))
                                :
                                table.map((table)=>(
                                    <tr key={table.id}>
                                    <td>{table.id}</td>
                                    <td>{table.title}</td>
                                    <td>{table.description}</td>
                                    <td>{table.createdAt}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={()=>{warn(table.id)}}>
                                            Delete
                                        </Button>
                                    </td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                            </Table>  
                     </Card>
                 </Card>
                </Col>
              </Row>
             </Container>
        </div>
    ); 

}
export default Assignment;