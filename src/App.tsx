import { useEffect, useState } from "react";
import type { UserType } from "./Types/userType";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [name, setName] = useState<string>("");
  const [userClass, setUserClass] = useState<string>("");

  async function uploadUser(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newUser: UserType = {
      id: users.length + 1,
      name: name,
      class: userClass,
    };

    console.log("Uploading user:", newUser.id);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to upload users");
      }
    } catch (error) {
      console.error("Error uploading users:", error);
    }

    setUsers([...users, newUser]);
    setName("")
    setUserClass("")
  }

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        const mappedUsers: UserType[] = data.map((user: UserType) => ({
          id: user.id,
          name: user.name,
          class: user.class,
        }));
        setUsers(mappedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <>
      <h1 className="text-center">Users</h1>
      <table
        className="table table-striped table-bordered table-hover table-dark border border-dark mx-auto mt-5"
        style={{ width: "60%" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr
        className="border border-dark mt-5 mb-5 mx-auto"
        style={{ width: "60%" }}
      />
      <form className="mx-auto form-group" style={{ width: "60%" }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="class" className="form-label">
            Class
          </label>
          <input
            type="text"
            className="form-control"
            id="class"
            onChange={(e) => setUserClass(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => uploadUser(e)}
        >
          Add User
        </button>
      </form>
    </>
  );
}

export default App;
