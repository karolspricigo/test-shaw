import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../service/api";
import { Container, Table, ListGroup, ListGroupItem } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserDetails(req) {
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const { username } = req.match.params;

  useEffect(() => {
    const loadUserDetails = async () => {
      const userDetails = await api.get(`/users/${username}`);
      setUser(userDetails.data);
      const userRepos = await api.get(`/users/${username}/repos`);
      setRepos(userRepos.data);
    };

    loadUserDetails();
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-center py-5">Github User Listing</h1>
        <div className="content">
          <ul className="user-list">
            <Link to={{ pathname: `/${user.login}/details` }}>
              <ListGroup type="inline">
                <ListGroupItem
                  className="single-user"
                  style={{ cursor: "pointer" }}
                  key={user.id}
                >
                  <h2> User Info: </h2>
                  <p>Name: {user.name}</p>
                  <p>Id: {user.id}</p>
                  <p>Login: {user.login}</p>
                  <p>Profile URL: {user.url}</p>
                  <p>Created At: {user.created_at}</p>
                </ListGroupItem>
              </ListGroup>
            </Link>
          </ul>
          <Table bordered>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Repository URL</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.url}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}
