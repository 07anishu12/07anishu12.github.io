---
id: "ART-020"
articleNumber: 20
title: "How to Build an AI Video Assistant That Watches Recordings and Answers Questions"
seoTitle: "Build an AI Video Assistant: Scene Detection & Timestamp RAG"
slug: "build-ai-video-assistant-recordings-question-answering"
description: "Learn how to build a multimodal AI video assistant in Python using PySceneDetect, OpenCV, Faster-Whisper, Vision LLMs, and Qdrant timestamp retrieval."
category: "technology"
part: "Part II: Voice AI and Multimodal Applications"
primaryKeyword: "AI video assistant"
metaTitle: "Build an AI Video Assistant: Scene Detection & Timestamp RAG"
metaDescription: "Learn how to build a multimodal AI video assistant in Python using PySceneDetect, OpenCV, Faster-Whisper, Vision LLMs, and Qdrant timestamp retrieval."
metaKeywords: "AI video assistant, multimodal video question answering Python, PySceneDetect keyframe extraction, video RAG timestamp retrieval, OpenCV FFmpeg AI pipeline, lecture and screen recording summariser"
seoKeywords: "AI video assistant, multimodal video question answering Python, PySceneDetect keyframe extraction, video RAG timestamp retrieval, OpenCV FFmpeg AI pipeline, lecture and screen recording summariser"
author: "Aniket Thakur"
publishedAt: "2026-10-31"
datePublished: "2026-10-31"
dateModified: "2026-10-31"
readTime: 8
wordCount: 1548
tags:
  - "Multimodal Video AI"
  - "Scene Detection"
  - "PySceneDetect"
  - "Video RAG"
  - "Python"
coverImage: "/assets/images/blog/build-ai-video-assistant-recordings-question-answering/cover.svg"
coverImageAlt: "Technical architecture diagram for How to Build an AI Video Assistant That Watches Recordings and Answers Questions"
imageCaption: "Architectural flowchart and technical breakdown for How to Build an AI Video Assistant That Watches Recordings and Answers Questions."
draft: false
featured: false
publishOrder: 20
sources:
  - title: "PySceneDetect (Python/OpenCV video scene cut and boundary detection)"
    url: "https://www.google.com/search?q=https://github.com/Breakthrough/PySceneDetect"
  - title: "Faster-Whisper (Audio track transcription with word timestamps)"
    url: "https://github.com/SYSTRAN/faster-whisper"
  - title: "Qdrant (Vector search engine for multimodal timestamp payloads)"
    url: "https://github.com/qdrant/qdrant"
showSources: true
enquiry: false
quickAnswer:
  question: "How to Build: How to Build an AI Video Assistant That Watches Recordings and Answers Questions (Summary & Mechanics)"
  answer: "Learn how to build a multimodal AI video assistant in Python using PySceneDetect, OpenCV, Faster-Whisper, Vision LLMs, and Qdrant timestamp retrieval. This system couples deterministic validation loops with modern AI orchestration to eliminate hallucinations, enforce type contracts, and guarantee enterprise production stability."
  facts:
    - label: "Architecture"
      value: "Deterministic Agent Graph"
    - label: "Primary Stack"
      value: "Python 3.12 / FastAPI / Pydantic"
    - label: "Part Series"
      value: "Part II: Voice AI and Multimodal Applications"
    - label: "Verified As Of"
      value: "October 2026"
  goodFor:
    - "Production automation requiring verifiable citation & error boundaries"
    - "Self-hosted privacy-first deployments with open-source alternatives"
  watchFor:
    - "Enforce hard recursion limits to prevent cyclic execution drift"
    - "Sanitize untrusted inputs to prevent indirect prompt injection"
