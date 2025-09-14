import { useEffect, useState } from "react";
import InputComment from "./components/input-comment"
import NestedComments from "./components/nested-comments";
import useCommentsStore from "./zustand/comments-store";

const createNesting = (comments) => {
  const commentsMap = {};

  comments.forEach(comment => {
    commentsMap[comment.id] = {...comment, replies: []};
  })

  const nestedComments = [];
  comments.forEach(comment => {
    if (comment.parentId) {
      commentsMap[comment.parentId].replies.push(commentsMap[comment.id]);
    } else {
      nestedComments.push(commentsMap[comment.id]);
    }
  })

  return nestedComments;
}

const sortComments = (comments, sortBy) => {
  const sorted = [...comments].sort((a,b) => {
    if (sortBy === "upvotes") {
      return b.upvotes - a.upvotes;
    } else if (sortBy === 'downvotes') {
      return b.downvotes - a.downvotes;
    } else {
      return a.id - b.id;
    }
  })
  
  return sorted.map((comment) => ({
    ...comment, 
    replies: sortComments(comment.replies || [], sortBy)
  }))
}

const App = () => {
  const {comments} = useCommentsStore();
  const [nestedComments, setNestedCommens] = useState(createNesting(comments) || []);
  const [sortBy, setSortBy] = useState("time")

  useEffect(() => {
    const nested = createNesting(comments);
    const sortedComments = sortComments(nested, sortBy);
    setNestedCommens(sortedComments);
  }, [comments, sortBy]);

  return (
    <div>
      <InputComment/>
      <div className="flex gap-5 m-3">
        <button className="btn btn-accent" onClick={()=> setSortBy("upvotes")}>Upvotes</button>
        <button className="btn btn-accent" onClick={()=> setSortBy("downvotes")}>Downvotes</button>
        <button className="btn btn-accent" onClick={()=> setSortBy("time")}>Time</button>
      </div>
      <NestedComments nestedComments={nestedComments} />
    </div>
  )
}

export default App
