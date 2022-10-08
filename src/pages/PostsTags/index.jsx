import { exactProp } from "@mui/utils";
import React from "react";
import { Post } from "../../components";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostWithSameTags } from "../../redux/slices/posts";
export const PostsTags = () => {
  const { tagName } = useParams();
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostLoading = posts.status === "loading";
  const userData = useSelector((state) => state.auth.data);
  React.useEffect(() => {
    dispatch(fetchPostWithSameTags(tagName));
  }, []);
  console.log(tagName);
  return (
    <Grid container spacing={4}>
      <Grid xs={16} item>
        {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
          isPostLoading ? (
            <Post key={index} isLoading={true}></Post>
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
              }
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={null}
              tags={obj.tags}
              isEditable={userData?._id == obj.user._id}
            />
          )
        )}
      </Grid>
    </Grid>
  );
};
