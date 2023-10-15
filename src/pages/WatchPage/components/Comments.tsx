import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { parseCommentDate, proxyImage } from "@/lib/utils";
import { supabase } from "@/redux/auth/supabase";
import { useEffect, useState } from "react";

type CommentsProps = {
  episodeId: string;
};

type CommentsReturn = {
  messageId: string;
  message: string;
  created_at: string;
  updated_at: string;
  isEdited: boolean;
  users: {
    userId: string;
    username: string;
    profileUrl: string;
  };
};

export default function Comments({ episodeId }: CommentsProps) {
  const [comments, setComments] = useState<CommentsReturn[] | null>([]);

  useEffect(() => {
    supabase
      .from("comments")
      .select(
        `messageId, message, created_at, updated_at, isEdited, users(userId, username, profileUrl)`
      )
      .eq("episodeId", episodeId)
      .order("created_at", { ascending: false })
      .returns<CommentsReturn[]>()
      .then(({ data }) => setComments(data));
  }, [episodeId]);

  return (
    comments && (
      <>
        {comments.map((comment) => (
          <div key={comment.messageId} className="flex gap-2">
            <Avatar>
              <AvatarImage
                src={proxyImage(comment.users.profileUrl)}
                alt={comment.users.username}
              />
              <AvatarFallback>
                {comment.users.username.substring(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-base text-foreground">
              <div className="flex gap-3 items-center">
                <h1>{comment.users.username}</h1>
                <h1 className="opacity-40 text-sm">
                  {parseCommentDate(comment.created_at)}
                  {comment.isEdited && <span> (edited)</span>}
                </h1>
              </div>
              <p className="font-light">{comment.message}</p>
            </div>
          </div>
        ))}
      </>
    )
  );
}
