#!/usr/bin/env python3
"""
永田塾ホームページ用 Flux 画像生成スクリプト
ComfyUI API (localhost:8188) 経由で Flux Schnell を使って画像を生成します。

使い方:
  1. ComfyUI を起動する (Pinokio から)
  2. このスクリプトを実行:
     python3 scripts/generate_images.py

生成される画像:
  - public/images/feature-1.png     ... 通い放題・学習シーン (800x600)
  - public/images/feature-2.png     ... 塾長が生徒を直接指導 (800x600)
  - public/images/feature-3.png     ... 学習イメージ (800x600)

単体生成:
  python3 scripts/generate_images.py feature-2.png
"""

import json
import time
import urllib.request
import urllib.parse
import urllib.error
import os
import random
import sys
from pathlib import Path

COMFYUI_URL = "http://127.0.0.1:8188"
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images"

# ---------------------------------------------------------------------------
# 画像プロンプト定義
# ---------------------------------------------------------------------------
IMAGES = [
    {
        "filename": "feature-1.png",
        "width": 800,
        "height": 600,
        "steps": 4,
        "prompt": (
            "Medium close-up of Japanese female high school student in navy blazer at simple standard school desk, "
            "clean cram school room, tight framing on upper body hands and desk with textbooks, shallow depth of field, "
            "not wide room shot, not a booth, spotless tidy, photorealistic stock photo, sharp focus, 4k"
        ),
    },
    {
        "filename": "feature-2.png",
        "width": 800,
        "height": 600,
        "steps": 4,
        "prompt": (
            "Japanese male teacher in white dress shirt and dark blue tie, seen ONLY from behind, "
            "back view shoulders and back of head, face not visible, pointing at open textbook on wooden desk, "
            "Japanese female high school student in navy blazer school uniform at desk writing with pen, "
            "bright modern Japanese cram school classroom, whiteboard, bookshelf, window daylight, wall clock, "
            "photorealistic, professional stock photo style, sharp focus, 4k"
        ),
    },
    {
        "filename": "feature-3.png",
        "width": 800,
        "height": 600,
        "steps": 4,
        "prompt": (
            "Japanese female high school student in navy blue school uniform with ribbon, "
            "sitting at a desk studying with textbooks and colorful pens, bright natural smile, "
            "slightly above angle, bright airy room with soft window light, "
            "neat organized desk with stationery, "
            "photorealistic, professional stock photo style, sharp focus, 4k"
        ),
    },
]

# ---------------------------------------------------------------------------
# ComfyUI ワークフロー (Flux Schnell Mac 用)
# ---------------------------------------------------------------------------
BASE_WORKFLOW = {
    "6": {
        "class_type": "CLIPTextEncode",
        "inputs": {
            "clip": ["11", 0],
            "text": "PLACEHOLDER_PROMPT"
        }
    },
    "8": {
        "class_type": "VAEDecode",
        "inputs": {
            "samples": ["13", 0],
            "vae": ["10", 0]
        }
    },
    "9": {
        "class_type": "SaveImage",
        "inputs": {
            "filename_prefix": "nagata_juku",
            "images": ["8", 0]
        }
    },
    "10": {
        "class_type": "VAELoader",
        "inputs": {
            "vae_name": "ae.safetensors"
        }
    },
    "11": {
        "class_type": "DualCLIPLoader",
        "inputs": {
            "clip_name1": "t5xxl_fp16.safetensors",
            "clip_name2": "clip_l.safetensors",
            "type": "flux"
        }
    },
    "12": {
        "class_type": "UNETLoader",
        "inputs": {
            "unet_name": "flux1-schnell/flux1-schnell.safetensors",
            "weight_dtype": "default"
        }
    },
    "13": {
        "class_type": "SamplerCustomAdvanced",
        "inputs": {
            "noise": ["50", 0],
            "guider": ["22", 0],
            "sampler": ["16", 0],
            "sigmas": ["38", 1],
            "latent_image": ["51", 0]
        }
    },
    "16": {
        "class_type": "KSamplerSelect",
        "inputs": {
            "sampler_name": "euler"
        }
    },
    "17": {
        "class_type": "BasicScheduler",
        "inputs": {
            "model": ["12", 0],
            "scheduler": "normal",
            "steps": 4,
            "denoise": 1.0
        }
    },
    "22": {
        "class_type": "BasicGuider",
        "inputs": {
            "model": ["12", 0],
            "conditioning": ["6", 0]
        }
    },
    "38": {
        "class_type": "SplitSigmas",
        "inputs": {
            "sigmas": ["17", 0],
            "step": 0
        }
    },
    "50": {
        "class_type": "RandomNoise",
        "inputs": {
            "noise_seed": 0,
            "noise_type": "default"
        }
    },
    "51": {
        "class_type": "EmptyLatentImage",
        "inputs": {
            "width": 1024,
            "height": 576,
            "batch_size": 1
        }
    }
}


