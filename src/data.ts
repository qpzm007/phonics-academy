import { PhonicsCategory, PhonicsWord } from './types';

export const PHONICS_DATA: PhonicsCategory[] = [
  {
    id: 'short',
    title: 'Short Vowels',
    koreanTitle: '단모음',
    description: "A, E, I, O, U가 짧고 간결하게 소리 나는 기본 모음 학습",
    concept: "모음(A, E, I, O, U)이 단어 내에서 각각 짧게 '애, 에, 이, 아, 어'로 소리 나는 경우",
    groups: [
      {
        id: 'short_a',
        name: '단모음 A (애)',
        patternKey: 'A',
        description: "입을 옆으로 넓게 벌리면서 '애' 하고 짧게 내는 소리",
        words: [
          { id: 'short_a_jam', word: 'jam', meaning: '잼 (딸기잼 등)', pronunciation: '잼', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: 'J(지읒) + am(앰)의 소리 조합' },
          { id: 'short_a_ham', word: 'ham', meaning: '햄', pronunciation: '햄', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: "H(히읗) + am(앰)의 조합, H는 반드시 목 깊은 곳에서 바람 새는 '흐' 소리" },
          { id: 'short_a_camp', word: 'camp', meaning: '야영하다 (캠핑하다)', pronunciation: '캠프', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: "C는 알파벳을 읽을 땐 쌍시옷 소리이지만 단어에선 주로 '크' 소리로 시작" },
          { id: 'short_a_cap', word: 'cap', meaning: '모자', pronunciation: '캡', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: '야구 모자처럼 앞으로만 챙이 있는 형태의 모자' },
          { id: 'short_a_map', word: 'map', meaning: '지도', pronunciation: '맵', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: '관광 안내서 등에서 흔히 얻을 수 있는 평면 지도' },
          { id: 'short_a_nap', word: 'nap', meaning: '낮잠 (자다)', pronunciation: '냅', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: "영어에서는 밤에 자는 잠(sleep)과 낮에 잠깐 자는 잠(nap)을 뚜렷이 구분" },
          { id: 'short_a_can', word: 'can', meaning: '깡통', pronunciation: '캔', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: '알루미늄이나 철 등으로 만든 깡통 (예: 캔 커피)' },
          { id: 'short_a_man', word: 'man', meaning: '남자', pronunciation: '맨', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: '성인 남성. 남자 화장실 간판이나 표지판에서 흔히 볼 수 있음' },
          { id: 'short_a_pan', word: 'pan', meaning: '냄비', pronunciation: '팬', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: "프라이팬 등 바닥이 넓적하고 평평한 형태의 냄비" },
          { id: 'short_a_cat', word: 'cat', meaning: '고양이', pronunciation: '캣', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: '길고양이를 돌봐주시는 다정한 이웃들을 보통 캣맘(cat mom)이라 부름' },
          { id: 'short_a_mat', word: 'mat', meaning: '깔개', pronunciation: '매트', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: '체육관 바닥이나 욕실 입구 등에 미끄러짐 방지로 까는 매트' },
          { id: 'short_a_hat', word: 'hat', meaning: '모자', pronunciation: '햇', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: '앞에만 챙이 있는 cap을 제외한 머리를 둥글게 둘러싸는 일반적인 모자 전체' },
          { id: 'short_a_chat', word: 'chat', meaning: '수다 떨다', pronunciation: '챗', pattern: '단모음 A (애)', patternGroup: 'A', learningPoint: "키보드로 수다 떠는 '채팅'의 어원. ch는 '치' 혹은 '취'에 가까운 소리" },
        ]
      },
      {
        id: 'short_e',
        name: '단모음 E (에)',
        patternKey: 'E',
        description: "턱을 살짝 내리고 혀를 편안하게 두면서 짧게 '에' 하고 내는 소리 (A보다 입을 작게 벌림)",
        words: [
          { id: 'short_e_net', word: 'net', meaning: '그물', pronunciation: '네트', pattern: '단모음 E (에)', patternGroup: 'E', learningPoint: '테니스, 탁구, 배드민턴 등의 중앙 그물막. 단모음 a보다 한결 짧게 발음' },
          { id: 'short_e_pet', word: 'pet', meaning: '반려동물', pronunciation: '펫', pattern: '단모음 E (에)', patternGroup: 'E', learningPoint: '집에서 함께 생활하며 아끼는 개, 고양이 등 사랑스러운 동물' },
          { id: 'short_e_vet', word: 'vet', meaning: '수의사', pronunciation: '벳', pattern: '단모음 E (에)', patternGroup: 'E', learningPoint: "V는 우리나라의 비읍(ㅂ) 소리와 달리, 윗니로 아랫입술을 살짝 물어 바람 새는 소리" },
          { id: 'short_e_red', word: 'red', meaning: '빨간색', pronunciation: '레드', pattern: '단모음 E (에)', patternGroup: 'E', learningPoint: '축구의 경고 퇴장 카드(레드 카드)나 붉은 악마(Red Devils)의 레드' },
          { id: 'short_e_bed', word: 'bed', meaning: '침대', pronunciation: '베드', pattern: '단모음 E (에)', patternGroup: 'E', learningPoint: "B는 입술을 완벽하게 다물었다가 터뜨리는 맑은 비읍(ㅂ) 소리" },
          { id: 'short_e_ten', word: 'ten', meaning: '숫자 10', pronunciation: '텐', pattern: '단모음 E (에)', patternGroup: 'E', learningPoint: '1부터 10까지 숫자를 셀 때 가장 마지막에 등장하는 텐' },
          { id: 'short_e_tent', word: 'tent', meaning: '천막', pronunciation: '텐트', pattern: '단모음 E (에)', patternGroup: 'E', learningPoint: "숫자 10을 뜻하는 'ten' 뒤에 가벼운 't(트)' 소리가 붙어 이루어짐" },
          { id: 'short_e_pen', word: 'pen', meaning: '볼펜', pronunciation: '펜', pattern: '단모음 E (에)', patternGroup: 'E', learningPoint: '글을 쓰거나 그림을 그릴 때 사용하는 필기구. 단모음 A를 쓰는 pan보다 더 짧게 발음해야 함' },
        ]
      },
      {
        id: 'short_i',
        name: '단모음 I (이)',
        patternKey: 'I',
        description: "입을 가볍게 벌리고 혀 앞부분을 입천장 쪽으로 올려 짧게 '이' 하고 내는 소리",
        words: [
          { id: 'short_i_kid', word: 'kid', meaning: '어린이', pronunciation: '키드', pattern: '단모음 I (이)', patternGroup: 'I', learningPoint: "어린이 한 명을 지칭. 여러 명을 통칭해 부를 땐 뒤에 s를 붙여 '키즈'라고 흔히 칭함" },
          { id: 'short_i_lid', word: 'lid', meaning: '뚜껑', pronunciation: '리드', pattern: '단모음 I (이)', patternGroup: 'I', learningPoint: '테이크아웃 종이컵이나 텀블러 맨 위에 덮는 플라스틱 뚜껑' },
          { id: 'short_i_pig', word: 'pig', meaning: '돼지', pronunciation: '피그', pattern: '단모음 I (이)', patternGroup: 'I', learningPoint: "알파벳 G는 단어 끝부분이나 중간에서 80% 이상 맑은 '기역(ㄱ)' 받침 또는 소리로 발음됨" },
          { id: 'short_i_big', word: 'big', meaning: '큰', pronunciation: '빅', pattern: '단모음 I (이)', patternGroup: 'I', learningPoint: '사이즈가 큰 것. 대표적으로 유명한 햄버거 이름(빅맥 등)에 감초처럼 쓰임' },
        ]
      },
      {
        id: 'short_o',
        name: '단모음 O (아)',
        patternKey: 'O',
        description: "입을 아래위로 동그랗고 크게 벌리면서 목구멍 뒤쪽에서 '아' 하고 내는 짧은 소리",
        words: [
          { id: 'short_o_cop', word: 'cop', meaning: '경찰', pronunciation: '캅', pattern: '단모음 O (아)', patternGroup: 'O', learningPoint: "O가 '오'가 아닌 '아' 소리가 남. 어린이 애니메이션 로보카폴리의 '폴리' 캐릭터가 하는 역할" },
          { id: 'short_o_mop', word: 'mop', meaning: '대걸레', pronunciation: '맙', pattern: '단모음 O (아)', patternGroup: 'O', learningPoint: "식당 등 일상에서 흔히 청소용으로 쓰는 '마포 걸레'라는 표현의 원래 서양식 진짜 어원" },
          { id: 'short_o_pot', word: 'pot', meaning: '냄비', pronunciation: '팟', pattern: '단모음 O (아)', patternGroup: 'O', learningPoint: "주전자나 찌개 끓이는 깊은 냄비. 물을 끓여주는 가전제품인 '커피포트'의 원래 발음" },
          { id: 'short_o_hot', word: 'hot', meaning: '뜨겁다', pronunciation: '핫', pattern: '단모음 O (아)', patternGroup: 'O', learningPoint: '온도가 뜨겁거나 매운 것. 테이크아웃 음료를 주문할 때 따뜻한 걸 핫(hot)이라 칭함' },
        ]
      },
      {
        id: 'short_u',
        name: '단모음 U (어)',
        patternKey: 'U',
        description: "입을 편안하게 살짝 벌린 채 힘을 빼고 뱃속에서 짧게 '어' 하고 툭 던지는 소리",
        words: [
          { id: 'short_u_cup', word: 'cup', meaning: '컵', pronunciation: '컵', pattern: '단모음 U (어)', patternGroup: 'U', learningPoint: 'C(크) + UP(위로 향하는 단어의 어원인 업) 소리가 합쳐져 빠르고 명확하게 컵이 됨' },
          { id: 'short_u_sun', word: 'sun', meaning: '태양', pronunciation: '선', pattern: '단모음 U (어)', patternGroup: 'U', learningPoint: '하늘에 항상 떠서 지구를 비추는 따사로운 해. 일주일의 첫날인 Sunday(일요일)의 어원' },
          { id: 'short_u_cut', word: 'cut', meaning: '자르다', pronunciation: '컷', pattern: '단모음 U (어)', patternGroup: 'U', learningPoint: '가위나 칼 등으로 무언가를 자르는 행위. 테이프 커팅식이나 헤어스타일 커트의 핵심 단어' },
        ]
      }
    ]
  },
  {
    id: 'long',
    title: 'Long Vowels (Magic E)',
    koreanTitle: '장모음',
    description: "단어의 끝에 무음 'e'가 오고 앞 모음이 자기 이름대로 길게 발음되는 Magic E 법칙",
    concept: "단어 끝에 묵음 'e'가 오면, 앞에 있는 모음이 알파벳 본래 이름(에이, 아이, 오우, 유)으로 길게 소리 나는 규칙",
    groups: [
      {
        id: 'long_a',
        name: '장모음 a_e (에이)',
        patternKey: 'a_e',
        description: "맨 끝의 e는 소리가 나지 않고, 앞의 a가 본래 자기 이름인 '에이'로 길게 발음됨",
        words: [
          { id: 'long_a_cake', word: 'cake', meaning: '케이크', pronunciation: '케이크', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: '끝에 있는 e는 완전히 소리 내지 않고, a만 길게 "에이"로 굴려 발음' },
          { id: 'long_a_bake', word: 'bake', meaning: '빵을 굽다', pronunciation: '베이크', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: "밀가루 반죽을 오븐에 넣고 부풀리는 제빵 파우더인 '베이킹파우더'의 기본 뿌리가 되는 동사" },
          { id: 'long_a_lake', word: 'lake', meaning: '호수', pronunciation: '레이크', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: "L은 윗니 뒤쪽 잇몸에 혀를 단단히 갖다 대어 내는 '리을(ㄹ)' 계열의 밝은 소리" },
          { id: 'long_a_tape', word: 'tape', meaning: '테이프', pronunciation: '테이프', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: '상자를 포장할 때 붙이는 투명 테이프나 노래를 담던 카세트테이프 등의 총칭' },
          { id: 'long_a_grape', word: 'grape', meaning: '포도', pronunciation: '그레이프', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: "g와 r의 복합 자음(그르)과 ape(에이프) 형태가 완벽하게 결합하여 만들어짐" },
          { id: 'long_a_wave', word: 'wave', meaning: '파도', pronunciation: '웨이브', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: "W는 입술을 둥글게 모아 '우'처럼 시작하고, V는 아랫입술을 지그시 눌러 바람 빼며 마무리" },
          { id: 'long_a_save', word: 'save', meaning: '절약하다', pronunciation: '세이브', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: "자원을 아껴 쓰거나 컴퓨터 게임의 데이터를 저장할 때 흔히 사용하는 만능 단어" },
          { id: 'long_a_shave', word: 'shave', meaning: '면도하다', pronunciation: '셰이브', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: "sh는 입술을 앞으로 내밀며 '쉬' 하는 바람 빠지는 소리. 아빠의 '셰이빙 폼' 면도 크림의 어원" },
          { id: 'long_a_date', word: 'date', meaning: '날짜', pronunciation: '데이트', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: '달력에 적힌 특정한 날짜를 나타내며, 더불어 연인끼리 정답게 만나는 약속을 뜻함' },
          { id: 'long_a_gate', word: 'gate', meaning: '출입구', pronunciation: '게이트', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: '대문 또는 공항 탑승구를 지칭하며, 어르신들이 즐기시는 문을 통과하는 게이트볼의 어원' },
          { id: 'long_a_skate', word: 'skate', meaning: '스케이트', pronunciation: '스케이트', pattern: '장모음 a_e (에이)', patternGroup: 'a_e', learningPoint: "sk(스클/스크) 자음 조합에 ate(에이트) 장모음이 엮인 단어" },
        ]
      },
      {
        id: 'long_i',
        name: '장모음 i_e (아이)',
        patternKey: 'i_e',
        description: "맨 끝의 e는 소리가 나지 않고, 앞의 i가 본래 자기 이름인 '아이'로 길게 발음됨",
        words: [
          { id: 'long_i_bike', word: 'bike', meaning: '자전거, 오토바이', pronunciation: '바이크', pattern: '장모음 i_e (아이)', patternGroup: 'i_e', learningPoint: '발로 페달을 밟는 자전거와 엔진의 힘으로 달리는 오토바이를 서양에선 모두 바이크라고 부름' },
          { id: 'long_i_like', word: 'like', meaning: '좋아하다', pronunciation: '라이크', pattern: '장모음 i_e (아이)', patternGroup: 'i_e', learningPoint: '어떤 물건, 음식, 혹은 사람을 마음에 들어 하고 소중히 여겨 선호할 때 사용' },
          { id: 'long_i_strike', word: 'strike', meaning: '파업, 치다', pronunciation: '스트라이크', pattern: '장모음 i_e (아이)', patternGroup: 'i_e', learningPoint: '야구의 투구 판정 외에도 직장인들이 힘을 합쳐 일을 쉬는 "노조 파업"의 매우 중요한 의미가 있음' },
          { id: 'long_i_nine', word: 'nine', meaning: '숫자 9', pronunciation: '나인', pattern: '장모음 i_e (아이)', patternGroup: 'i_e', learningPoint: "자음 n(느)과 ine(아인) 소리가 만나 부드럽고 길게 발음" },
          { id: 'long_i_line', word: 'line', meaning: '선', pronunciation: '라인', pattern: '장모음 i_e (아이)', patternGroup: 'i_e', learningPoint: "줄을 긋거나 대기할 때 서는 줄. '라인을 잘 타다' 혹은 옷의 실루엣 '라인' 등의 어원" },
          { id: 'long_i_wine', word: 'wine', meaning: '포도주', pronunciation: '와인', pattern: '장모음 i_e (아이)', patternGroup: 'i_e', learningPoint: "W의 둥근 첫소리(우)와 ine(아인)가 맞물려 감미롭고 세련된 와인이 됨" },
        ]
      },
      {
        id: 'long_o',
        name: '장모음 o_e (오우)',
        patternKey: 'o_e',
        description: "맨 끝의 e는 소리가 나지 않고, 앞의 o가 본래 자기 이름인 '오우'로 길게 발음됨",
        words: [
          { id: 'long_o_rose', word: 'rose', meaning: '장미', pronunciation: '로즈', pattern: '장모음 o_e (오우)', patternGroup: 'o_e', learningPoint: "입술을 둥글게 밀며 R(르)을 낸 후 ose(오즈)를 엮어 우아하게 로즈로 발음" },
          { id: 'long_o_nose', word: 'nose', meaning: '코', pronunciation: '노즈', pattern: '장모음 o_e (오우)', patternGroup: 'o_e', learningPoint: "N(느)과 ose(오즈) 조합. 숨을 쉬고 냄새를 맡는 얼굴 정중앙의 코" },
          { id: 'long_o_pose', word: 'pose', meaning: '자세', pronunciation: '포즈', pattern: '장모음 o_e (오우)', patternGroup: 'o_e', learningPoint: '카메라 앞에서 사진 찍을 때 몸을 고정해 예쁜 구도를 잡는 행위' },
          { id: 'long_o_cone', word: 'cone', meaning: '원뿔', pronunciation: '콘', pattern: '장모음 o_e (오우)', patternGroup: 'o_e', learningPoint: '고깔모자, 주차금지 고깔, 혹은 아이스크림을 얹어 먹는 과자 모양' },
          { id: 'long_o_zone', word: 'zone', meaning: '구역, 지역', pronunciation: '존', pattern: '장모음 o_e (오우)', patternGroup: 'o_e', learningPoint: "Z는 벌이 윙윙거리는 듯 아랫입술 부근에서 성대를 떨어 바람 새며 즈~ 하고 발음" },
          { id: 'long_o_phone', word: 'phone', meaning: '전화기', pronunciation: '폰', pattern: '장모음 o_e (오우)', patternGroup: 'o_e', learningPoint: "스마트폰의 폰. PH가 연달아 붙으면 아주 예외 없이 F(윗니로 아랫입술 물기) 소리가 남" },
        ]
      },
      {
        id: 'long_u',
        name: '장모음 u_e (유/우)',
        patternKey: 'u_e',
        description: "맨 끝의 e는 소리가 나지 않고, 앞의 u가 본래 자기 이름인 '유' 또는 '우'로 길게 발음됨",
        words: [
          { id: 'long_u_tube', word: 'tube', meaning: '튜브', pronunciation: '튜브', pattern: '장모음 u_e (유/우)', patternGroup: 'u_e', learningPoint: '물놀이용 도넛 튜브, 타이어 내부 고무 튜브, 동영상 플랫폼 유"튜브"의 튜브' },
          { id: 'long_u_cube', word: 'cube', meaning: '정육면체', pronunciation: '큐브', pattern: '장모음 u_e (유/우)', patternGroup: 'u_e', learningPoint: '돌려 가며 색깔을 맞춰 지능을 개발하는 입체 장난감 큐브' },
          { id: 'long_u_june', word: 'June', meaning: '6월', pronunciation: '준', pattern: '장모음 u_e (유/우)', patternGroup: 'u_e', learningPoint: "영어의 1년 열두 달(Month) 이름은 아주 오랜 문법 규칙에 따라 첫 글자를 무조건 대문자로 씀" },
          { id: 'long_u_dune', word: 'dune', meaning: '모래 언덕', pronunciation: '듄', pattern: '장모음 u_e (유/우)', patternGroup: 'u_e', learningPoint: '사막이나 해안가에 바람이 모래를 날려 드넓게 쌓아 만든 신비로운 모래 언덕' },
          { id: 'long_u_tune', word: 'tune', meaning: '조율(조정)하다', pronunciation: '튠', pattern: '장모음 u_e (유/우)', patternGroup: 'u_e', learningPoint: '기타 줄을 알맞은 음으로 조율하거나, 자동차 기계를 입맛에 맞게 개조하는 튜닝의 기본 동사' },
          { id: 'long_u_cute', word: 'cute', meaning: '귀여운', pronunciation: '큐트', pattern: '장모음 u_e (유/우)', patternGroup: 'u_e', learningPoint: '어린 아기나 아기 고양이, 꼬마 강아지처럼 보고만 있어도 미소가 번지는 귀여움에 쓰는 말' },
          { id: 'long_u_mute', word: 'mute', meaning: '말없는, 조용히', pronunciation: '뮤트', pattern: '장모음 u_e (유/우)', patternGroup: 'u_e', learningPoint: 'TV나 오디오 리모컨에서 시끄러운 소리를 한순간에 없애 주는 음소거 버튼의 영어 명칭' },
        ]
      }
    ]
  },
  {
    id: 'consonant',
    title: 'Double Consonants',
    koreanTitle: '이중자음',
    description: "두 개의 자음이 나란히 연달아 오면서 하나의 덩어리로 아름답게 융합되어 발음되는 현상",
    concept: "두 개의 자음이 만나 하나의 덩어리로 발음되는 규칙 (예: sm = 스무, cl = 클)",
    groups: [
      {
        id: 'double_sm',
        name: 'SM (스무)',
        patternKey: 'SM',
        description: "S(스)와 M(무)이 하나처럼 매끄럽게 엮여 빠르고 강하게 한 번에 발음되는 소리",
        words: [
          { id: 'double_sm_smell', word: 'smell', meaning: '냄새(맡다)', pronunciation: '스멜', pattern: '이중자음 SM (스무)', patternGroup: 'SM', learningPoint: "sm(스무)에다가 ell(엘)이 부드럽게 뒤이어 엮여 '스멜'로 소리 남" },
          { id: 'double_sm_small', word: 'small', meaning: '작다', pronunciation: '스몰', pattern: '이중자음 SM (스무)', patternGroup: 'SM', learningPoint: "sm(스무)에다가 전체를 뜻하는 all(올)이 만나 작은 크기를 묘사" },
          { id: 'double_sm_smile', word: 'smile', meaning: '미소 짓다', pronunciation: '스마일', pattern: '이중자음 SM (스무)', patternGroup: 'SM', learningPoint: '사진사가 사진을 찰칵 찍을 때 "치즈~" 하듯 입꼬리를 활짝 올리며 말하는 스마일' },
        ]
      },
      {
        id: 'double_sn',
        name: 'SN (스느)',
        patternKey: 'SN',
        description: "S(스)와 N(느)이 나란히 와서 부드러운 콧소리와 혀끝 소리가 조화를 이룸",
        words: [
          { id: 'double_sn_snow', word: 'snow', meaning: '눈(이 오다)', pronunciation: '스노우', pattern: '이중자음 SN (스느)', patternGroup: 'SN', learningPoint: "sn(스느)에 ow(오우)가 달라붙어 고요히 내리는 함박눈을 표현" },
          { id: 'double_sn_snake', word: 'snake', meaning: '뱀', pronunciation: '스네이크', pattern: '이중자음 SN (스느)', patternGroup: 'SN', learningPoint: "sn(스느)에다가 장모음 ake(에이크)가 마법의 e를 업고 달라붙어 길게 소리 남" },
          { id: 'double_sn_snack', word: 'snack', meaning: '간식, 과자', pronunciation: '스낵', pattern: '이중자음 SN (스느)', patternGroup: 'SN', learningPoint: '단어 맨 마지막의 c와 k는 각각 크 소리를 가졌으나, 연달아 오면 한 번만 똑 부러지게 "크" 소리 냄' },
        ]
      },
      {
        id: 'double_st',
        name: 'ST (스트)',
        patternKey: 'ST',
        description: "S(스)와 T(트)가 단단하게 맞부딪쳐 내는 짧고 또렷한 힘 있는 발음",
        words: [
          { id: 'double_st_stop', word: 'stop', meaning: '멈추다', pronunciation: '스톱', pattern: '이중자음 ST (스트)', patternGroup: 'ST', learningPoint: '민속놀이나 보드게임 고스톱(Go/Stop)의 멈추라는 명령조를 지칭하는 바로 그 뜻' },
          { id: 'double_st_step', word: 'step', meaning: '걸음', pronunciation: '스텝', pattern: '이중자음 ST (스트)', patternGroup: 'ST', learningPoint: '"스텝 바이 스텝"처럼 한 걸음씩 나아가거나, 무용수가 춤을 출 때 딛는 예쁜 발걸음' },
          { id: 'double_st_stick', word: 'stick', meaning: '막대기', pronunciation: '스틱', pattern: '이중자음 ST (스트)', patternGroup: 'ST', learningPoint: '립스틱처럼 단단하게 긴 기둥 모양으로 뭉쳐진 막대 형태의 사물을 지칭할 때 사용' },
        ]
      },
      {
        id: 'double_bl',
        name: 'BL (블)',
        patternKey: 'BL',
        description: "B(브) 뒤의 L은 아주 소리 내기 중요함. 앞 단어 받침(ㄹ)으로 한 번, 뒤 첫소리(ㄹ)로 한 번 두 번 울림",
        words: [
          { id: 'double_bl_blue', word: 'blue', meaning: '파란색', pronunciation: '블루', pattern: '이중자음 BL (블)', patternGroup: 'BL', learningPoint: "주의: L은 앞에(블) 받침으로 한 번, 뒤에(루) 첫소리로 한 번, 총 두 번의 리을 소리를 거침" },
          { id: 'double_bl_block', word: 'block', meaning: '블록', pronunciation: '블록', pattern: '이중자음 BL (블)', patternGroup: 'BL', learningPoint: '길거리의 보도블록이나, 어린 아기들이 손으로 꾹꾹 조립하는 레고 플라스틱 완구' },
          { id: 'double_bl_black', word: 'black', meaning: '검정색', pronunciation: '블랙', pattern: '이중자음 BL (블)', patternGroup: 'BL', learningPoint: "bl(블)에다가 짧은 모음이 낀 ack(액)이 만나 깊고 진한 어둠을 나타냄" },
        ]
      },
      {
        id: 'double_cl',
        name: 'CL (클)',
        patternKey: 'CL',
        description: "C(크) 소리에 혀를 입천장에 넓게 붙이며 내는 L(리을)이 만나 상쾌하고 시원스럽게 발음",
        words: [
          { id: 'double_cl_clip', word: 'clip', meaning: '클립', pronunciation: '클립', pattern: '이중자음 CL (클)', patternGroup: 'CL', learningPoint: "C는 아주 영리하게 '크' 소리로 둔갑하고, 얇은 종이를 꽉 집어 고정하는 사무용 쇠클립" },
          { id: 'double_cl_clock', word: 'clock', meaning: '시계', pronunciation: '클락', pattern: '이중자음 CL (클)', patternGroup: 'CL', learningPoint: '손목에 차는 watch를 철저히 뺀, 벽에 튼튼히 걸어두는 시계나 거실의 모든 시계' },
          { id: 'double_cl_class', word: 'class', meaning: '수업', pronunciation: '클래스', pattern: '이중자음 CL (클)', patternGroup: 'CL', learningPoint: '학원이나 학교의 몇 시 타임 "3시 클래스, 4시 클래스" 할 때 꼭 언급되는 바로 그 수업' },
        ]
      },
      {
        id: 'double_pl',
        name: 'PL (플)',
        patternKey: 'PL',
        description: "두 입술을 맞물렸다가 떼며 P(프)를 냄과 동시에 혀를 들어 L(리을) 소리를 연달아 내기",
        words: [
          { id: 'double_pl_play', word: 'play', meaning: '놀다', pronunciation: '플레이', pattern: '이중자음 PL (플)', patternGroup: 'PL', learningPoint: "pl(플) 뒤에 ay(에이)가 달라붙어 신나게 장난감이나 야외에서 뛰노는 행위를 묘사" },
          { id: 'double_pl_plug', word: 'plug', meaning: '플러그', pronunciation: '플러그', pattern: '이중자음 PL (플)', patternGroup: 'PL', learningPoint: "가전제품 선 끝에 달린 돼지코 전기 코드. 마지막 g는 가벼운 '그' 소리로 장식" },
          { id: 'double_pl_plus', word: 'plus', meaning: '더하기', pronunciation: '플러스', pattern: '이중자음 PL (플)', patternGroup: 'PL', learningPoint: '수학의 덧셈 기호 (+). "3 플러스 3은 6"처럼 숫자를 계속 합해나갈 때 쓰는 단어' },
        ]
      },
      {
        id: 'double_br',
        name: 'BR (브르)',
        patternKey: 'BR',
        description: "B(브)에 혀를 목 안쪽으로 둥글게 밀어 올리며 내는 R(르)이 결합. 받침으로 들어가지 않음",
        words: [
          { id: 'double_br_break', word: 'break', meaning: '브레이크', pronunciation: '브레이크', pattern: '이중자음 BR (브르)', patternGroup: 'BR', learningPoint: "L과 달리 R은 결코 앞 단어의 받침으로 들어가지 않고 독자적으로 '브레이크'로 깨끗이 빠짐" },
          { id: 'double_br_brush', word: 'brush', meaning: '솔, 붓, 빗', pronunciation: '브러쉬', pattern: '이중자음 BR (브르)', patternGroup: 'BR', learningPoint: '엉킨 머리카락을 빗는 빗, 화가의 물감 붓, 청소할 때 쓰는 거친 솔 등을 어우르는 단어' },
          { id: 'double_br_brave', word: 'brave', meaning: '용감한', pronunciation: '브레이크/브레이브', pattern: '이중자음 BR (브르)', patternGroup: 'BR', learningPoint: "br(브르)에 ave(에이브)가 더해져 악당을 물리치는 씩씩하고 용감한 기사님에게 붙여짐" },
        ]
      },
      {
        id: 'double_dr',
        name: 'DR (드르)',
        patternKey: 'DR',
        description: "D(드)에 혀를 굴리는 R(르)이 달라붙어, 구강 안쪽에서 가벼운 '쥬' 소리 비슷하게 굴려 나옴",
        words: [
          { id: 'double_dr_drum', word: 'drum', meaning: '드럼', pronunciation: '드럼', pattern: '이중자음 DR (드르)', patternGroup: 'DR', learningPoint: '스틱으로 가죽을 신나게 쳐서 웅장한 박자를 이끄는 타악기 드럼, 공사장의 드럼통' },
          { id: 'double_dr_dress', word: 'dress', meaning: '드레스', pronunciation: '드레스', pattern: '이중자음 DR (드르)', patternGroup: 'DR', learningPoint: "일상의 '원피스'는 콩글리시. 위아래가 고운 하나의 한 벌 옷으로 된 여성용 옷의 진짜 명칭" },
          { id: 'double_dr_drone', word: 'drone', meaning: '무인 항공기', pronunciation: '드론', pattern: '이중자음 DR (드르)', patternGroup: 'DR', learningPoint: '조종사 없이 상공을 시원하게 훨훨 날아다니며 멋진 풍경을 담아내는 드론 카메라의 바로 그 단어' },
        ]
      },
      {
        id: 'double_ch',
        name: 'CH (치/취)',
        patternKey: 'CH',
        description: "C와 H가 결합하여 우리나라의 날카로운 '치읒(ㅊ)'과 거의 똑같은 입김 새는 소리",
        words: [
          { id: 'double_ch_chip', word: 'chip', meaning: '조각, 칩', pronunciation: '칩', pattern: '이중자음 CH (치/취)', patternGroup: 'CH', learningPoint: "포테이토 칩(바삭한 조각)이나, 보드게임에서 돈 대신 거는 작고 둥근 플라스틱 칩" },
          { id: 'double_ch_chair', word: 'chair', meaning: '의자', pronunciation: '체어', pattern: '이중자음 CH (치/취)', patternGroup: 'CH', learningPoint: '다리가 튼튼히 달려 편히 쉴 수 있는 가구인 의자. 옛날 고급 차종 이름 "체어맨"에 들어간 단어' },
        ]
      },
      {
        id: 'double_sh',
        name: 'SH (쉬)',
        patternKey: 'SH',
        description: "S와 H가 한 쌍을 이루어 입술을 앞으로 살짝 밀며 조용히 하라 할 때처럼 내는 거친 바람 소리",
        words: [
          { id: 'double_sh_ship', word: 'ship', meaning: '배', pronunciation: '쉽', pattern: '이중자음 SH (쉬)', patternGroup: 'SH', learningPoint: '강가에 띄우는 작은 보트(boat)와 명백히 구별되는, 아주 거대한 대형 여객선이나 무역 상선' },
          { id: 'double_sh_shop', word: 'shop', meaning: '가게, 상점', pronunciation: '샵', pattern: '이중자음 SH (쉬)', patternGroup: 'SH', learningPoint: '헤어스타일을 매만지는 헤어샵, 물건을 쇼핑(shopping)하러 가는 근사한 가게나 마트' },
        ]
      },
      {
        id: 'double_ng',
        name: 'NG (이응)',
        patternKey: 'NG',
        description: "N과 G가 단어 끝부분에서 다정하게 겹쳐지면, 예외 없이 한글의 부드러운 '이응(ㅇ)' 받침 소리",
        words: [
          { id: 'double_ng_king', word: 'king', meaning: '왕', pronunciation: '킹', pattern: '이중자음 NG (이응)', patternGroup: 'NG', learningPoint: "N과 G가 합쳐져 한글 '이응(ㅇ)' 받침 역할을 완전하고 깨끗하게 해냄" },
          { id: 'double_ng_ring', word: 'ring', meaning: '반지', pronunciation: '링', pattern: '이중자음 NG (이응)', patternGroup: 'NG', learningPoint: "사랑하는 연인이나 친구끼리 서로 나누어 손가락에 끼우는 둥근 금속 링 또는 반지" },
          { id: 'double_ng_sing', word: 'sing', meaning: '노래하다', pronunciation: '싱', pattern: '이중자음 NG (이응)', patternGroup: 'NG', learningPoint: "S(스) 소리에 ing(잉) 받침 소리가 달라붙어 입을 크게 벌려 감미롭게 노래함을 표현" },
        ]
      }
    ]
  },
  {
    id: 'vowel',
    title: 'Double Vowels',
    koreanTitle: '이중모음',
    description: "서로 다른 모음 두 개가 하나의 짝꿍이 되어 약속된 전혀 새로운 하나의 소리를 긴박하게 내는 형태",
    concept: "두 개의 모음이 붙어 특정한 하나의 소리를 내는 규칙. (소리는 같아도 위치에 따라 철자가 달라짐)",
    groups: [
      {
        id: 'double_ee_ea',
        name: 'ee / ea (이 길게)',
        patternKey: 'ee/ea',
        description: "ee와 ea는 한글의 '이~' 소리를 한결 더 길고 깊고 우아하게 밀어 빼주는 공통된 규칙",
        words: [
          { id: 'double_ee_ea_bee', word: 'bee', meaning: '벌', pronunciation: '비', pattern: '이중모음 ee / ea (이 길게)', patternGroup: 'ee/ea', learningPoint: 'ee가 들어간 귀여운 소리. 꽃밭을 분주히 오가며 꿀을 따 모으는 부지런한 노랑 꿀벌' },
          { id: 'double_ee_ea_tree', word: 'tree', meaning: '나무', pronunciation: '트리', pattern: '이중모음 ee / ea (이 길게)', patternGroup: 'ee/ea', learningPoint: '사계절 내내 푸르게 서 있는 나무. 겨울에 예쁜 전구와 방울을 다는 크리스마스트리' },
          { id: 'double_ee_ea_meet', word: 'meet', meaning: '만나다', pronunciation: '미트', pattern: '이중모음 ee / ea (이 길게)', patternGroup: 'ee/ea', learningPoint: '새로운 사람을 소개받아 얼굴을 보고 다정하게 악수하며 인사하는 미팅(meeting)의 기본형' },
          { id: 'double_ee_ea_tea', word: 'tea', meaning: '차', pronunciation: '티', pattern: '이중모음 ee / ea (이 길게)', patternGroup: 'ee/ea', learningPoint: "ea 역시 '이~' 소리를 내며, 찻잎을 향긋하게 뜨거운 물에 우려낸 녹차, 보리차, 홍차 등의 총칭" },
          { id: 'double_ee_ea_sea', word: 'sea', meaning: '바다', pronunciation: '씨', pattern: '이중모음 ee / ea (이 길게)', patternGroup: 'ee/ea', learningPoint: '인어공주가 부르는 흥겨운 명곡 "Under the sea(바다 아래)"의 가슴 벅차도록 푸른 바다' },
          { id: 'double_ee_ea_eat', word: 'eat', meaning: '먹다', pronunciation: '이트', pattern: '이중모음 ee / ea (이 길게)', patternGroup: 'ee/ea', learningPoint: "eat을 낼 땐 끝에 오는 t가 한글의 부드러운 '시옷(ㅅ)' 받침처럼 살그머니 섞이며 마무리됨" },
          { id: 'double_ee_ea_meat', word: 'meat', meaning: '고기', pronunciation: '미트', pattern: '이중모음 ee / ea (이 길게)', patternGroup: 'ee/ea', learningPoint: "동음이의어(meet와 소리는 완전히 같으나 철자와 뜻이 다름). 다진 고기를 뭉친 미트볼의 어원" },
        ]
      },
      {
        id: 'double_oa_ow',
        name: 'oa / ow (오우)',
        patternKey: 'oa/ow',
        description: "oa는 주로 단어의 가슴 깊숙한 한가운데에 오고, ow는 꼬리 부분에서 '오우' 하고 발음됨",
        words: [
          { id: 'double_oa_ow_boat', word: 'boat', meaning: '보트', pronunciation: '보트', pattern: '이중모음 oa / ow (오우)', patternGroup: 'oa/ow', learningPoint: "oa는 보통 단어 중간에서 둥글게 '오우' 소리. ship(거대한 배)보다 훨씬 작은 나룻배나 보트" },
          { id: 'double_oa_ow_coat', word: 'coat', meaning: '코트', pronunciation: '코트', pattern: '이중모음 oa / ow (오우)', patternGroup: 'oa/ow', learningPoint: '바람이 쌩쌩 부는 한겨울에 따뜻하게 체온을 지켜주는 기다란 롱코트나 멋진 신사용 외투' },
          { id: 'double_oa_ow_road', word: 'road', meaning: '길', pronunciation: '로드', pattern: '이중모음 oa / ow (오우)', patternGroup: 'oa/ow', learningPoint: '자동차가 쌩쌩 지나다니는 포장도로. 옛 비단 상인들이 오가던 실크로드(silk road)' },
          { id: 'double_oa_ow_snow', word: 'snow', meaning: '눈(이 오다)', pronunciation: '스노우', pattern: '이중모음 oa / ow (오우)', patternGroup: 'oa/ow', learningPoint: 'ow가 단어 끝에서 차분하게 "오우"로 마감됨. 하늘에서 고요히 흩날려 깔리는 하얀 눈' },
          { id: 'double_oa_ow_grow', word: 'grow', meaning: '자라다, 성장하다', pronunciation: '그로우', pattern: '이중모음 oa / ow (오우)', patternGroup: 'oa/ow', learningPoint: "gr(그르) 자음과 ow(오우)가 끈끈하게 한 몸으로 뭉쳐 아이나 나무가 쑥쑥 자람을 묘사" },
          { id: 'double_oa_ow_crow', word: 'crow', meaning: '까마귀', pronunciation: '크로우', pattern: '이중모음 oa / ow (오우)', patternGroup: 'oa/ow', learningPoint: "검정 깃털을 가졌으며 영리하고 머리 좋은, 동네 전봇대에서 가끔 울어대는 까마귀" },
        ]
      },
      {
        id: 'double_ay_ai',
        name: 'ay / ai (에이)',
        patternKey: 'ay/ai',
        description: "ay는 단어의 맨 '끝'에 당당히 서고, ai는 단어 '중간'에서 자음들을 품으며 '에이' 소리",
        words: [
          { id: 'double_ay_ai_say', word: 'say', meaning: '말하다', pronunciation: '세이', pattern: '이중모음 ay / ai (에이)', patternGroup: 'ay/ai', learningPoint: "ay는 주로 단어 끝에 단독으로 놓임. 상대방에게 무언가 입을 열어 말할 때 가볍게 사용" },
          { id: 'double_ay_ai_play', word: 'play', meaning: '놀다', pronunciation: '플레이', pattern: '이중모음 ay / ai (에이)', patternGroup: 'ay/ai', learningPoint: '이중자음(pl)과 이중모음(ay)의 합작품. 축구 시합이나 게임, 친구와 노는 즐거운 행위' },
          { id: 'double_ay_ai_gray', word: 'gray', meaning: '회색', pronunciation: '그레이', pattern: '이중모음 ay / ai (에이)', patternGroup: 'ay/ai', learningPoint: '흰색 페인트와 검정색 페인트를 골고루 섞었을 때 만들어지는 흐린 하늘빛의 회색' },
          { id: 'double_ay_ai_rain', word: 'rain', meaning: '비(가 오다)', pronunciation: '레인', pattern: '이중모음 ay / ai (에이)', patternGroup: 'ay/ai', learningPoint: "ai는 주로 단어 중간에 오고 뒤에 n과 같은 자음이 받침처럼 옴. 하늘에서 떨어지는 단비" },
          { id: 'double_ay_ai_mail', word: 'mail', meaning: '편지', pronunciation: '메일', pattern: '이중모음 ay / ai (에이)', patternGroup: 'ay/ai', learningPoint: '종이봉투에 넣어 우표를 붙이던 편지. 지금은 컴퓨터망으로 빠르게 주고받는 이메일' },
          { id: 'double_ay_ai_nail', word: 'nail', meaning: '손톱', pronunciation: '네일', pattern: '이중모음 ay / ai (에이)', patternGroup: 'ay/ai', learningPoint: '손가락 끝을 단단히 지키는 손톱. 고운 색을 바르고 관리해 주는 네일숍(nail shop)' },
        ]
      },
      {
        id: 'double_oy_oi',
        name: 'oy / oi (오이)',
        patternKey: 'oy/oi',
        description: "oy는 단어의 '끝'에 자리를 잡고, oi는 단어 '중간'에서 '오이' 하고 독특하게 발음됨",
        words: [
          { id: 'double_oy_oi_boy', word: 'boy', meaning: '소년', pronunciation: '보이', pattern: '이중모음 oy / oi (오이)', patternGroup: 'oy/oi', learningPoint: "oy는 단어 꼬리표에 위치함. 아직 어리거나 씩씩한 사내아이 혹은 소년을 정답게 일컬음" },
          { id: 'double_oy_oi_toy', word: 'toy', meaning: '장난감', pronunciation: '토이', pattern: '이중모음 oy / oi (오이)', patternGroup: 'oy/oi', learningPoint: "어린이들이 방 가득 늘어놓고 재미나게 노는 인형이나 로봇. 영화 '토이스토리'의 핵심 단어" },
          { id: 'double_oy_oi_soy', word: 'soy', meaning: '콩', pronunciation: '소이', pattern: '이중모음 oy / oi (오이)', patternGroup: 'oy/oi', learningPoint: '밭에서 나는 영양 만점의 동글동글한 콩. 흔히 아침에 마시는 웰빙 두유(soy milk) 팩의 대표 글자' },
          { id: 'double_oy_oi_coin', word: 'coin', meaning: '동전', pronunciation: '코인', pattern: '이중모음 oy / oi (오이)', patternGroup: 'oy/oi', learningPoint: "oi는 단어 중간에 옴. 지갑 속 쇠붙이 동전. 최근 가상 인터넷 자산인 비트코인 등에 붙는 이름" },
          { id: 'double_oy_oi_boil', word: 'boil', meaning: '끓이다', pronunciation: '보일', pattern: '이중모음 oy / oi (오이)', patternGroup: 'oy/oi', learningPoint: "물을 뜨겁게 데워 100도가 넘게 끓이는 것. 가을겨울 방바닥을 훈훈히 가열하는 보일러의 진짜 단어" },
          { id: 'double_oy_oi_join', word: 'join', meaning: '함께하다, 가입하다', pronunciation: '조인', pattern: '이중모음 oy / oi (오이)', patternGroup: 'oy/oi', learningPoint: '재미난 동아리나 헬스클럽, 네이버 카페 등에 뜻이 맞아 회원으로 가입하고 함께 활동하는 행위' },
        ]
      },
      {
        id: 'double_ou_ow',
        name: 'ou / ow (아우)',
        patternKey: 'ou/ow',
        description: "ou와 ow가 이번에는 '오우'가 아닌, 우렁차고 묵직한 '아우' 소리로 한목소리를 냄",
        words: [
          { id: 'double_ou_ow_house', word: 'house', meaning: '집', pronunciation: '하우스', pattern: '이중모음 ou / ow (아우)', patternGroup: 'ou/ow', learningPoint: "ou가 부드럽게 '아우' 소리를 냄. 우리 식구들이 한데 뭉쳐 사는 주택이나 시골의 비닐하우스" },
          { id: 'double_ou_ow_mouse', word: 'mouse', meaning: '쥐', pronunciation: '마우스', pattern: '이중모음 ou / ow (아우)', patternGroup: 'ou/ow', learningPoint: '귀엽고 조그마한 쥐. 어린이들이 좋아하는 전설적인 미키 마우스(Mickey Mouse)' },
          { id: 'double_ou_ow_sound', word: 'sound', meaning: '소리', pronunciation: '사운드', pattern: '이중모음 ou / ow (아우)', patternGroup: 'ou/ow', learningPoint: '목소리나 음악 소리 등 귀로 들리는 모든 것. 극장에서 "사운드 끝내준다" 할 때의 사운드' },
          { id: 'double_ou_ow_cow', word: 'cow', meaning: '소', pronunciation: '카우', pattern: '이중모음 ou / ow (아우)', patternGroup: 'ou/ow', learningPoint: 'ow가 여기서 예외적으로 아우 소리가 남. 들판에서 풀을 뜯는 소. 미국의 카우보이(cowboy)' },
          { id: 'double_ou_ow_town', word: 'town', meaning: '마을', pronunciation: '타운', pattern: '이중모음 ou / ow (아우)', patternGroup: 'ou/ow', learningPoint: '사람들이 옹기종기 모여 사는 고을 또는 동네. 해외의 코리아타운, 차이나타운' },
          { id: 'double_ou_ow_gown', word: 'gown', meaning: '가운', pronunciation: '가운', pattern: '이중모음 ou / ow (아우)', patternGroup: 'ou/ow', learningPoint: '의사 선생님들이 진료 볼 때 걸치는 긴 옷, 또는 목욕하고 나와 가볍게 두르는 목욕 가운' },
        ]
      }
    ]
  }
];

// Helper to flat map all words
export const ALL_PHONICS_WORDS: PhonicsWord[] = PHONICS_DATA.flatMap(category =>
  category.groups.flatMap(group => group.words)
);
