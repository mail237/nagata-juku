#!/usr/bin/env python3
"""Generate hero banner image via ComfyUI API.

Default: Stable Diffusion 1.5 (not Flux). Different look, often slower.
  HERO_MODEL=flux  … 従来の Flux Schnell に戻す

  ComfyUI 起動後:  python generate_hero.py
"""
import json
import os
import random
import shutil
import time
import urllib.error
import urllib.request

COMFY_URL = "http://127.0.0.1:8188"
OUTPUT_PATH = "/Users/tomohiro/Projects/nagata-juku/public/images/hero-banner.png"
HERO_MODEL = os.environ.get("HERO_MODEL", "sd15").lower().strip()

# SD1.5 は CLIP トークン制限があるので短めに（長いと末尾が切れる）
PROMPT_SD15 = (
    "professional photograph, japanese teenage girl studying at wooden desk, "
    "left side of frame, side profile looking down at paper and book, not camera, "
    "white school blouse open collar no ribbon no necktie, navy pleated skirt, long brown hair, "
    "window left green trees bokeh, white curtain right, soft daylight, "
    "open textbook, loose paper, pen writing, black tablet on small wood stand, no laptop no lamp, "
    "photorealistic dslr snapshot natural colors candid"
)
NEGATIVE_SD15 = (
    "ribbon, bow, necktie, laptop, desk lamp, headphones, "
    "looking at viewer, frontal face, selfie, anime, cartoon, 3d render, "
    "watermark, text, logo, deformed hands, extra fingers, blurry, low quality"
)

# Flux 用（詳細プロンプト）
PROMPT_FLUX = (
    "ultra wide banner photograph, natural everyday photo, Japanese teenage girl studying, "
    "student seated on left side of frame, facing right toward desk, medium shot waist up, "
    "left side profile, head tilted down looking at paper and book, not looking at camera, "
    "face turned away, small profile in frame, shallow depth of field with face slightly softer focus than hands and desk, "
    "long straight brown hair with bangs, calm studying pose, "
    "white long sleeve school blouse, open collar, no ribbon, no necktie, no bow, "
    "dark navy pleated skirt, "
    "large window far left, blurred green trees outside, soft daylight, "
    "white sheer curtain visible toward the right side of frame, plain off-white wall, space toward right third, "
    "warm brown wooden desk, open textbook or notebook center, loose white sheet for writing, "
    "right hand holding pen writing, left hand on open book, "
    "black tablet on small wooden stand on right side of desk, "
    "no laptop, no desk lamp, "
    "even soft indoor light, muted colors, moderate depth of field f3.5 to f5.6, "
    "Canon DSLR 50mm, ISO 400, slight natural noise, coherent anatomy, photorealistic snapshot"
)
NEGATIVE_FLUX = (
    "ribbon, bow tie, necktie, scarf at neck, ascot, "
    "desk lamp, table lamp, laptop, desktop monitor, "
    "headphones, headset, earphones, microphone, "
    "looking at viewer, eye contact, frontal portrait, selfie, glamour, fashion editorial, "
    "cinematic rim light, anamorphic, lens flare hero, teal orange grade, movie poster, "
    "sharp facial features, 8k skin pores, subsurface scattering skin, ray traced, octane render, "
    "uncanny, doll face, plastic skin, wax, airbrush, beauty filter, HDR, halos, oversharpened, "
    "CGI, 3d render, anime, cartoon, hyperreal, too perfect, stock photo perfection, "
    "neon oversaturated, fake bokeh, catalog, watermark, PIXTA, shutterstock, text, logo, "
    "messy trash food wrappers, "
    "deformed hands, extra fingers, mangled tablet, heavy blur, low quality, nsfw"
)


def build_workflow_sd15(seed: int) -> dict:
    return {
        "1": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {"ckpt_name": "v1-5-pruned-emaonly.safetensors"},
        },
        "2": {
            "class_type": "CLIPTextEncode",
            "inputs": {"text": PROMPT_SD15, "clip": ["1", 1]},
        },
        "3": {
            "class_type": "CLIPTextEncode",
            "inputs": {"text": NEGATIVE_SD15, "clip": ["1", 1]},
        },
        "4": {
            "class_type": "EmptyLatentImage",
            "inputs": {"width": 1280, "height": 640, "batch_size": 1},
        },
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
                "seed": seed,
                "steps": 28,
                "cfg": 7.5,
                "sampler_name": "dpmpp_2m",
                "scheduler": "karras",
                "denoise": 1.0,
            },
        },
        "6": {
            "class_type": "VAEDecode",
            "inputs": {"samples": ["5", 0], "vae": ["1", 2]},
        },
        "7": {
            "class_type": "SaveImage",
            "inputs": {"images": ["6", 0], "filename_prefix": "hero_banner_sd15"},
        },
    }


