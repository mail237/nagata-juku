export const SCHOOL = {
  name: '永田塾',
  tagline: '本気で成績を上げるなら大阪・八尾市の個別指導塾',
  address: '〒581-0071 大阪府八尾市北久宝寺1-4-80',
  phone: '072-940-7683',
  access: '近鉄久宝寺口から徒歩5分程度',
  hours: '15:00〜22:00',
  closed: '日曜・祝日',
  /** 公式Instagram（プロフィールURL。空文字にするとサイト上では非表示） */
  instagramUrl: 'https://www.instagram.com/nagatajuku.yao/',
  /** フッター等に表示。写真・年齢の誤解防止用 */
  imageDisclaimer:
    'トップページ等の一部の写真・イラストはイメージです。実際の教室・人物の外見・年齢等と異なる場合があります。塾長のセミナー登壇の写真は実際の写真です。塾長（永田知裕）は37歳です。',
} as const;

/** コードアドベンチャー八尾校（マイクラプログラミングコース）特設ページ */
export const CODE_ADVENTURE_YAO_LP = 'https://codeadventure.jp/lp/yao/' as const;

/** 空席案内（随時ここを更新してください） */
export const VACANCY_ROWS = [
  { label: '高校生', status: '満席' },
  { label: '中学生', status: '満席' },
  { label: '小学生', status: '満席' },
  { label: 'プログラミング', status: '残り一席' },
] as const;

export const NAV_LINKS = [
  { href: '/service', label: '授業・料金' },
  { href: '/greeting', label: '講師紹介' },
  { href: '/voice', label: '生徒の声' },
  { href: '/access', label: '教室案内' },
  { href: '/contact', label: 'お問合せ' },
] as const;

export const FOOTER_LINKS = [
  { href: '/flow', label: 'ご入塾までの流れ' },
  { href: '/case', label: '実績紹介' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/greeting', label: '代表者ごあいさつ' },
  { href: '/column', label: 'お役立ち情報' },
] as const;

/** トップ：マルquee直下の濃色帯（旧「数字で見る」と同じメリハリ用・文言はここで調整） */
export const COMMITMENT_STRIP_ITEMS = [
  { headline: 'ICT×診断', sub: 'つまずきをデータで把握' },
  { headline: '反復で基礎定着', sub: '飽きずに、大量に学べる' },
  { headline: '一人ひとりに合わせた指導', sub: '進捗・面談・カリキュラムを一貫してサポート' },
  { headline: '通い放題・定額', sub: '複数科目も追加料金なし' },
] as const;

export const MARQUEE_ITEMS = [
  '基礎を制する者が受験を制する',
  'ICT×個別指導',
  '飽きずに、大量に',
  '基礎こそが近道',
  '定期テスト対策',
  '通い放題・定額',
  'わからないを瞬時に特定',
];