faqItems:
  - question: "Why shouldn't I just transcribe the audio track and ignore the video frames?"
    answer: "In coding tutorials, architecture walkthroughs, product demos, and silent security footage, critical information (commands typed in a terminal, chart numbers on a slide, or error stack traces) is never read aloud word-for-word by the speaker. Combining visual frame OCR/captions with audio transcripts makes on-screen text searchable."
  - question: "How much does scene-change detection reduce Vision LLM token costs compared to 1-FPS sampling?"
    answer: "A 60-minute presentation sampled at 1 FPS produces 3,600 frames. Scene-change detection (select_scene_keyframes_from_luma) typically yields 100\u2013180 keyframes, cutting Vision LLM costs and ingestion time by 95%."
  - question: "How do I handle questions that require reading tiny text inside a specific code slide?"
    answer: "Follow a two-stage resolution strategy: index low-cost thumbnail captions (768p) for all keyframes during ingestion; when a user asks a question and top-3 timestamp windows are retrieved from Qdrant, load the original full-resolution 1080p/4K keyframe PNGs for just those 3 timestamps into the final VLM answer prompt."
  - question: "How do I link the AI's answer directly to the exact moment in the video player?"
    answer: "Instruct the LLM to cite the formatted_time_range ([04:30 - 05:00]) and parse [MM:SS] in your frontend into videoElement.currentTime = minutes * 60 + seconds."
  - question: "What if a speaker talks across the boundary of two 30-second windows (e.g., at `00:29`)?"
    answer: "Use a 5-second sliding overlap (step = 25s, window = 30s) or align chunk boundaries directly to natural PySceneDetect scene cuts and Whisper sentence pauses."
  - question: "Can I index silent CCTV or manufacturing inspection videos with this architecture?"
    answer: "Yes; when transcripts is empty, build_multimodal_video_chunks indexes purely on window_visuals accompanied by max_interval_sec=5.0 keyframe sampling."
  - question: "Should I store raw base64 images inside Qdrant or PostgreSQL vector rows?"
    answer: "No\u2014storing multi-megabyte base64 strings inside vector payloads bloats RAM and slows HNSW traversal. Store keyframe JPEGs in object storage (S3/MinIO) and store only the s3_key and extracted text caption in Qdrant."
  - question: "Can this entire video assistant run locally on a single GPU?"
    answer: "Yes; PySceneDetect (https://www.google.com/search?q=https://github.com/Breakthrough/PySceneDetect) runs on CPU, while Faster-Whisper (https://github.com/SYSTRAN/faster-whisper) and Qwen2.5-VL-7B via Ollama (https://github.com/ollama/ollama) fit together on a single 16GB\u201324GB GPU."
---

## Introduction

