import { compareRecent } from '../utils/utils';
import { useEffect, useState } from 'react';
import type { ChatInfoList, Message } from '../types/chats';
export default function Chat() {
  const userId = localStorage.getItem('user_id');
  const [nowChatInfoList, setNowChatInfoList] = useState<ChatInfoList>([]);
  const [nowReceiver, setNowReceiver] = useState<{
    id: number;
    name: string;
  }>();
  const loadChatInfoList = async () => {
    try {
      const response = await fetch('/chatlist', {
        method: 'POST',
        body: JSON.stringify({ id: userId }),
      });
      const sortedChatInfoList = (await response.json()).sort(compareRecent);
      if (!response.ok) throw Error(`${response.status}`);
      setNowChatInfoList(sortedChatInfoList);
      return sortedChatInfoList;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadChatInfoList().then((nowChatInfoList) => {
      setNowReceiver(nowChatInfoList[0]);
    });
  }, []);
  useEffect(() => {
    if (!nowReceiver) {
      return;
    }
    const evtSource = new EventSource(`/chat/${userId}/${nowReceiver.id}`);
    evtSource.onmessage = (e) => {
      setMessages(JSON.parse(e.data));
    };
    return () => evtSource.close();
  }, [nowReceiver]);
  const [nowMessageContent, setNowMessageContent] = useState('');
  const sendMessage = async (receiverId: number) => {
    if (!userId) return;
    try {
      await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: parseInt(userId),
          receiverId,
          content: nowMessageContent,
        }),
      });
      setNowMessageContent('');
    } catch (error) {
      console.error(error);
    }
  };
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <>
      <div>
        <h2>채팅 목록</h2>

        {nowChatInfoList &&
          nowChatInfoList.map(({ id, name, date }) => {
            return (
              <div key={id} onClick={() => setNowReceiver({ id, name })}>
                <img src='http://cataas.com/cat?width=50' alt='' /> {name}{' '}
                <br />
                {date}
              </div>
            );
          })}
      </div>
      {nowReceiver && (
        <div>
          <img src='http://cataas.com/cat?width=50' alt='' /> {nowReceiver.name}
          <br />
          {messages.map(({ date, receiverId, content }) => (
            <div key={`${date},${receiverId}`}>
              {receiverId !== nowReceiver.id && '*'} <br />
              {content} <br />
              {date}
            </div>
          ))}
          <input
            type='text'
            name='messageInput'
            value={nowMessageContent}
            onChange={(event) => setNowMessageContent(event.target.value)}
          />{' '}
          <button onClick={() => sendMessage(nowReceiver.id)}>전송</button>
        </div>
      )}
    </>
  );
}
