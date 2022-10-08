import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchSortedPosts, fetchTags } from "../redux/slices/posts";
import { useState } from "react";
import { fetchComments } from "../redux/slices/comment";
export const Home = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comment.data);
  const userData = useSelector((state) => state.auth.data);
  const [selectedTab, selectTab] = useState(0);
  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const onClickSort = (e) => {
    let sortOrder;
    if (e.target.innerText == "Новые") {
      sortOrder = "date";
      selectTab(0);
    } else {
      sortOrder = "viewsCount";
      selectTab(1);
    }
    dispatch(fetchSortedPosts(sortOrder));
    console.log(sortOrder);
  };
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);
  console.log(comments);
  console.log(posts);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={selectedTab}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={onClickSort} />
        <Tab label="Популярные" onClick={onClickSort} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true}></Post>
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                    : ""
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
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments.map((obj) => {
              return {
                user: {
                  fullName: obj?.user?.fullName,
                  avatarUrl: obj?.user?.avatarUrl,
                },
                text: obj?.text,
              };
            })}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