def build_workflow_flux(seed: int) -> dict:
    wf = {
        "1": {
            "class_type": "CLIPTextEncode",
            "inputs": {"clip": ["8", 0], "text": PROMPT_FLUX},
        },
        "2": {
            "class_type": "CLIPTextEncode",
            "inputs": {"clip": ["8", 0], "text": NEGATIVE_FLUX},
        },
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["4", 0],
                "positive": ["1", 0],
                "negative": ["2", 0],
                "latent_image": ["5", 0],
                "seed": seed,
                "steps": 4,
                "cfg": 1.0,
                "sampler_name": "euler",
                "scheduler": "simple",
                "denoise": 1.0,
            },
        },
        "4": {
            "class_type": "UNETLoader",
            "inputs": {
                "unet_name": "flux1-schnell/flux1-schnell.safetensors",
                "weight_dtype": "default",
            },
        },
        "5": {
            "class_type": "EmptyLatentImage",
            "inputs": {"width": 1280, "height": 640, "batch_size": 1},
        },
        "6": {
            "class_type": "VAEDecode",
            "inputs": {"samples": ["3", 0], "vae": ["7", 0]},
        },
        "7": {
            "class_type": "VAELoader",
            "inputs": {"vae_name": "ae.safetensors"},
        },
        "8": {
            "class_type": "DualCLIPLoader",
            "inputs": {
                "clip_name1": "clip_l.safetensors",
                "clip_name2": "t5xxl_fp16.safetensors",
                "type": "flux",
                "device": "default",
            },
        },
        "9": {
            "class_type": "SaveImage",
            "inputs": {"images": ["6", 0], "filename_prefix": "hero_banner_flux"},
        },
    }
    return wf


def queue_prompt(prompt_workflow):
    data = json.dumps({"prompt": prompt_workflow}).encode("utf-8")
    req = urllib.request.Request(
        f"{COMFY_URL}/prompt",
        data=data,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def get_history(prompt_id):
    with urllib.request.urlopen(f"{COMFY_URL}/history/{prompt_id}") as r:
        return json.loads(r.read())


def main():
    seed = random.randint(0, 2**32 - 1)
    if HERO_MODEL == "flux":
        workflow = build_workflow_flux(seed)
        label = "Flux Schnell（4 steps）"
        wait_msg = "30〜60秒程度"
        max_wait = 120
    else:
        workflow = build_workflow_sd15(seed)
        label = "Stable Diffusion 1.5（28 steps・Fluxより遅い）"
        wait_msg = "1〜3分かかることがあります"
        max_wait = 200

    print("ComfyUI に接続確認...")
    try:
        urllib.request.urlopen(f"{COMFY_URL}/system_stats", timeout=5)
        print("OK")
    except Exception as e:
        print(f"ComfyUI が起動していません: {e}")
        raise SystemExit(1)

    print(f"モデル: {label}")
    print("画像生成をキューに追加...")
    result = queue_prompt(workflow)
    prompt_id = result["prompt_id"]
    print(f"Prompt ID: {prompt_id}")
    print(f"生成中... ({wait_msg})")

    for i in range(max_wait):
        time.sleep(2)
        history = get_history(prompt_id)
        if prompt_id in history:
            outputs = history[prompt_id].get("outputs", {})
            for _node_id, node_output in outputs.items():
                if "images" in node_output:
                    img = node_output["images"][0]
                    filename = img["filename"]
                    subfolder = img.get("subfolder", "")
                    url = f"{COMFY_URL}/view?filename={filename}&subfolder={subfolder}&type=output"
                    print(f"生成完了: {filename}")
                    print(f"保存中: {OUTPUT_PATH}")
                    with urllib.request.urlopen(url) as resp:
                        with open(OUTPUT_PATH, "wb") as f:
                            shutil.copyfileobj(resp, f)
                    print("hero-banner.png を更新しました！")
                    return
        if i % 5 == 0:
            print(f"  待機中... {i * 2}秒経過")

    print("タイムアウト: 生成に時間がかかりすぎています")


if __name__ == "__main__":
    main()
