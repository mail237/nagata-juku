#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""年間予定表（Excelの色）→ 読みやすいHTML / PDF を生成"""
from __future__ import annotations

import calendar
import subprocess
import sys
from pathlib import Path
from typing import Optional

try:
    import openpyxl
except ImportError:
    print("pip install openpyxl", file=sys.stderr)
    sys.exit(1)

XLSX = Path(
    "/Users/tomohiro/Library/Mobile Documents/com~apple~CloudDocs/Documents/書類/"
    "年間予定表 （プロあり）.xlsx"
)
OUT_HTML = Path(__file__).resolve().parent.parent / "public" / "2026-nenkan-yotei.html"
OUT_PDF = Path.home() / "Desktop" / "2026年年間予定表_読みやすい版.pdf"


def fill_kind(cell) -> Optional[str]:
    if cell is None:
        return None
    fill = cell.fill
    if not fill or not fill.fgColor:
        return None
    fc = fill.fgColor
    if fc.type == "rgb" and fc.rgb:
        s = str(fc.rgb).upper()
        if "FFD9D9" in s or s == "FFFFD9D9":
            return "休塾"
        if "92D050" in s:
            return "講習"
        if "E1E8FF" in s:
            return "土曜"
    if fc.type == "theme" and fc.theme == 5:
        return "プログラミング"
    return None


REGIONS = [
    (1, 9, 2, 8, 13),
    (2, 9, 10, 16, 13),
    (3, 9, 18, 24, 13),
    (4, 19, 2, 8, 24),
    (5, 19, 10, 16, 24),
    (6, 19, 18, 24, 24),
    (7, 29, 2, 8, 34),
    (8, 29, 10, 16, 34),
    (9, 29, 18, 24, 34),
    (10, 39, 2, 8, 44),
    (11, 39, 10, 16, 44),
    (12, 39, 18, 24, 44),
]


def load_marks(ws):
    marks: dict[tuple[int, int], str] = {}
    for month, r1, c1, c2, r2 in REGIONS:
        for r in range(r1, r2 + 1):
            for c in range(c1, c2 + 1):
                cell = ws.cell(r, c)
                v = cell.value
                k = fill_kind(cell)
                if isinstance(v, int) and k and k not in ("土曜",):
                    marks[(month, v)] = k
    return marks


MONTH_JA = [
    "",
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
]