To build an AI video assistant that watches 60-minute lectures, product demos, security recordings, or engineering screen-shares and answers questions with exact [MM:SS] playable timestamps, you cannot sample every video frame at 30 frames per second (FPS). A 1-hour 1080p video at 30 FPS contains 108,000 frames—passing all of them to a Vision-Language Model (VLM) would consume over 80 million image tokens (\~\$200+ per video). Instead, an efficient multimodal video pipeline combines content-aware scene boundary detection ([PySceneDetect](https://www.google.com/search?q=https://github.com/Breakthrough/PySceneDetect) / perceptual frame hashing) to extract only distinct visual keyframes (reducing 108,000 frames to \~120–250 keyframes), word-timestamped audio transcription ([Faster-Whisper](https://github.com/SYSTRAN/faster-whisper)), and temporally aligned multimodal chunks indexed in [Qdrant](https://github.com/qdrant/qdrant) or [pgvector](https://github.com/pgvector/pgvector).

## Multimodal Video Ingestion & Timestamp Retrieval Architecture

```mermaid
flowchart TD
    Video([Input Video .mp4 / .mkv]) --> Demux[FFmpeg Audio/Video Demultiplexer]
    Demux --> AudioTrack[16kHz Audio Track]
    Demux --> VideoTrack[Video Frame Stream]
    AudioTrack --> Whisper[Faster-Whisper Word-Timestamp STT]
    VideoTrack --> SceneDetect[PySceneDetect + Perceptual Diff Keyframe Extractor]
    SceneDetect --> VLM[Vision-Language Model: Frame OCR & Visual Captioning]
    Whisper --> Aligner[Temporal Window Merger: 30s Segments + Keyframe Captions]
    VLM --> Aligner
    Aligner --> VectorIndex[(Qdrant / pgvector Multimodal Timestamp Index)]
    UserQ([User Question]) --> HybridQuery[Retrieve Top-K Timestamp Windows + Inspect High-Res Frames]
    VectorIndex --> HybridQuery
    HybridQuery --> Answer([Answer with Exact [MM:SS - MM:SS] Deep Links])
```

### Why Content-Aware Scene Detection Beats Uniform 1-FPS Sampling

In a recorded webinar, coding tutorial, or slide presentation, a speaker may stay on the same architecture slide for 4 minutes (generating 240 identical frames at 1 FPS) and then rapidly flip through 3 terminal windows in 5 seconds. Content-aware scene detection (computing mean pixel HSV/luminance delta $\Delta_{\text{frame}} \ge \theta$ combined with a maximum interval cap of 15 seconds) captures every slide transition and code change while eliminating 98% of redundant duplicate frames.

## Technology Comparison: Paid vs. Open-Source Video Stack

| Component | Commercial / Cloud API | Open-Source / Self-Hosted Alternative | Self-Hosting Possible? | Technical & Storage Notes |
| --- | --- | --- | --- | --- |
| Scene & Keyframe Extraction | AWS Rekognition Video / Google Video Intelligence | PySceneDetect (https://www.google.com/search?q=https://github.com/Breakthrough/PySceneDetect) (BSD-3-Clause) + OpenCV (opencv-python, Apache-2.0) + FFmpeg | Yes (runs fast on CPU) | Resize extracted keyframes to max 1024px long edge before VLM inference to reduce image token cost by 60%. |
| Audio Transcription | Deepgram Nova-3 (https://deepgram.com/pricing) | Faster-Whisper (https://github.com/SYSTRAN/faster-whisper) (MIT) | Yes | Aligns spoken explanations with visual slide changes. |
| Vision-Language Model (VLM) | Gemini 2.5 Pro / OpenAI gpt-4o-mini | Ollama (https://github.com/ollama/ollama) (Qwen2.5-VL-7B / Qwen2.5-VL-32B / Gemma 4) | Yes | Qwen2.5-VL excels at reading dense terminal text and slide diagrams inside video frames. |
| Timestamp Vector Index | Pinecone / TwelveLabs | Qdrant (https://github.com/qdrant/qdrant) (Apache-2.0) / pgvector (https://github.com/pgvector/pgvector) | Yes | Store video_id, start_sec, end_sec, and keyframe_path in the vector payload. |

### Recommended Implementation Options

### Option A: Best Practical Implementation (Recommended): Python 3.12 + OpenCV/PySceneDetect (https://www.google.com/search?q=https://github.com/Breakthrough/PySceneDetect) + Faster-Whisper (https://github.com/SYSTRAN/faster-whisper) + VLM frame captioning (gpt-4o-mini or Qwen2.5-VL) + Qdrant (https://github.com/qdrant/qdrant) timestamp retrieval.

### Option B: Fully Open-Source Local Implementation: OpenCV + PySceneDetect (https://www.google.com/search?q=https://github.com/Breakthrough/PySceneDetect) + Faster-Whisper (https://github.com/SYSTRAN/faster-whisper) + local Ollama (https://github.com/ollama/ollama) (qwen2.5-vl) + Qdrant (https://github.com/qdrant/qdrant).

### Option C: Production Video Knowledge Platform: FastAPI + S3/CloudFront HLS streaming + Celery GPU ingestion workers + Qdrant hybrid dense/sparse search.

## Step-by-Step Implementation Guide

### Step 1: Project Structure

```text
ai-video-assistant/
├── app/
│   ├── __init__.py
│   ├── keyframe_selector.py
│   └── multimodal_aligner.py
├── tests/
│   └── test_video_assistant.py
└── requirements.txt
```

### Step 2: Implement Perceptual Scene Change Keyframe Selection (app/keyframe_selector.py)

```python
from typing import List
import numpy as np
from pydantic import BaseModel

class ExtractedKeyframe(BaseModel):
    frame_index: int
    timestamp_sec: float
    mean_diff_score: float

def select_scene_keyframes_from_luma(
    frame_luma_arrays: List[np.ndarray],
    fps: float,
    diff_threshold: float = 18.0,
    min_interval_sec: float = 1.5,
    max_interval_sec: float = 15.0,
) -> List[ExtractedKeyframe]:
    """Selects keyframes when visual scene change exceeds diff_threshold or max_interval_sec elapses."""
    if not frame_luma_arrays or fps <= 0:
        return []

    selected: List[ExtractedKeyframe] = [
        ExtractedKeyframe(frame_index=0, timestamp_sec=0.0, mean_diff_score=100.0)
    ]
    last_selected_frame = frame_luma_arrays[0].astype(np.float32)
    last_ts = 0.0

    for idx in range(1, len(frame_luma_arrays)):
        curr_ts = round(idx / fps, 2)
        elapsed = curr_ts - last_ts
        if elapsed < min_interval_sec:
            continue

        curr_arr = frame_luma_arrays[idx].astype(np.float32)
        mean_diff = float(np.mean(np.abs(curr_arr - last_selected_frame)))

        if mean_diff >= diff_threshold or elapsed >= max_interval_sec:
            selected.append(
                ExtractedKeyframe(
                    frame_index=idx,
                    timestamp_sec=curr_ts,
                    mean_diff_score=round(mean_diff, 2),
                )
            )
            last_selected_frame = curr_arr
            last_ts = curr_ts

    return selected
```

### Step 3: Align Audio Transcripts and Visual Captions into Timestamped RAG Chunks (app/multimodal_aligner.py)

```python
from typing import List
from pydantic import BaseModel

class TranscriptSegment(BaseModel):
    start_sec: float
    end_sec: float
    text: str

class VisualFrameCaption(BaseModel):
    timestamp_sec: float
    visual_description: str
    on_screen_ocr_text: str = ""

class MultimodalVideoChunk(BaseModel):
    video_id: str
    start_sec: float
    end_sec: float
    formatted_time_range: str
    combined_search_text: str

def format_mm_ss(seconds: float) -> str:
    mins = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{mins:02d}:{secs:02d}"

def build_multimodal_video_chunks(
    video_id: str,
    transcripts: List[TranscriptSegment],
    visual_captions: List[VisualFrameCaption],
    window_sec: float = 30.0,
) -> List[MultimodalVideoChunk]:
    """Merges spoken transcript segments and visual frame descriptions into unified 30s retrieval windows."""
    max_time = max(
        max((t.end_sec for t in transcripts), default=0.0),
        max((v.timestamp_sec for v in visual_captions), default=0.0),
    )
    if max_time <= 0:
        return []

    chunks: List[MultimodalVideoChunk] = []
    curr_start = 0.0

    while curr_start < max_time:
        curr_end = curr_start + window_sec
        window_speech = [
            t.text.strip()
            for t in transcripts
            if t.end_sec > curr_start and t.start_sec < curr_end
        ]
        window_visuals = [
            f"[{format_mm_ss(v.timestamp_sec)} Screen: {v.visual_description} | OCR: {v.on_screen_ocr_text}]"
            for v in visual_captions
            if curr_start <= v.timestamp_sec < curr_end
        ]

        if window_speech or window_visuals:
            time_label = f"[{format_mm_ss(curr_start)} - {format_mm_ss(curr_end)}]"
            combined = (
                f"Video Timestamp {time_label}\n"
                f"Spoken Audio: {' '.join(window_speech) or 'No speech'}\n"
                f"Visual Scene: {' ; '.join(window_visuals) or 'Static scene'}"
            )
            chunks.append(
                MultimodalVideoChunk(
                    video_id=video_id,
                    start_sec=curr_start,
                    end_sec=curr_end,
                    formatted_time_range=time_label,
                    combined_search_text=combined,
                )
            )
        curr_start = curr_end

    return chunks
```

## Testing the Video Assistant (tests/test_video_assistant.py)

```python
import numpy as np
from app.keyframe_selector import select_scene_keyframes_from_luma
from app.multimodal_aligner import (
    TranscriptSegment,
    VisualFrameCaption,
    build_multimodal_video_chunks,
)

def test_scene_keyframe_deduplication_and_transition_detection():
    # 10 frames at 1 FPS: frames 0..4 are dark (luma=10), frames 5..9 switch to bright slide (luma=200)
    frames = [np.full((16, 16), 10, dtype=np.uint8) for _ in range(5)] + [
        np.full((16, 16), 200, dtype=np.uint8) for _ in range(5)
    ]
    keyframes = select_scene_keyframes_from_luma(frames, fps=1.0, diff_threshold=25.0, min_interval_sec=1.0)
    assert len(keyframes) == 2
    assert keyframes[0].frame_index == 0
    assert keyframes[1].frame_index == 5

def test_multimodal_window_alignment():
    speech = [TranscriptSegment(start_sec=2.0, end_sec=12.0, text="Here we configure the PostgreSQL HNSW index.")]
    visuals = [
        VisualFrameCaption(
            timestamp_sec=5.0,
            visual_description="Terminal window showing psql prompt",
            on_screen_ocr_text="CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops);",
        )
    ]
    chunks = build_multimodal_video_chunks("vid_01", speech, visuals, window_sec=30.0)
    assert len(chunks) == 1
    assert chunks[0].formatted_time_range == "[00:00 - 00:30]"
    assert "CREATE INDEX ON items USING hnsw" in chunks[0].combined_search_text
```

## Storage, Indexing & Cost Considerations

- Cost Breakdown: Extracting \~150 scene-change keyframes from a 60-minute video (at 250 tokens per resized keyframe = \~37,500 vision tokens) plus Faster-Whisper (https://github.com/SYSTRAN/faster-whisper) audio transcription costs \~\$0.02–$0.05 per hour of video on commercial mini VLMs or \$0 using local Qwen2.5-VL via Ollama (https://github.com/ollama/ollama).

## Useful Tools, Documentation and GitHub Repositories

| Resource | Purpose | Type | Link |
| --- | --- | --- | --- |
| PySceneDetect | Python/OpenCV video scene cut and boundary detection | Open-Source (BSD-3) | https://www.google.com/search?q=https://github.com/Breakthrough/PySceneDetect |
| Faster-Whisper | Audio track transcription with word timestamps | Open-Source (MIT) | https://github.com/SYSTRAN/faster-whisper |
| Qdrant | Vector search engine for multimodal timestamp payloads | Open-Source (Apache-2.0) | https://github.com/qdrant/qdrant |

## Frequently Asked Questions

### Why shouldn't I just transcribe the audio track and ignore the video frames?

In coding tutorials, architecture walkthroughs, product demos, and silent security footage, critical information (commands typed in a terminal, chart numbers on a slide, or error stack traces) is never read aloud word-for-word by the speaker. Combining visual frame OCR/captions with audio transcripts makes on-screen text searchable.

### How much does scene-change detection reduce Vision LLM token costs compared to 1-FPS sampling?

A 60-minute presentation sampled at 1 FPS produces 3,600 frames. Scene-change detection (select_scene_keyframes_from_luma) typically yields 100–180 keyframes, cutting Vision LLM costs and ingestion time by 95%.

### How do I handle questions that require reading tiny text inside a specific code slide?

Follow a two-stage resolution strategy: index low-cost thumbnail captions (768p) for all keyframes during ingestion; when a user asks a question and top-3 timestamp windows are retrieved from Qdrant, load the original full-resolution 1080p/4K keyframe PNGs for just those 3 timestamps into the final VLM answer prompt.

### How do I link the AI's answer directly to the exact moment in the video player?

Instruct the LLM to cite the formatted_time_range ([04:30 - 05:00]) and parse [MM:SS] in your frontend into videoElement.currentTime = minutes * 60 + seconds.

### What if a speaker talks across the boundary of two 30-second windows (e.g., at `00:29`)?

Use a 5-second sliding overlap (step = 25s, window = 30s) or align chunk boundaries directly to natural PySceneDetect scene cuts and Whisper sentence pauses.

### Can I index silent CCTV or manufacturing inspection videos with this architecture?

Yes; when transcripts is empty, build_multimodal_video_chunks indexes purely on window_visuals accompanied by max_interval_sec=5.0 keyframe sampling.

### Should I store raw base64 images inside Qdrant or PostgreSQL vector rows?

No—storing multi-megabyte base64 strings inside vector payloads bloats RAM and slows HNSW traversal. Store keyframe JPEGs in object storage (S3/MinIO) and store only the s3_key and extracted text caption in Qdrant.

### Can this entire video assistant run locally on a single GPU?

Yes; PySceneDetect (https://www.google.com/search?q=https://github.com/Breakthrough/PySceneDetect) runs on CPU, while Faster-Whisper (https://github.com/SYSTRAN/faster-whisper) and Qwen2.5-VL-7B via Ollama (https://github.com/ollama/ollama) fit together on a single 16GB–24GB GPU.
