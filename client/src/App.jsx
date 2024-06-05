import "./App.css";
import Table from "react-bootstrap/Table";
// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import axiosInstance from "./config/axios.config";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("users");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  //for edit modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  //for user modal
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  const handleCloseNewUserModal = () => setShowNewUserModal(false);
  const handleShowNewUserModal = () => setShowNewUserModal(true);

  let [currentId, setCurrentId] = useState(null);
  let [currentUserName, setCurrentUserName] = useState(null);

  const createUser = () => {
    axiosInstance
      .post(`/users`, {
        name: currentUserName,
      })
      .then(function () {
        handleCloseNewUserModal();
        toast.success(`User added successfully`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const editUser = () => {
    axiosInstance
      .put(`/users/${currentId}`, {
        name: currentUserName,
      })
      .then(function () {
        handleCloseDeleteModal();
        toast.success(`User updated successfully`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteUser = () => {
    axiosInstance
      .delete(`/users/${currentId}`)
      .then(function () {
        toast.success(`User deleted successfully`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        handleCloseDeleteModal();
      });
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div>
        <Button
          variant="primary"
          onClick={handleShowNewUserModal}
          className="mb-3"
        >
          Add new User
        </Button>

        <Modal show={showNewUserModal} onHide={handleCloseNewUserModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column gap-2">
              <label htmlFor="nameidNewUser">Name</label>
              <input
                type="text"
                id="nameidNewUser"
                placeholder="Name"
                onChange={(e) => {
                  setCurrentUserName(e.target.value);
                }}
                value={currentUserName}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Close
            </Button>
            <Button variant="primary" onClick={createUser}>
              Add User
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {users.length == 0 ? (
        <h2>No Users to display!</h2>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <>
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{user.name}</td>
                    <td>
                      <div className="d-flex justify-content-evenly">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="green"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                          onClick={() => {
                            handleShow();
                            setCurrentId(user._id);
                            setCurrentUserName(user.name);
                          }}
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="red"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                          onClick={() => {
                            setCurrentId(user._id);
                            setCurrentUserName(user.name);
                            handleShowDeleteModal();
                          }}
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Name of {currentUserName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex flex-column gap-2">
                  <label htmlFor="nameid">Name</label>
                  <input
                    type="text"
                    id="nameid"
                    placeholder="Name"
                    onChange={(e) => {
                      setCurrentUserName(e.target.value);
                    }}
                    value={currentUserName}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={editUser}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          {/* delete User */}
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Name of {currentUserName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this user ?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={deleteUser}>
                  Delete User
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}

export default App;