def build_html(marks: dict[tuple[int, int], str]) -> str:
    calendar.setfirstweekday(calendar.SUNDAY)
    year = 2026

    def cell_class(m: int, d: int) -> str:
        k = marks.get((m, d))
        if k == "休塾":
            return "cell kyu"
        if k == "講習":
            return "cell kou"
        if k == "プログラミング":
            return "cell prog"
        return "cell"

    months_html = []
    for m in range(1, 13):
        _, n_days = calendar.monthrange(year, m)
        # weekday Monday=0..Sunday=6 → Sunday-first column index 0..6
        first_sun = (calendar.monthrange(year, m)[0] + 1) % 7

        rows = []
        cells = [None] * first_sun + list(range(1, n_days + 1))
        while len(cells) % 7 != 0:
            cells.append(None)
        for i in range(0, len(cells), 7):
            row = cells[i : i + 7]
            tds = []
            for d in row:
                if d is None:
                    tds.append('<td class="cell empty"></td>')
                else:
                    cls = cell_class(m, d)
                    tds.append(f'<td class="{cls}"><span class="n">{d}</span></td>')
            rows.append("<tr>" + "".join(tds) + "</tr>")
        tbody = "\n".join(rows)
        months_html.append(
            f"""
    <div class="month">
      <div class="month-h">{year}年　{MONTH_JA[m]}</div>
      <table class="cal">
        <thead><tr>
          <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
        </tr></thead>
        <tbody>{tbody}</tbody>
      </table>
    </div>"""
        )

    chunks = []
    for i in range(0, 12, 3):
        chunks.append(
            '<div class="row-months">' + "".join(months_html[i : i + 3]) + "</div>"
        )
    months_block = "\n".join(chunks)

    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>2026年 永田塾 年間予定表</title>
  <style>
    @page {{ size: A4 portrait; margin: 8mm; }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, Meiryo, sans-serif;
      color: #222;
      font-size: 8.5pt;
      line-height: 1.35;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    .wrap {{ max-width: 210mm; margin: 0 auto; padding: 2mm 4mm 4mm; }}
    h1 {{
      font-size: 14pt;
      font-weight: 800;
      margin: 0 0 3mm;
      letter-spacing: 0.06em;
      text-align: center;
    }}
    .legend {{
      display: flex;
      flex-wrap: wrap;
      gap: 4mm 6mm;
      justify-content: center;
      align-items: center;
      margin-bottom: 3mm;
      padding: 2mm 3mm;
      border: 1px solid #ccc;
      border-radius: 2mm;
      background: #fafafa;
    }}
    .leg {{ display: flex; align-items: center; gap: 1.5mm; font-size: 8pt; }}
    .sw {{ width: 8mm; height: 3.5mm; border-radius: 1px; border: 1px solid #999; }}
    .sw.kyu {{ background: #ffd9d9; }}
    .sw.kou {{ background: #92d050; }}
    .sw.prog {{ background: #4472c4; }}
    .row-months {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2.5mm 3mm;
      margin-bottom: 2.5mm;
    }}
    .month {{ border: 1px solid #bbb; border-radius: 1.5mm; padding: 1.5mm; background: #fff; }}
    .month-h {{
      font-weight: 800;
      font-size: 8.5pt;
      text-align: center;
      margin-bottom: 1mm;
      padding-bottom: 0.5mm;
      border-bottom: 1px solid #ddd;
    }}
    table.cal {{ width: 100%; border-collapse: collapse; table-layout: fixed; }}
    .cal th {{
      font-size: 6.5pt;
      font-weight: 700;
      padding: 0.5mm 0;
      color: #333;
      border-bottom: 1px solid #ccc;
    }}
    .cal th:first-child {{ color: #b00020; }}
    .cal th:last-child {{ color: #1565c0; }}
    .cal td {{
      text-align: center;
      vertical-align: middle;
      padding: 1px 0;
      height: 11px;
      border: 1px solid #e5e5e5;
    }}
    .cal td .n {{ font-size: 7pt; font-weight: 600; }}
    .cell.empty {{ background: #f9f9f9; border-color: #eee; }}
    .cell.kyu {{ background: #ffd9d9; }}
    .cell.kou {{ background: #c5e6a6; }}
    .cell.prog {{ background: #9bb7e8; color: #111; }}
    .foot-insta {{
      margin-top: 3.5mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4mm;
      border: 1px solid #cfd4d8;
      border-left: 3px solid #2a6570;
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
      font-weight: 900;
      font-size: 8.75pt;
      color: #1f1f1f;
      margin: 0 0 1mm;
      line-height: 1.35;
    }}
    .foot-insta__body {{
      margin: 0;
      font-size: 7.35pt;
      line-height: 1.5;
      color: #333;
    }}
    .foot-insta__line-title {{
      font-weight: 900;
      font-size: 8.35pt;
      color: #1f1f1f;
      margin: 2mm 0 0.5mm;
      line-height: 1.3;
    }}
    .foot-insta__line {{
      margin: 0;
      font-size: 7.1pt;
      font-weight: 400;
      line-height: 1.45;
      color: #444;
      letter-spacing: 0.02em;
    }}
    .foot-insta__line strong {{
      color: #2a6570;
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
      color: #2a6570;
      font-weight: 700;
      word-break: break-all;
      max-width: 26mm;
      text-align: center;
    }}
    @media print {{
      body {{ font-size: 8.2pt; }}
    }}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>2026年　永田塾　年間予定表</h1>
    <div class="legend">
      <div class="leg"><span class="sw kyu"></span>休塾日</div>
      <div class="leg"><span class="sw kou"></span>講習会</div>
      <div class="leg"><span class="sw prog"></span>プログラミング</div>
    </div>
    {months_block}
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
</html>
"""


def main():
    if not XLSX.exists():
        print("Excel が見つかりません:", XLSX, file=sys.stderr)
        sys.exit(1)
    wb = openpyxl.load_workbook(XLSX, data_only=True)
    ws = wb["2025年 (2)"]
    marks = load_marks(ws)
    html = build_html(marks)
    OUT_HTML.parent.mkdir(parents=True, exist_ok=True)
    OUT_HTML.write_text(html, encoding="utf-8")
    print("Wrote", OUT_HTML)

    chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    url = OUT_HTML.as_uri()
    cmd = [
        chrome,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={OUT_PDF}",
        url,
    ]
    r = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=120,
    )
    if r.returncode != 0:
        print(r.stderr or r.stdout, file=sys.stderr)
        sys.exit(r.returncode)
    print("Wrote", OUT_PDF)


if __name__ == "__main__":
    main()
