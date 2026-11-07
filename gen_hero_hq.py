"""
永田塾 ヒーローバナー img2img 高品質版
元画像をベースに髪型だけ変更（低デノイズ + 高品質サンプラー）
+ RealESRGAN 4x アップスケール
"""
import json
import urllib.request
import time
import shutil
import random
import os

COMFY_URL = "http://127.0.0.1:8188"
INPUT_IMG = "hero-banner-input.png"
INPUT_SRC = "/Users/tomohiro/Projects/nagata-juku/public/images/hero-banner.png"
COMFY_INPUT = f"/Users/tomohiro/Projects/ComfyUI/input/{INPUT_IMG}"
OUTPUT_PATH = "/Users/tomohiro/Projects/nagata-juku/public/images/hero-banner-hq.png"

PROMPT_POSITIVE = (
    "photo, realistic, same person, same pose, same background, same composition, "
    "Japanese high school girl studying at desk, "
    "brown hair neatly tied in a ponytail with hair tie, ponytail hairstyle, "
    "white short sleeve school blouse, dark navy pleated skirt, "
    "warm wooden desk, window with green trees, soft natural daylight, "
    "photorealistic, sharp focus, high quality, 8k"
)

PROMPT_NEGATIVE = (
    "anime, illustration, cartoon, 3d render, doll, plastic skin, "
    "text, watermark, blurry, low quality, deformed, ugly, bad anatomy, "
    "extra fingers, extra limbs, duplicate, clone, two people, ghost image"
)

def build_workflow():
    return {
        # Checkpoint (no LCM LoRA for higher quality)
        "1": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {
                "ckpt_name": "JuggernautXL_v9.safetensors"
            }
        },
        # Positive prompt
        "2": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "text": PROMPT_POSITIVE,
                "clip": ["1", 1]
            }
        },
        # Negative prompt
        "3": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "text": PROMPT_NEGATIVE,
                "clip": ["1", 1]
            }
        },
        # Load original image
        "4": {
            "class_type": "LoadImage",
            "inputs": {
                "image": INPUT_IMG,
                "upload": "image"
            }
        },
        # VAE Encode (image to latent)
        "5": {
            "class_type": "VAEEncode",
            "inputs": {
                "pixels": ["4", 0],
                "vae": ["1", 2]
            }
        },
        # KSampler - LOW denoise to preserve original, high quality sampler
        "6": {
            "class_type": "KSampler",
            "inputs": {
                "seed": random.randint(0, 2**32),
                "steps": 25,
                "cfg": 7.0,
                "sampler_name": "dpmpp_2m",
                "scheduler": "karras",
                "denoise": 0.35,  # Low - only changes hair, preserves everything else
                "model": ["1", 0],
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["5", 0]
            }
        },
        # VAE Decode
        "7": {
            "class_type": "VAEDecode",
            "inputs": {
                "samples": ["6", 0],
                "vae": ["1", 2]
            }
        },
        # Upscale model loader
        "8": {
            "class_type": "UpscaleModelLoader",
            "inputs": {
                "model_name": "RealESRGAN_x4plus.pth"
            }
        },
        # 4x upscale
        "9": {
            "class_type": "ImageUpscaleWithModel",
            "inputs": {
                "upscale_model": ["8", 0],
                "image": ["7", 0]
            }
        },
        # Scale to 2x original (2752x1536)
        "10": {
            "class_type": "ImageScale",
            "inputs": {
                "image": ["9", 0],
                "upscale_method": "lanczos",
                "width": 2752,
                "height": 1536,
                "crop": "disabled"
            }
        },
        # Save
        "11": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": "hero_banner_img2img_hq",
                "images": ["10", 0]
            }
        }
    }

def main():
    # Copy input image
    shutil.copy(INPUT_SRC, COMFY_INPUT)
    print(f"Copied input image to {COMFY_INPUT}")

    workflow = build_workflow()
    print("Queueing img2img generation...")
    data = json.dumps({"prompt": workflow}).encode("utf-8")
    req = urllib.request.Request(
        f"{COMFY_URL}/prompt",
        data=data,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read())
            prompt_id = result["prompt_id"]
            print(f"Prompt ID: {prompt_id}")
    except Exception as e:
        print(f"Failed: {e}")
        if hasattr(e, 'read'):
            print(f"Details: {e.read().decode()}")
        return

    print("Waiting for generation...")
    for i in range(180):
        time.sleep(2)
        if i % 15 == 0:
            print(f"  ... {i*2}s elapsed")
        try:
            with urllib.request.urlopen(f"{COMFY_URL}/history/{prompt_id}") as response:
                history = json.loads(response.read())
                if prompt_id in history:
                    status = history[prompt_id].get("status", {})
                    if status.get("status_str") == "error":
                        print(f"ERROR: {status.get('messages', [])}")
                        return
                    outputs = history[prompt_id].get("outputs", {})
                    for node_id, output in outputs.items():
                        if "images" in output:
                            img_info = output["images"][0]
                            filename = img_info["filename"]
                            subfolder = img_info.get("subfolder", "")
                            url = f"{COMFY_URL}/view?filename={filename}&subfolder={subfolder}&type=output"
                            print(f"Downloading: {filename}")
                            with urllib.request.urlopen(url) as img_resp:
                                with open(OUTPUT_PATH, "wb") as f:
                                    shutil.copyfileobj(img_resp, f)
                            print(f"Saved to {OUTPUT_PATH}")
                            return
        except Exception:
            pass
    print("Timeout.")

if __name__ == "__main__":
    main()
