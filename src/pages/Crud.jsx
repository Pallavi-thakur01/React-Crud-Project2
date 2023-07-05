import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonComponent from "../components/Button.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Modal, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import SimpleModal from "../components/Modal.jsx";
import SimpleModal1 from "../components/Edit";
import { BsPersonCircle} from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { BsFillPersonLinesFill} from 'react-icons/bs';
import  {MdAutoDelete} from 'react-icons/md';


const Crud = () => {
  //Delmodal
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  // const handleClose3 = () => setLgShow(false);
  const handleShow3 = () => setLgShow(true);
  const handleClose1 = () => setSmShow(false);
  const handleShow1 = () => setSmShow(true);

  //Modal
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [Post, setPost] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [editID, setEditID] = useState();
  
  //view
  const [view, setView] = useState({});
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    Gender: "",
  });
  const [Data, setData] = useState([]);

  const { FirstName, LastName, Age, Gender } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEdit = (editIDNotState) => {
    axios
      .get(`http://localhost:4500/students/${editIDNotState}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    handleClose2();
    axios
      .put(`http://localhost:4500/students/${editID}`, formData)
      .then((res) => {
        setFormData({ FirstName: "", LastName: "", Age: "", Gender: "" });
       
      })
      .catch((err) => console.log(err));
    handleClose2();
    showToastMessAge2();
  };

  function handleSubmit() {
    if (FirstName && LastName) {
      setData([...Data, formData]);
      setFormData({ FirstName: "", LastName: "", Age: "", Gender: "" });
      axios
        .post("http://localhost:4500/students", formData)
        .then((res) => {
          setData([...Data, res.data]);
          setFormData({ FirstName: "", LastName: "", Age: "", Gender: "" });
        })

        .catch((err) => console.log(err));
    }

    handleClose();
    showToastMessAge1();
  }

  const showToastMessAge = () => {
    toast.success("Removed successfully !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const showToastMessAge1 = () => {
    toast.success("Create successfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessAge2 = () => {
    toast.success("Update successfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  //DEl Function
  const handleDelete = (id) => {
    handleClose1();
    axios
      .delete(`http://localhost:4500/students/${id}`, formData)
      .then((res) => {
        console.log("DELETD RECORD......", res);
      })
      .catch((err) => console.log(err));
    showToastMessAge();
  };

  //view
  function handleView(item) {
    setView(item);
  }

  useEffect(() => {
    setTimeout(() => {
    axios.get("http://localhost:4500/students").then((res) => {
      // setPost(...Data, res.data);
      setData(res.data);
    });
  }, 4000);
}, [Data]);

  console.log(Post);
  console.log(formData, "Data");

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col p-5">
            <h1 className="mx-5">  <BsPersonCircle/> Student Details</h1>
          </div>
          <div className="col p-5  ">
            <ButtonComponent className="btn btn-warning " text="Create +" onClick={handleShow} > {" "} </ButtonComponent>
          </div>
        </div>

        <SimpleModal show={show} handleClose={() => setShow(false)} handleShow={() => setShow(true)} modalTitle="Enter  Details" handleSubmit={() => handleSubmit()} text="Save" >
          <Form autoComplete="off">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control id="FirstName" type="text" placeholder="First name" name="FirstName" value={FirstName} onChange={handleChange} autoFocus />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control id="LastName" type="text" placeholder="Last name" name="LastName" value={LastName} onChange={handleChange} autoFocus/>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control id="Age" type="number"  placeholder="Age" name="Age" value={formData.Age} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Check type="radio" label="Female" name="Gender" id="Female" value="Female" onChange={handleChange} />
              <Form.Check  type="radio" label="Male" name="Gender" id="Male" value="Male" onChange={handleChange}/>
              <Form.Check type="radio" label="Other" name="Gender" id="other" value="other" onChange={handleChange}/>
            </Form.Group>
          </Form>
        </SimpleModal>

        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              {/* <th>id</th> */}
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr key={index}>
                <td>{item.FirstName}</td>
                <td scope="col">{item.LastName}</td>
                <td scope="col">{item.Age}</td>
                <td scope="col">{item.Gender}</td>
                <td class="col-4">
                 
                  <ButtonComponent
                    className="btn btn-light "
                    text={<AiFillEdit/>}
                   
                    onClick={() => {
                      handleShow2();
                      handleEdit(item.id);
                      setEditID(item.id);
                    }}
                  ><MdDelete/>
                    {" "}
                  </ButtonComponent>
                  <SimpleModal1 show2={show2} handleClose2={() => setShow2(false)}  handleShow2={() => setShow2(true)} modalTitle1="Update Details" handleUpdate={() => handleUpdate()}text="Update" >
            <Form autoComplete="off">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control id="FirstName" type="text" placeholder="First name" name="FirstName" value={FirstName} onChange={handleChange} autoFocus />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control id="LastName" type="text" placeholder="Last name" name="LastName" value={LastName} onChange={handleChange} autoFocus/>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control id="Age" type="number"  placeholder="Age" name="Age" value={formData.Age} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Check type="radio" label="Female" name="Gender" id="Female" value="Female" onChange={handleChange} checked={formData.Gender==="Female"}/>
              <Form.Check  type="radio" label="Male" name="Gender" id="Male" value="Male" onChange={handleChange} checked={formData.Gender==="Male"}/>
              <Form.Check type="radio" label="Other" name="Gender" id="other" value="other" onChange={handleChange} checked={formData.Gender==="other"}/>
            </Form.Group>
          </Form>
                  </SimpleModal1>{" "}
                  
                  <ButtonComponent className="btn btn-danger" text={<  MdDelete/>} onClick={handleShow1} >{" "}</ButtonComponent>{" "}


                  <ButtonComponent className="btn btn-success" text={<AiFillEye/>}
                    onClick={() => {
                      handleShow3();
                      handleView(item);
                    }} >
                    {" "}</ButtonComponent>{" "}


                  <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        <BsFillPersonLinesFill/> Student Information
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {
                        <ListGroup>
                          <ListGroupItem bsStyle="info"> First Name-{view.FirstName} </ListGroupItem>
                          <ListGroupItem bsStyle="info"> Last Name-{view.LastName} </ListGroupItem>
                          <ListGroupItem bsStyle="info">Age-{view.Age} </ListGroupItem>
                          <ListGroupItem bsStyle="info"> Gender-{view.Gender} </ListGroupItem>
                           </ListGroup>
                      }
                    </Modal.Body>
                  </Modal>
                  <ToastContainer />
                  <Modal
                    size="sm"
                    show={smShow}
                    onHide={() => setSmShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-sm">
                     < MdAutoDelete/> Are You Sure?
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Button className="btn btn-danger"onClick={() => handleDelete(item.id)}>Yes</Button>{" "}
                      <Button className="btn btn-danger"onClick={() => handleClose1()} > No</Button>{" "}
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Crud;
