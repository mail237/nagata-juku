export const SCHOOL = {
  name: '永田塾',
  tagline: '大阪・八尾市の個別指導塾｜本気で成績を上げる',
  address: '〒581-0071 大阪府八尾市北久宝寺1-4-80',
  phone: '072-940-7683',
  /** お問合せ用メール（サイト表示・フォーム送信先の既定値と揃える） */
  email: 'mail@nagata-juku.net',
  access: '近鉄久宝寺口から徒歩5分程度',
  hours: '15:00〜22:00',
  closed: '日曜・祝日',
  /** 公式Instagram（プロフィールURL。空文字にするとサイト上では非表示） */
  instagramUrl: 'https://www.instagram.com/nagatajuku.yao/',
  /** 永田塾 LINE（友だち追加URL。空文字にするとサイト上では非表示） */
  lineUrl: 'https://line.me/ti/p/SPSxYZrdxy',
  /** フッター等に表示。写真・年齢の誤解防止用 */
  imageDisclaimer:
    'トップページ等の一部の写真・イラストはイメージです。実際の教室・人物の外見・年齢等と異なる場合があります。塾長のセミナー登壇の写真は実際の写真です。塾長（永田知裕）は1987年生まれです。',
} as const;

/** トップ等に小さく載せる「個別指導の永田塾です」バナー（ヒーローでは使わない） */
export const WELCOME_BANNER = {
  src: '/images/hero-banner-junior-student.png?v=welcome-2026-06',
  alt: '個別指導の永田塾です。アクセスありがとうございます（イメージ・今年で12年）',
  width: 1024,
  height: 434,
} as const;

/** コードアドベンチャー八尾校（マイクラプログラミングコース）特設ページ */
export const CODE_ADVENTURE_YAO_LP = 'https://codeadventure.jp/lp/yao/' as const;

/** 空席案内（随時ここを更新してください） */
export const VACANCY_ROWS = [
  { label: '高校生', status: '満席' },
  { label: '中学生', status: '満席' },
  { label: '小学生', status: '空き1名' },
  { label: 'プログラミング', status: '満席' },
] as const;

/** 表記をサイト全体で統一（お問合せ） */
/** 保護者の検討順に近い並び（授業→声→講師→場所→申込） */
export const NAV_LINKS = [
  { href: '/service', label: '授業・料金' },
  { href: '/voice', label: '生徒の声' },
  { href: '/greeting', label: '講師紹介' },
  { href: '/access', label: '教室案内' },
  { href: '/contact', label: 'お問合せ' },
] as const;

/** ヘッダー用（トップの左端に「ホーム」を出す。フッターは NAV_LINKS のみ） */
export const HEADER_NAV_LINKS = [
  { href: '/', label: 'ホーム' },
  ...NAV_LINKS,
] as const;

export const FOOTER_LINKS = [
  { href: '/flow', label: 'ご入塾までの流れ' },
  { href: '/case', label: '実績紹介' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/greeting', label: '代表者ごあいさつ' },
  { href: '/column', label: 'お役立ち情報' },
] as const;

/** トップ：マルquee直下の濃色帯 */
export const COMMITMENT_STRIP_ITEMS = [
  { headline: 'ICT×診断', sub: 'つまずきをデータで可視化' },
  { headline: '反復で基礎定着', sub: '飽きずに、繰り返し学べる' },
  { headline: '一人ひとりの指導', sub: '進捗・面談・カリキュラムを塾長が一貫担当' },
  { headline: '通い放題・定額', sub: '複数科目でも月謝は変わらない' },
] as const;

export const MARQUEE_ITEMS = [
  '基礎を制する者が受験を制する',
  'ICT×個別指導',
  '飽きずに、くり返し',
  '基礎こそが近道',
  '定期テスト対策',
  '通い放題・定額',
  'わからない箇所をすぐ特定',
  '「できた！」が増えると、勉強が続く',
];
