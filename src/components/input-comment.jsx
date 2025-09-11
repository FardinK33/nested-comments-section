import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useCommentsStore from '../zustand/comments-store';

const initialState = {text: "", parentId: null, upvotes: 0, downvotes: 0};

const InputComment = ({providedParent, isReply, toggleReplyChange, providedId=Date.now() }) => {

    const [comment, setComment] = useState(initialState);
    const { addComment } = useCommentsStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        setComment(prev => ({...prev, parentId: providedParent || null}));
        
        if (isReply) {
            toggleReplyChange(false);
        }
        setComment(prev => ({...prev}));
        addComment(comment);
        setComment(initialState);
    }

    return (
        <form className="flex gap-2" onSubmit={handleSubmit}>
            <input type="text" placeholder="Type here" className="input" value={comment.text} onChange={(e) => setComment(prev => ({...prev, text: e.target.value}))}/>
            <button type="submit" className="btn">Submit</button>
        </form>
  )
}

export default InputComment
