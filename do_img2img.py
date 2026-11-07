import json
import urllib.request
import urllib.parse
import time
import shutil
import random
import os

COMFY_URL = "http://127.0.0.1:8188"
INPUT_IMG_PATH = "/Users/tomohiro/Projects/nagata-juku/public/images/hero-banner.png"
COMFY_INPUT_DIR = "/Users/tomohiro/Projects/ComfyUI/input"
OUTPUT_IMG_PATH = "/Users/tomohiro/Projects/nagata-juku/public/images/hero-banner-v4.png"

def run_img2img():
    # Copy input image to ComfyUI input folder
    shutil.copy(INPUT_IMG_PATH, os.path.join(COMFY_INPUT_DIR, "hero-banner-input.png"))

    workflow = {
        "1": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {"ckpt_name": "JuggernautXL_v9.safetensors"}
        },
        "2": {
            "class_type": "LoraLoader",
            "inputs": {
                "lora_name": "lcm-lora-sdxl.safetensors",
                "strength_model": 1.0,
                "strength_clip": 1.0,
                "model": ["1", 0],
                "clip": ["1", 1]
            }
        },
        "3": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "text": "photo, realistic, preserve identity, same person, same face, same pose, same background, change hair to a neat ponytail",
                "clip": ["2", 1]
            }
        },
        "4": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "text": "anime, illustration, cartoon, 3d render, doll, plastic skin, text, watermark",
                "clip": ["2", 1]
            }
        },
        "5": {
            "class_type": "LoadImage",
            "inputs": {
                "image": "hero-banner-input.png",
                "upload": "image"
            }
        },
        "6": {
            "class_type": "VAEEncode",
            "inputs": {
                "pixels": ["5", 0],
                "vae": ["1", 2]
            }
        },
        "7": {
            "class_type": "KSampler",
            "inputs": {
                "seed": random.randint(0, 1000000),
                "steps": 6,
                "cfg": 1.5,
                "sampler_name": "lcm",
                "scheduler": "sgm_uniform",
                "denoise": 0.45,
                "model": ["2", 0],
                "positive": ["3", 0],
                "negative": ["4", 0],
                "latent_image": ["6", 0]
            }
        },
        "8": {
            "class_type": "VAEDecode",
            "inputs": {
                "samples": ["7", 0],
                "vae": ["1", 2]
            }
        },
        "9": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": "hero_banner_img2img",
                "images": ["8", 0]
            }
        }
    }

    print("Queueing prompt...")
    data = json.dumps({"prompt": workflow}).encode("utf-8")
    req = urllib.request.Request(f"{COMFY_URL}/prompt", data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read())
            prompt_id = result["prompt_id"]
            print(f"Prompt ID: {prompt_id}")
    except Exception as e:
        print(f"Failed to queue prompt: {e}")
        return

    # Poll history
    print("Waiting for generation...")
    for _ in range(60):
        time.sleep(2)
        try:
            with urllib.request.urlopen(f"{COMFY_URL}/history/{prompt_id}") as response:
                history = json.loads(response.read())
                if prompt_id in history:
                    outputs = history[prompt_id].get("outputs", {})
                    for node_id, output in outputs.items():
                        if "images" in output:
                            img_info = output["images"][0]
                            filename = img_info["filename"]
                            subfolder = img_info.get("subfolder", "")
                            url = f"{COMFY_URL}/view?filename={filename}&subfolder={subfolder}&type=output"
                            print(f"Downloading from {url}...")
                            with urllib.request.urlopen(url) as img_resp:
                                with open(OUTPUT_IMG_PATH, "wb") as f:
                                    shutil.copyfileobj(img_resp, f)
                            print(f"Successfully generated and saved to {OUTPUT_IMG_PATH}")
                            return
        except Exception as e:
            pass

    print("Timeout or failed.")

if __name__ == "__main__":
    run_img2img()
