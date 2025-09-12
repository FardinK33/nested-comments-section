import React from 'react'
import CommentBox from './comment-box'

const NestedComments = ({nestedComments}) => {
  return (
    <>
    {
        nestedComments.map(comment => (
          <div key={comment.id} className='ml-10'>
            <CommentBox key={comment.id} comment={comment} />
            {comment.replies.length > 0 && (
              <NestedComments nestedComments={comment.replies} />
            )}
          </div>
        ))
    }
    </>
  )
}

export default NestedComments
