import { dummyChatInfoLists, dummyUserChats } from '../mocks/dummyChats';
import { compareRecent } from '../utils/utils';
import { useState } from 'react';
export default function Chat() {
  const { chatInfoList } = dummyChatInfoLists.filter(({ id }) => id === 1)[0];
  chatInfoList.sort(compareRecent);
  const [nowReceiver, setNowReceiver] = useState({
    id: chatInfoList[0].id,
    name: chatInfoList[0].name,
  });

  return (
    <>
      <div>
        <h2>채팅 목록</h2>
        {chatInfoList.map(({ id, name, date }) => {
          return (
            <div key={id} onClick={() => setNowReceiver({ id, name })}>
              <img src='http://cataas.com/cat?width=50' alt='' /> {name} <br />
              {date}
            </div>
          );
        })}
      </div>
      <div>
        <img src='http://cataas.com/cat?width=50' alt='' /> {nowReceiver.name}
        <br />
        {dummyUserChats
          .filter(({ id }) => id === 1)[0]
          .messages.filter(
            ({ senderId, receiverId }) =>
              senderId === nowReceiver.id || receiverId === nowReceiver.id
          )
          .map(({ date, receiverId, content }) => (
            <div>
              {receiverId !== nowReceiver.id && '*'} <br />
              {content} <br />
              {date}
            </div>
          ))}
        <input type='text' name='' id='' /> <button>전송</button>
      </div>
    </>
  );
}
