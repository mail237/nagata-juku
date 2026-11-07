"""
既存のポニーテール画像をRealESRGAN 4xでアップスケールするだけ
"""
import json
import urllib.request
import time
import shutil

COMFY_URL = "http://127.0.0.1:8188"
INPUT_IMG = "ponytail-to-upscale.png"
INPUT_SRC = "/Users/tomohiro/Projects/nagata-juku/public/images/hero-banner-perfect-ponytail.png"
COMFY_INPUT = f"/Users/tomohiro/Projects/ComfyUI/input/{INPUT_IMG}"
OUTPUT_PATH = "/Users/tomohiro/Projects/nagata-juku/public/images/hero-banner-hq.png"

def build_workflow():
    return {
        "1": {
            "class_type": "LoadImage",
            "inputs": {"image": INPUT_IMG, "upload": "image"}
        },
        "2": {
            "class_type": "UpscaleModelLoader",
            "inputs": {"model_name": "RealESRGAN_x4plus.pth"}
        },
        "3": {
            "class_type": "ImageUpscaleWithModel",
            "inputs": {
                "upscale_model": ["2", 0],
                "image": ["1", 0]
            }
        },
        # Scale to 2x original (2752x1536) - sharp and clean
        "4": {
            "class_type": "ImageScale",
            "inputs": {
                "image": ["3", 0],
                "upscale_method": "lanczos",
                "width": 2752,
                "height": 1536,
                "crop": "disabled"
            }
        },
        "5": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": "hero_upscaled",
                "images": ["4", 0]
            }
        }
    }

def main():
    shutil.copy(INPUT_SRC, COMFY_INPUT)
    print(f"Input: {INPUT_SRC}")

    workflow = build_workflow()
    data = json.dumps({"prompt": workflow}).encode("utf-8")
    req = urllib.request.Request(f"{COMFY_URL}/prompt", data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read())
            prompt_id = result["prompt_id"]
            print(f"Prompt ID: {prompt_id}")
    except Exception as e:
        print(f"Failed: {e}")
        return

    print("Upscaling...")
    for i in range(60):
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
                            url = f"{COMFY_URL}/view?filename={filename}&type=output"
                            print(f"Downloading: {filename}")
                            with urllib.request.urlopen(url) as img_resp:
                                with open(OUTPUT_PATH, "wb") as f:
                                    shutil.copyfileobj(img_resp, f)
                            print(f"Done! Saved to {OUTPUT_PATH}")
                            return
        except Exception:
            pass
    print("Timeout.")

if __name__ == "__main__":
    main()
