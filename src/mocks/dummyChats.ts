export const dummyChatInfoLists = [
  {
    id: 1,
    chatInfoList: [
      {
        id: 2,
        name: '전략가',
        date: '2025-01-14T16:45:00.000Z',
      },
      {
        id: 3,
        name: '뉴비',
        date: '2025-01-13T09:20:00.000Z',
      },
      {
        id: 4,
        name: '맵마스터',
        date: '2025-01-12T11:15:00.000Z',
      },
    ],
  },
  {
    id: 2,
    chatInfoList: [
      {
        id: 1,
        name: '에임장인',
        date: '2025-01-14T16:45:00.000Z',
      },
      {
        id: 3,
        name: '뉴비',
        date: '2025-01-14T10:15:00.000Z',
      },
      {
        id: 4,
        name: '맵마스터',
        date: '2025-01-13T14:20:00.000Z',
      },
    ],
  },
  {
    id: 3,
    chatInfoList: [
      {
        id: 1,
        name: '에임장인',
        date: '2025-01-13T09:20:00.000Z',
      },
      {
        id: 2,
        name: '전략가',
        date: '2025-01-14T10:15:00.000Z',
      },
      {
        id: 4,
        name: '맵마스터',
        date: '2025-01-13T16:10:00.000Z',
      },
    ],
  },
  {
    id: 4,
    chatInfoList: [
      {
        id: 1,
        name: '에임장인',
        date: '2025-01-12T11:15:00.000Z',
      },
      {
        id: 2,
        name: '전략가',
        date: '2025-01-13T14:20:00.000Z',
      },
      {
        id: 3,
        name: '뉴비',
        date: '2025-01-13T16:10:00.000Z',
      },
    ],
  },
];

