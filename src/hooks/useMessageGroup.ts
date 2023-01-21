import { useCallback, useMemo, useState } from "react";
import { ChatMessage } from "../types/ChatMessage";

const buildChatMessageGroups: (
  chatMessages?: ChatMessage[]
) => ChatMessage[][] = (chatMessages?: ChatMessage[]) => {
  const groups: ChatMessage[][] = [];
  let lastGroup: ChatMessage[];

  if (!chatMessages) return [];

  chatMessages.forEach((msg) => {
    if (groups.length === 0) {
      lastGroup = [msg];
      groups.push(lastGroup);
      return;
    }

    if (lastGroup[lastGroup.length - 1].senderType !== msg.senderType) {
      lastGroup = [msg];
      groups.push(lastGroup);
      return;
    }

    lastGroup.push(msg);
  });

  return groups;
};

export const useMessageGroup = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessages = useCallback((messages: ChatMessage[] | ChatMessage) => {
    if (Array.isArray(messages)) {
      setMessages(
        (prevMessages) => [...prevMessages, ...messages]
      );
    } else {
      setMessages(
        (prevMessages) => [...prevMessages, messages]
      );
    }
  }, []);

  const groups = useMemo(() => buildChatMessageGroups(messages), [messages]);

  return { groups, addMessages };
};
