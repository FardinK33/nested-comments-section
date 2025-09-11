import CommentBox from "./components/comment-box"
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


const App = () => {
  const {comments} = useCommentsStore();
  const nestedComments = createNesting(comments);
  return (
    <div>
      <InputComment/>
      <NestedComments nestedComments={nestedComments} />
    </div>
  )
}

export default App
