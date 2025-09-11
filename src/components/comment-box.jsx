import React from 'react'
import useCommentsStore from '../zustand/comments-store';
import InputComment from './input-comment';

const CommentBox = ({comment}) => {
    const {upvoteComment, downvoteComment} = useCommentsStore();
    const [isReplying, setIsReplying] = React.useState(false);

    return (
    <li key={comment.id} className="mb-4 ml-10">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{comment.user}</legend>
        <div>{comment.text}</div>
        <div className='mt-2 flex gap-2'>
            <button className="btn btn-sm" onClick={() => upvoteComment(comment.id)}>Upvote {comment.upvotes}</button>
            <button className="btn btn-sm" onClick={() => downvoteComment(comment.id)}>Downvote {comment.downvotes}</button>
            <button className="btn btn-sm" onClick={setIsReplying}>Reply</button>
        </div>
        </fieldset>

        {isReplying &&
        
            <InputComment providedParent={comment.id} isReply={isReplying} toggleReplyChange={setIsReplying}/>
        }
    </li>
  )
}

export default CommentBox
