import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../service/api";
import { ListGroup, ListGroupItem, Container} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserListing() {
  const [users, setUsers] = useState([]);

  const loadUsers = async (x) => {
    const response = await api.get(`/users?=${x}`);
    console.log(response.data);
    setUsers(response.data);
  };

  useEffect(() => {
    loadUsers(0);
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-center py-5">Gitbub Users List</h1>
        <div>
          <ul>
            {users.map((user) => (
              <Link to={{ pathname: `/${user.login}/details` }}>
                <ListGroup type="inline">
                  <ListGroupItem
                    className="single-user"
                    style={{ cursor: "pointer" }}
                    key={user.id}
                  >
                    <h2>id: {user.id}</h2>
                    <h3>login: {user.login}</h3>
                  </ListGroupItem>
                </ListGroup>
              </Link>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
