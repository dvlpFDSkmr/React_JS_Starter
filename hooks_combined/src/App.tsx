import "./App.css";
import { useEffect, useState, useRef, useMemo } from "react";
import type {User} from './types/types'

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [clearfilter, setClearFilters] = useState<boolean>(true);
  const [retry, setRetry] = useState<number>(0);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);
  const [serachName, setSerachName] = useState<string>("");

  const filteredUsers: User[] = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      const seracFilter: boolean = fullName.trim().toLowerCase().includes(serachName.trim().toLowerCase());
      const ageFilter: boolean = clearfilter ? true : user.age >= minAge && user.age <= maxAge;

      return seracFilter && ageFilter;
    });
  }, [minAge, maxAge, serachName, clearfilter, users]);

  useEffect(() => {
    async function getUsersApiData() {
      setLoading(true);
      setError(false);
      try {
        const apiResponse = await fetch(`https://dummyjson.com/users`);
        const data = await apiResponse.json();
        setUsers(data.users);
        inputRef.current?.focus();

        if (!apiResponse.ok) {
          setLoading(false);
          setError(true);
        }
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
        throw new Error(`ERROR IN LOADING DUMMY API`);
      }
    }
    getUsersApiData();
  }, [retry]);

  if (loading) {
    return <h1>Loading....</h1>;
  }
  if (error) {
    return (
      <div>
        <h1>Error check your connection....</h1>
        <button onClick={() => setRetry((s) => s + 1)}>Retry : {retry}</button>
      </div>
    );
  }

  function handleClearFilter() {
    setSerachName("");
    setMinAge(0);
    setMaxAge(0);
    setClearFilters(!clearfilter);
  }

  const avgAge = filteredUsers.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);

  return (
    <div className="userDir">
      <h1>Employee Directory</h1>

      <div className="header">
        <h3>Total Employees : {users.length}</h3>
        <h3>Current Employees : {filteredUsers.length === 0 ? <p>No employees</p> : filteredUsers.length}</h3>
        <h3>Average Age : {filteredUsers.length === 0 ? <p>NaN</p> : (avgAge / filteredUsers.length).toFixed(2)}</h3>
      </div>

      <div className="inputSection">
        <input
          type="text"
          value={serachName}
          placeholder="...serach Name"
          onChange={(e) => setSerachName(e.currentTarget.value)}
          ref={inputRef}
        />
        <b>Min age</b>
        <input type="text" value={minAge} onChange={(e) => setMinAge(Number(e.currentTarget.value))} />
        <b>Max age</b>
        <input type="text" value={maxAge} onChange={(e) => setMaxAge(Number(e.currentTarget.value))} />
        <button
          style={clearfilter ? { backgroundColor: "blue" } : { backgroundColor: "red" }}
          onClick={handleClearFilter}>
          Clear Filters
        </button>
      </div>

      <div className="userList">
        {filteredUsers.length === 0 ? (
          <h1>No Employees...</h1>
        ) : (
          filteredUsers.map((user) => (
            <div className="userCard" key={user.id}>
              <img src={user.image} alt={user.firstName} />
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>
                {user.age}, <i>{user.gender}</i>
              </p>
              <p>
                <b>{user.email}</b>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
