#!/usr/bin/env python3
"""Extract colors from Desktop PDF and emit nenkan-yotei-2026.html (A4 single page)."""
import calendar
import re
from pathlib import Path

import fitz

PDF = Path("/Users/tomohiro/Desktop/2026年年間予定表_読みやすい版.pdf")
OUT = Path(__file__).resolve().parents[1] / "public" / "nenkan-yotei-2026.html"


def classify_fill(fill):
    if not fill or len(fill) < 3:
        return None
    r, g, b = fill[0], fill[1], fill[2]
    if r > 0.95 and g > 0.82 and b > 0.82:
        return "kyu"
    if g > 0.85 and r > 0.65 and b < 0.75:
        return "kou"
    if b > 0.85 and r < 0.7 and g < 0.8:
        return "pro"
    if b > 0.65 and r < 0.2 and g < 0.45:
        return "pro"
    return None


def extract_map():
    page = fitz.open(PDF)[0]
    cells = []
    for d in page.get_drawings():
        fill = d.get("fill")
        cls = classify_fill(fill)
        if not cls:
            continue
        rect = d.get("rect")
        if not rect:
            continue
        w, h = rect.width, rect.height
        if w < 5 or h < 5 or w > 35 or h > 35:
            continue
        cells.append((rect, cls))

    results = {}
    current_month = None
    for w in page.get_text("words"):
        x0, y0, x1, y1, text, *_ = w
        t = text.strip()
        if "2026年" in t and "月" in t and len(t) < 20:
            m = re.search(r"(\d{1,2})月", t)
            if m:
                current_month = int(m.group(1))
            continue
        if t in ("日", "月", "火", "水", "木", "金", "土"):
            continue
        if t.replace(".", "").isdigit():
            day = int(t)
            cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
            for rect, c in cells:
                if rect.contains((cx, cy)):
                    if current_month:
                        maxd = calendar.monthrange(2026, current_month)[1]
                        if 1 <= day <= maxd:
                            results[f"{current_month}-{day}"] = c
                    break
    return results


