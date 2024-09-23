

import { RiDeleteBin6Fill } from "react-icons/ri";
function UsersData(props) {

  function handleUpdatebtn(){
    console.log("butten  clicked !");
    
  }


    
  return (
    <>
    <section>
       
    <table className="table container border shadow mt-4">
  <thead className=" table-dark thead-dark">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Address</th>
      <th><RiDeleteBin6Fill/></th>
    
    </tr>
  </thead>
  <tbody >
    {
        props.data.map((item, index)=>{
            return(
                <tr   key={index}>
                <th  scope="row">{index +1}</th>
                <td    >{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <button  className='btn bg-danger py-1 mt-1' onClick={handleUpdatebtn} ><RiDeleteBin6Fill/></button>
               
              </tr>
            );
        })
    }
    

   
  </tbody>
</table>

    </section>
    
    
    </>
  )
}

export default UsersData