import React from "react";

import styles from "./AddComment.module.scss";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axios";
import { Navigate, useNavigate } from "react-router-dom";

export const Index = () => {
  const { id } = useParams();
  const [text, setText] = useState();
  const userData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      const fields = {
        id,
        text,
        user: userData._id,
      };

      const { data } = await axios.post(`/comment/${id}`, fields);
      window.location.reload();
    } catch (err) {
      console.warn(err);
      alert("Ошибка при написании комментария");
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src="" />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" onClick={onSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
