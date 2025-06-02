#!/usr/bin/env python3
"""
Test script to check if SpeechBrain model loads correctly
Save as test_model.py and run: python test_model.py
"""

import os
import sys
from pathlib import Path

# Set environment variables
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'

try:
    from speechbrain.inference.speaker import SpeakerRecognition
    print("✓ SpeechBrain imported successfully")
except ImportError as e:
    print(f"✗ Failed to import SpeechBrain: {e}")
    sys.exit(1)

def test_model_loading():
    """Test different model loading strategies"""
    
    print("\n" + "="*50)
    print("TESTING SPEECHBRAIN MODEL LOADING")
    print("="*50)
    
    strategies = [
        {
            "name": "Standard Loading",
            "savedir": "pretrained_models/spkrec-ecapa-voxceleb",
            "run_opts": {"device": "cpu"}
        },
        {
            "name": "Temp Directory",
            "savedir": "temp_model_test",
            "run_opts": {"device": "cpu"}
        }
    ]
    
    for i, strategy in enumerate(strategies, 1):
        print(f"\n{i}. Trying {strategy['name']}...")
        
        try:
            model = SpeakerRecognition.from_hparams(
                source="speechbrain/spkrec-ecapa-voxceleb",
                savedir=strategy["savedir"],
                run_opts=strategy.get("run_opts", {})
            )
            
            print(f"✓ SUCCESS: {strategy['name']} worked!")
            print(f"  Model loaded at: {strategy['savedir']}")
            
            # Quick test
            import torch
            dummy_audio = torch.randn(1, 16000)  # 1 second of random audio
            embedding = model.encode_batch(dummy_audio)
            print(f"  Embedding shape: {embedding.shape}")
            print(f"  Model is working correctly!")
            
            return model
            
        except Exception as e:
            print(f"✗ FAILED: {strategy['name']}")
            print(f"  Error: {str(e)[:100]}...")
            
            if "WinError 1314" in str(e):
                print("  → This is the Windows symlink permission error")
            
            continue
    
    print(f"\n{'='*50}")
    print("ALL STRATEGIES FAILED")
    print("="*50)
    print("Solutions:")
    print("1. Run this script as Administrator")
    print("2. Enable Windows Developer Mode")
    print("3. Use the workaround in the main code")
    return None

if __name__ == "__main__":
    print("Current directory:", os.getcwd())
    print("Python version:", sys.version)
    print("Running as admin:", os.getenv('USERNAME') == 'Administrator')
    
    model = test_model_loading()
    
    if model:
        print(f"\n🎉 SUCCESS! Model is ready to use.")
    else:
        print(f"\n❌ Model loading failed. Check solutions above.")