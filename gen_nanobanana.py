import json
import urllib.request
import time
import os
import shutil

COMFY_URL = "http://127.0.0.1:8188"
OUTPUT_IMG_PATH = "/Users/tomohiro/Projects/nagata-juku/public/images/hero-banner-nanobanana-wide.png"

def run_nanobanana():
    # Prompt for the wide banner
    prompt = (
        "ultra wide 16:9 aspect ratio landscape banner photo. A bright, modern Japanese cram school classroom. "
        "A friendly Japanese male teacher is individually tutoring a high school student girl at a desk. "
        "The girl has brown hair tied in a neat ponytail. They are smiling and looking at a notebook together. "
        "Natural sunlight, warm and welcoming atmosphere."
    )

    # Workflow using the GeminiImageNode (Nano Banana)
    workflow = {
        "1": {
            "class_type": "GeminiImageNode",
            "inputs": {
                "prompt": prompt,
                "model": "gemini-2.5-flash-image",
                "seed": 42,
                "aspect_ratio": "16:9",
                "response_modalities": "IMAGE"
            }
        },
        "2": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": "nanobanana_wide",
                "images": ["1", 0]
            }
        }
    }

    print("Queueing nanobanana prompt...")
    data = json.dumps({"prompt": workflow}).encode("utf-8")
    req = urllib.request.Request(f"{COMFY_URL}/prompt", data=data, headers={"Content-Type": "application/json"})
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read())
            prompt_id = result["prompt_id"]
            print(f"Prompt ID: {prompt_id}")
    except Exception as e:
        print(f"Failed to queue: {e}")
        return

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
                            url = f"{COMFY_URL}/view?filename={filename}&type=output"
                            print(f"Downloading from {url}...")
                            with urllib.request.urlopen(url) as img_resp:
                                with open(OUTPUT_IMG_PATH, "wb") as f:
                                    shutil.copyfileobj(img_resp, f)
                            print(f"Saved to {OUTPUT_IMG_PATH}")
                            return
        except Exception as e:
            pass
    print("Timeout.")

if __name__ == "__main__":
    run_nanobanana()
