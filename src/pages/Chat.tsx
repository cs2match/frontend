import { dummyChatInfoLists } from '../mocks/dummyChats';
import { compareRecent } from '../utils/utils';
export default function Chat() {
  const { chatInfoList } = dummyChatInfoLists.filter(({ id }) => id === 1)[0];
  return (
    <>
      <div>
        <h2>채팅 목록</h2>
        {chatInfoList.sort(compareRecent).map(({ id, name, date }) => {
          return (
            <div key={id}>
              <img src='http://cataas.com/cat?width=50' alt='' /> {name} <br />
              {date}
            </div>
          );
        })}
      </div>
    </>
  );
}
