import { create } from "zustand";

const useCommentsStore = create((set) => ({
    username: null,
    setUsername: (name) => set({username: name}),
    comments: [],
    addComment: (comment) =>
      set((state) => ({comments: [...state.comments, {...comment, id: Date.now()}]})),
    upvoteComment: (id) =>
      set((state) => ({
        comments: state.comments.map((comment) =>
          comment.id === id ? {...comment, upvotes: comment.upvotes + 1} : comment
        ),
      })),
      downvoteComment: (id) => (set((state) =>  ({
        comments: state.comments.map((comment) => comment.id === id ? {...comment, downvotes: comment.downvotes + 1} : comment)
      }))),
}));

export default useCommentsStore;