def check_comfyui():
    """ComfyUI が起動しているか確認"""
    try:
        req = urllib.request.urlopen(f"{COMFYUI_URL}/system_stats", timeout=5)
        return req.status == 200
    except Exception:
        return False


def queue_prompt(workflow: dict) -> str:
    """ワークフローをキューに追加して prompt_id を返す"""
    payload = json.dumps({"prompt": workflow}).encode("utf-8")
    req = urllib.request.Request(
        f"{COMFYUI_URL}/api/prompt",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())
    return result["prompt_id"]


def wait_for_result(prompt_id: str, timeout: int = 600) -> list[dict]:
    """生成完了を待って画像情報リストを返す"""
    deadline = time.time() + timeout
    print(f"  生成中 (prompt_id: {prompt_id[:8]}...)", end="", flush=True)
    while time.time() < deadline:
        time.sleep(3)
        print(".", end="", flush=True)
        try:
            url = f"{COMFYUI_URL}/api/history/{prompt_id}"
            with urllib.request.urlopen(url) as resp:
                history = json.loads(resp.read())
            if prompt_id in history:
                status = history[prompt_id].get("status", {})
                if status.get("status_str") == "success":
                    outputs = history[prompt_id].get("outputs", {})
                    images = []
                    for node_output in outputs.values():
                        if "images" in node_output:
                            images.extend(node_output["images"])
                    if images:
                        print(" 完了！")
                        return images
        except Exception:
            pass
    raise TimeoutError(f"タイムアウト ({timeout}秒)")


def download_image(image_info: dict, save_path: Path):
    """ComfyUI から画像をダウンロードして保存"""
    params = urllib.parse.urlencode({
        "filename": image_info["filename"],
        "subfolder": image_info.get("subfolder", ""),
        "type": image_info.get("type", "output"),
    })
    url = f"{COMFYUI_URL}/api/view?{params}"
    with urllib.request.urlopen(url) as resp:
        data = resp.read()
    save_path.parent.mkdir(parents=True, exist_ok=True)
    with open(save_path, "wb") as f:
        f.write(data)


def build_workflow(img_config: dict) -> dict:
    """画像設定からワークフローを構築"""
    import copy
    wf = copy.deepcopy(BASE_WORKFLOW)
    wf["6"]["inputs"]["text"] = img_config["prompt"]
    wf["17"]["inputs"]["steps"] = img_config["steps"]
    wf["51"]["inputs"]["width"] = img_config["width"]
    wf["51"]["inputs"]["height"] = img_config["height"]
    wf["50"]["inputs"]["noise_seed"] = random.randint(0, 2**32 - 1)
    return wf


def main():
    print("=" * 60)
    print("永田塾ホームページ 画像生成スクリプト (Flux Schnell)")
    print("=" * 60)

    only_name = None
    if len(sys.argv) > 1:
        arg = sys.argv[1].strip()
        if not arg.endswith(".png"):
            arg = f"{arg}.png"
        only_name = arg

    images_to_run = IMAGES
    if only_name:
        images_to_run = [img for img in IMAGES if img["filename"] == only_name]
        if not images_to_run:
            print(f"✗ 不明なファイル名: {only_name}")
            print(f"  指定可能: {', '.join(img['filename'] for img in IMAGES)}")
            sys.exit(1)
        print(f"\n単体モード: {only_name} のみ生成します\n")

    # ComfyUI 起動確認
    print(f"\nComfyUI への接続確認 ({COMFYUI_URL})...")
    if not check_comfyui():
        print("✗ ComfyUI に接続できません。")
        print("  Pinokio から ComfyUI を起動してから再実行してください。")
        sys.exit(1)
    print("✓ ComfyUI に接続しました！\n")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for i, img in enumerate(images_to_run, 1):
        print(f"[{i}/{len(images_to_run)}] {img['filename']} ({img['width']}x{img['height']})")
        print(f"  プロンプト: {img['prompt'][:80]}...")

        try:
            wf = build_workflow(img)
            prompt_id = queue_prompt(wf)
            image_list = wait_for_result(prompt_id)

            if image_list:
                save_path = OUTPUT_DIR / img["filename"]
                download_image(image_list[0], save_path)
                size_kb = save_path.stat().st_size // 1024
                print(f"  ✓ 保存完了: {save_path} ({size_kb} KB)\n")
            else:
                print(f"  ✗ 画像が返ってきませんでした\n")

        except TimeoutError as e:
            print(f"\n  ✗ {e}\n")
        except Exception as e:
            print(f"\n  ✗ エラー: {e}\n")

    print("=" * 60)
    print("完了！次のファイルを確認してください:")
    for img in images_to_run:
        path = OUTPUT_DIR / img["filename"]
        status = "✓" if path.exists() else "✗"
        print(f"  {status} {path}")
    print("=" * 60)


if __name__ == "__main__":
    main()
