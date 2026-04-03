#!/bin/bash
# 永田塾 画像生成 - ComfyUI起動 & 画像生成スクリプト
# このファイルをダブルクリックして実行してください

COMFYUI_DIR="/Users/tomohiro/Projects/ComfyUI"
PYTHON="$COMFYUI_DIR/.venv/bin/python"
PROJECT_DIR="/Users/tomohiro/Projects/nagata-juku"

echo "======================================"
echo " 永田塾 Flux 画像生成"
echo "======================================"
echo ""

# ComfyUI がすでに起動しているか確認
if curl -s http://127.0.0.1:8188/system_stats > /dev/null 2>&1; then
  echo "✓ ComfyUI はすでに起動しています"
else
  echo "ComfyUI を起動中..."
  cd "$COMFYUI_DIR"
  "$PYTHON" main.py --port 8188 &
  COMFY_PID=$!
  echo "  (PID: $COMFY_PID)"

  # 起動待ち（最大60秒）
  echo -n "  起動待ち"
  for i in $(seq 1 30); do
    sleep 2
    echo -n "."
    if curl -s http://127.0.0.1:8188/system_stats > /dev/null 2>&1; then
      echo ""
      echo "✓ ComfyUI 起動完了！"
      break
    fi
  done

  if ! curl -s http://127.0.0.1:8188/system_stats > /dev/null 2>&1; then
    echo ""
    echo "✗ ComfyUI の起動に失敗しました。ログを確認してください。"
    exit 1
  fi
fi

echo ""
echo "画像生成を開始します..."
echo ""

"$PYTHON" "$PROJECT_DIR/scripts/generate_images.py"

echo ""
echo "完了！ブラウザで確認: http://localhost:3000"
echo ""
read -p "Enterキーで閉じる..."
