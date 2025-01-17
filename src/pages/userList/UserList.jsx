import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";

//Renders a list of users in a data grid that can be edited or deleted

export default function UserList() {
  //Gets list of users from the Redux store
  const users = useSelector((state) => state.user.users);
  const [showNotification, setShowNotification] = useState(false);

  //Displays notification message for 3000 milliseconds
  const showNotificationMessage = () => {
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000); 
  };

  //Fetches users from server and makes an API call to populate list with users
  const dispatch = useDispatch();
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    showNotificationMessage();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 225 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "isAdmin",
      headerName: "Is Admin",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      {showNotification && <div className="deleteNotification">Deleted User!</div>}
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={15}
      />
    </div>
  );
}