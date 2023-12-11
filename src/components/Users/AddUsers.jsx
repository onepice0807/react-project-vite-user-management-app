/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUsers.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUsers = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        massage: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }

    // +를 넣는 것은 확실하게 숫자형인것을 나타내기 위해
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        massage: "Please enter a valid age (> 0).",
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          massage={error.massage}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUsers;
