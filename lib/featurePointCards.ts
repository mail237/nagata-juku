/**
 * 選ばれる3つの理由 / 授業・料金「特長」で共通の3カード（画像付きレイアウト）
 */
export const FEATURE_POINT_CARDS = [
  {
    num: '01',
    title: '塾長が全生徒を直接指導',
    summary: '進捗管理・カリキュラム・面談はすべて塾長',
    body: '講師任せにはしません。進み具合を見て、カリキュラムを組み、保護者面談も塾長がやります。ずっと同じ人間が見ているので、変化にすぐ気づけます。',
    image: '/images/feature-2.png?v=teacher-back',
    imageAlt: '塾長による個別指導（イメージ・先生は後ろ姿）',
  },
  {
    num: '02',
    title: '授業料定額・通いホーダイ',
    summary: '何科目でも・何回でも同じ月謝',
    body: '月謝は定額で、回数や科目が増えても追加料金はかかりません。テスト前にたくさん来ても、月謝は同じです。',
    image: '/images/feature-1.png?v=close-up',
    imageAlt: '定額・通いホーダイで学ぶイメージ（清潔な教室・通常の机・アップ）',
  },
  {
    num: '03',
    title: 'ICTの活用',
    summary: 'アプリと紙の問題集、両方使います',
    body: '紙の問題集だけじゃなく、学習アプリやWeb教材も使います。映像で見て、ドリルでくり返しながら覚えていきます。家からオンラインで受けることもできます。',
    image: '/images/feature-ict.png?v=ict-closeup',
    imageAlt: 'ICTで学習するイメージ（教材と画面のアップ）',
  },
] as const;