def main():
    cmap = extract_map()
    calendar.setfirstweekday(calendar.SUNDAY)

    months_html = []
    for month in range(1, 13):
        weeks = calendar.monthcalendar(2026, month)
        rows = []
        for week in weeks:
            cells = []
            for d in week:
                if d == 0:
                    cells.append('<td class="cal-d empty"></td>')
                else:
                    key = f"{month}-{d}"
                    cls = cmap.get(key, "")
                    extra = f" cal-{cls}" if cls else ""
                    cells.append(f'<td class="cal-d{extra}">{d}</td>')
            rows.append("<tr>" + "".join(cells) + "</tr>")
        thead = "<tr>" + "".join(
            f'<th class="wd{["sun","mon","tue","wed","thu","fri","sat"][i]}">{["日","月","火","水","木","金","土"][i]}</th>'
            for i in range(7)
        ) + "</tr>"
        body = "".join(rows)
        months_html.append(
            f'''<article class="month-block">
  <h2 class="month-title">2026年　{month}月</h2>
  <table class="mini-cal" aria-label="{month}月">
    <thead>{thead}</thead>
    <tbody>{body}</tbody>
  </table>
</article>'''
        )

    html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>2026年　永田塾　年間予定表</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@700;900&display=swap" rel="stylesheet" />
  <style>
    :root {{
      --accent: #2a6570;
      --ink: #1f1f1f;
      --ink-soft: #4a4a4a;
      --line: #cfd4d8;
      --cal-kyu: #ffd4d4;
      --cal-kou: #c8e8a8;
      --cal-pro: #b4cbf0;
    }}
    @page {{ size: A4; margin: 0; }}
    * {{ box-sizing: border-box; }}
    html {{ font-size: 9pt; }}
    body {{
      margin: 0;
      min-height: 297mm;
      font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
      color: var(--ink-soft);
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    .sheet {{
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 7mm 9mm 6mm;
      display: flex;
      flex-direction: column;
    }}
    .doc-title {{
      font-family: "Noto Serif JP", serif;
      font-weight: 900;
      font-size: 15pt;
      letter-spacing: 0.06em;
      text-align: center;
      color: var(--ink);
      margin: 0 0 4mm;
    }}
    .legend {{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 5mm 7mm;
      padding: 2.5mm 4mm;
      border: 1px solid var(--line);
      border-radius: 3mm;
      background: #fafbfc;
      margin: 0 auto 3mm;
      max-width: 100%;
    }}
    .legend-item {{
      display: flex;
      align-items: center;
      gap: 2mm;
      font-size: 8.5pt;
      font-weight: 700;
      color: var(--ink);
    }}
    .swatch {{
      width: 4.2mm;
      height: 4.2mm;
      border-radius: 0.6mm;
      border: 1px solid rgba(0,0,0,0.08);
    }}
    .swatch.kyu {{ background: var(--cal-kyu); }}
    .swatch.kou {{ background: var(--cal-kou); }}
    .swatch.pro {{ background: var(--cal-pro); }}
    .notices {{
      font-size: 7.5pt;
      line-height: 1.5;
      color: var(--ink-soft);
      text-align: center;
      margin: 0 0 3mm;
    }}
    .notices p {{
      margin: 0 0 1.2mm;
    }}
    .notices p:last-child {{
      margin-bottom: 0;
    }}
    .year-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, minmax(0, 1fr));
      gap: 3mm 2.6mm;
      flex: 1;
      min-height: 0;
      margin-bottom: 1mm;
    }}
    .month-block {{
      border: 1px solid var(--line);
      border-radius: 2.5mm;
      padding: 2mm 2.5mm 2.5mm;
      display: flex;
      flex-direction: column;
      min-height: 0;
      background: #fff;
    }}
    .month-title {{
      font-family: "Noto Serif JP", serif;
      font-weight: 700;
      font-size: 8.5pt;
      margin: 0 0 1.5mm;
      color: var(--ink);
      text-align: center;
    }}
    .mini-cal {{
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      font-size: 6.5pt;
      flex: 1;
    }}
    .mini-cal th {{
      font-weight: 700;
      padding: 0.4mm 0;
      color: var(--ink-soft);
    }}
    .mini-cal th.sun {{ color: #c62828; }}
    .mini-cal th.sat {{ color: #1565c0; }}
    .mini-cal td {{
      text-align: center;
      vertical-align: middle;
      padding: 0.35mm 0;
      line-height: 1.15;
      border-radius: 0.8mm;
    }}
    .mini-cal td.empty {{ opacity: 0; }}
    .mini-cal td.cal-kyu {{ background: var(--cal-kyu); color: var(--ink); font-weight: 600; }}
    .mini-cal td.cal-kou {{ background: var(--cal-kou); color: var(--ink); font-weight: 600; }}
    .mini-cal td.cal-pro {{ background: var(--cal-pro); color: var(--ink); font-weight: 600; }}
    .foot-insta {{
      margin-top: 3.5mm;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4mm;
      border: 1px solid var(--line);
      border-left: 3px solid var(--accent);
      border-radius: 2mm;
      padding: 2.8mm 3.5mm 2.8mm 3mm;
      background: #fafbfc;
      text-align: left;
    }}
    .foot-insta__text {{
      flex: 1;
      min-width: 0;
      padding-right: 1mm;
    }}
    .foot-insta__title {{
      font-family: "Noto Serif JP", serif;
      font-weight: 900;
      font-size: 8.75pt;
      color: var(--ink);
      margin: 0 0 1mm;
      letter-spacing: 0.02em;
      line-height: 1.35;
    }}
    .foot-insta__body {{
      margin: 0;
      font-size: 7.35pt;
      line-height: 1.5;
      color: var(--ink-soft);
    }}
    .foot-insta__line-title {{
      font-family: "Noto Serif JP", serif;
      font-weight: 900;
      font-size: 8.35pt;
      color: var(--ink);
      margin: 2mm 0 0.5mm;
      letter-spacing: 0.02em;
      line-height: 1.3;
    }}
    .foot-insta__line {{
      margin: 0;
      font-size: 7.1pt;
      font-weight: 400;
      line-height: 1.45;
      color: var(--ink-soft);
      letter-spacing: 0.02em;
    }}
    .foot-insta__line strong {{
      color: var(--accent);
      font-weight: 700;
    }}
    .foot-insta__qr {{
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1mm;
      padding: 1.2mm;
      border-radius: 1.5mm;
      background: #fff;
      border: 1px solid rgba(207, 212, 216, 0.9);
    }}
    .foot-insta__qr img {{
      display: block;
      width: 20mm;
      height: 20mm;
      object-fit: contain;
    }}
    .foot-insta__url {{
      margin: 0;
      font-size: 6.25pt;
      line-height: 1.25;
      color: var(--accent);
      font-weight: 700;
      word-break: break-all;
      max-width: 26mm;
      text-align: center;
    }}
    @media print {{
      body {{ background: #fff !important; }}
      .sheet {{ padding: 6mm 8mm 5mm !important; }}
    }}
  </style>
</head>
<body>
  <div class="sheet">
    <h1 class="doc-title">2026年　永田塾　年間予定表</h1>
    <div class="legend" role="group" aria-label="凡例">
      <span class="legend-item"><span class="swatch kyu"></span>休塾日</span>
      <span class="legend-item"><span class="swatch kou"></span>講習会</span>
      <span class="legend-item"><span class="swatch pro"></span>プログラミング</span>
    </div>
    <div class="notices">
      <p>※水曜日がプログラミング（表の色付き）の日でも、夜の部（19:30〜22:00）の授業は通常どおり行います。</p>
    </div>
    <div class="year-grid">
{chr(10).join(months_html)}
    </div>
    <footer class="foot-insta">
      <div class="foot-insta__text">
        <p class="foot-insta__title">【インスタ開設のお知らせ】</p>
        <p class="foot-insta__body">公式Instagramを開設しました。授業の様子やイベント情報などを発信しています。よろしければフォローをお願いします。</p>
        <p class="foot-insta__line-title">【LINEでのご連絡】</p>
        <p class="foot-insta__line">振替・欠席などのご連絡は、LINEでも承っております。<strong>LINE ID：201502012015</strong>（友だち追加はID検索より）</p>
      </div>
      <div class="foot-insta__qr">
        <img src="images/instagram-qr.png" width="132" height="132" alt="永田塾公式InstagramのQRコード" />
        <p class="foot-insta__url">instagram.com/nagatajuku.yao/</p>
      </div>
    </footer>
  </div>
</body>
</html>"""

    OUT.write_text(html, encoding="utf-8")
    print("Wrote", OUT, "keys", len(cmap))


if __name__ == "__main__":
    main()
