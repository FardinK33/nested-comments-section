import React from 'react'
import CommentBox from './comment-box'

const NestedComments = ({nestedComments}) => {
  return (
    <>
    {
        nestedComments.map(comment => (
            <>
        <CommentBox key={comment.id} comment={comment} />
          {comment.replies.length > 0 && (
            <div>
                    <NestedComments nestedComments={comment.replies} />
            </div>
          )}
          </>
        ))
    }
    </>
  )
}

export default NestedComments