// 각 유저별 채팅 메시지 더미데이터
export const dummyUserChats = [
  {
    id: 1,
    messages: [
      // 유저 1과 유저 2의 채팅
      {
        senderId: 1,
        receiverId: 2,
        content: '안녕하세요! 같이 게임하실래요?',
        date: '2025-01-14T16:30:00.000Z',
      },
      {
        senderId: 2,
        receiverId: 1,
        content: '네! 좋아요. 어떤 맵에서 플레이할까요?',
        date: '2025-01-14T16:32:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 2,
        content: '미라지나 더스트2 중에 선택하세요!',
        date: '2025-01-14T16:33:00.000Z',
      },
      {
        senderId: 2,
        receiverId: 1,
        content: '더스트2로 하겠습니다. 전략적으로 플레이해보죠!',
        date: '2025-01-14T16:35:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 2,
        content: '완벽해요! 5분 후에 시작하겠습니다.',
        date: '2025-01-14T16:45:00.000Z',
      },
      // 유저 1과 유저 3의 채팅
      {
        senderId: 3,
        receiverId: 1,
        content: '안녕하세요! 게임 잘하시는 것 같아서 조언 부탁드려요.',
        date: '2025-01-13T09:15:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 3,
        content: '안녕하세요! 물론이죠. 어떤 부분에서 도움이 필요하신가요?',
        date: '2025-01-13T09:17:00.000Z',
      },
      {
        senderId: 3,
        receiverId: 1,
        content: '에임이 너무 안 맞아요. 어떻게 연습하면 좋을까요?',
        date: '2025-01-13T09:18:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 3,
        content:
          '에임 연습은 연습장에서 많이 해보시는 게 좋아요. 천천히 조준해서 쏘는 연습부터 시작하세요!',
        date: '2025-01-13T09:20:00.000Z',
      },
      // 유저 1과 유저 4의 채팅
      {
        senderId: 4,
        receiverId: 1,
        content: '에임장인님! 새로운 맵 정보 있으신가요?',
        date: '2025-01-12T11:10:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 4,
        content: '네! 새로 나온 맵에서 좋은 스팟 몇 개 발견했어요.',
        date: '2025-01-12T11:12:00.000Z',
      },
      {
        senderId: 4,
        receiverId: 1,
        content: '정말요? 어디인지 알려주세요!',
        date: '2025-01-12T11:13:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 4,
        content: 'A사이트 근처에 숨을 수 있는 곳이 있어요. 같이 확인해볼까요?',
        date: '2025-01-12T11:15:00.000Z',
      },
    ],
  },
  {
    id: 2,
    messages: [
      // 유저 2와 유저 1의 채팅
      {
        senderId: 1,
        receiverId: 2,
        content: '안녕하세요! 같이 게임하실래요?',
        date: '2025-01-14T16:30:00.000Z',
      },
      {
        senderId: 2,
        receiverId: 1,
        content: '네! 좋아요. 어떤 맵에서 플레이할까요?',
        date: '2025-01-14T16:32:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 2,
        content: '미라지나 더스트2 중에 선택하세요!',
        date: '2025-01-14T16:33:00.000Z',
      },
      {
        senderId: 2,
        receiverId: 1,
        content: '더스트2로 하겠습니다. 전략적으로 플레이해보죠!',
        date: '2025-01-14T16:35:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 2,
        content: '완벽해요! 5분 후에 시작하겠습니다.',
        date: '2025-01-14T16:45:00.000Z',
      },
      // 유저 2와 유저 3의 채팅
      {
        senderId: 2,
        receiverId: 3,
        content: '뉴비님! 전략적인 플레이에 대해 이야기해볼까요?',
        date: '2025-01-14T10:10:00.000Z',
      },
      {
        senderId: 3,
        receiverId: 2,
        content: '네! 정말 궁금했어요. 어떻게 하면 더 잘할 수 있을까요?',
        date: '2025-01-14T10:12:00.000Z',
      },
      {
        senderId: 2,
        receiverId: 3,
        content:
          '먼저 맵을 잘 알아야 해요. 각 위치의 장단점을 파악하는 게 중요합니다.',
        date: '2025-01-14T10:15:00.000Z',
      },
      // 유저 2와 유저 4의 채팅
      {
        senderId: 4,
        receiverId: 2,
        content: '전략가님! 이 맵에서 어떤 전략이 효과적일까요?',
        date: '2025-01-13T14:15:00.000Z',
      },
      {
        senderId: 2,
        receiverId: 4,
        content:
          '이 맵은 중앙 제어가 핵심이에요. 미드에서 정보를 수집하는 게 중요합니다.',
        date: '2025-01-13T14:17:00.000Z',
      },
      {
        senderId: 4,
        receiverId: 2,
        content: '아! 그렇군요. 미드에서 어떤 역할을 해야 할까요?',
        date: '2025-01-13T14:20:00.000Z',
      },
    ],
  },
  {
    id: 3,
    messages: [
      // 유저 3과 유저 1의 채팅
      {
        senderId: 3,
        receiverId: 1,
        content: '안녕하세요! 게임 잘하시는 것 같아서 조언 부탁드려요.',
        date: '2025-01-13T09:15:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 3,
        content: '안녕하세요! 물론이죠. 어떤 부분에서 도움이 필요하신가요?',
        date: '2025-01-13T09:17:00.000Z',
      },
      {
        senderId: 3,
        receiverId: 1,
        content: '에임이 너무 안 맞아요. 어떻게 연습하면 좋을까요?',
        date: '2025-01-13T09:18:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 3,
        content:
          '에임 연습은 연습장에서 많이 해보시는 게 좋아요. 천천히 조준해서 쏘는 연습부터 시작하세요!',
        date: '2025-01-13T09:20:00.000Z',
      },
      // 유저 3과 유저 2의 채팅
      {
        senderId: 2,
        receiverId: 3,
        content: '뉴비님! 전략적인 플레이에 대해 이야기해볼까요?',
        date: '2025-01-14T10:10:00.000Z',
      },
      {
        senderId: 3,
        receiverId: 2,
        content: '네! 정말 궁금했어요. 어떻게 하면 더 잘할 수 있을까요?',
        date: '2025-01-14T10:12:00.000Z',
      },
      {
        senderId: 2,
        receiverId: 3,
        content:
          '먼저 맵을 잘 알아야 해요. 각 위치의 장단점을 파악하는 게 중요합니다.',
        date: '2025-01-14T10:15:00.000Z',
      },
      // 유저 3과 유저 4의 채팅
      {
        senderId: 3,
        receiverId: 4,
        content: '맵마스터님! 이 맵에서 어디가 좋은 위치인가요?',
        date: '2025-01-13T16:05:00.000Z',
      },
      {
        senderId: 4,
        receiverId: 3,
        content:
          '뉴비님! B사이트 근처가 초보자에게 좋아요. 시야가 넓고 도망가기 쉬워요.',
        date: '2025-01-13T16:07:00.000Z',
      },
      {
        senderId: 3,
        receiverId: 4,
        content: '감사합니다! 그럼 B사이트에서 연습해보겠어요.',
        date: '2025-01-13T16:10:00.000Z',
      },
    ],
  },
  {
    id: 4,
    messages: [
      // 유저 4와 유저 1의 채팅
      {
        senderId: 4,
        receiverId: 1,
        content: '에임장인님! 새로운 맵 정보 있으신가요?',
        date: '2025-01-12T11:10:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 4,
        content: '네! 새로 나온 맵에서 좋은 스팟 몇 개 발견했어요.',
        date: '2025-01-12T11:12:00.000Z',
      },
      {
        senderId: 4,
        receiverId: 1,
        content: '정말요? 어디인지 알려주세요!',
        date: '2025-01-12T11:13:00.000Z',
      },
      {
        senderId: 1,
        receiverId: 4,
        content: 'A사이트 근처에 숨을 수 있는 곳이 있어요. 같이 확인해볼까요?',
        date: '2025-01-12T11:15:00.000Z',
      },
      // 유저 4와 유저 2의 채팅
      {
        senderId: 4,
        receiverId: 2,
        content: '전략가님! 이 맵에서 어떤 전략이 효과적일까요?',
        date: '2025-01-13T14:15:00.000Z',
      },
      {
        senderId: 2,
        receiverId: 4,
        content:
          '이 맵은 중앙 제어가 핵심이에요. 미드에서 정보를 수집하는 게 중요합니다.',
        date: '2025-01-13T14:17:00.000Z',
      },
      {
        senderId: 4,
        receiverId: 2,
        content: '아! 그렇군요. 미드에서 어떤 역할을 해야 할까요?',
        date: '2025-01-13T14:20:00.000Z',
      },
      // 유저 4와 유저 3의 채팅
      {
        senderId: 3,
        receiverId: 4,
        content: '맵마스터님! 이 맵에서 어디가 좋은 위치인가요?',
        date: '2025-01-13T16:05:00.000Z',
      },
      {
        senderId: 4,
        receiverId: 3,
        content:
          '뉴비님! B사이트 근처가 초보자에게 좋아요. 시야가 넓고 도망가기 쉬워요.',
        date: '2025-01-13T16:07:00.000Z',
      },
      {
        senderId: 3,
        receiverId: 4,
        content: '감사합니다! 그럼 B사이트에서 연습해보겠어요.',
        date: '2025-01-13T16:10:00.000Z',
      },
    ],
  },
];
