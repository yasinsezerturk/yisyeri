#!/usr/bin/env python3
"""Regenerate the web-sized derivatives without changing original media."""

from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src/assets"
OUTPUT = ASSETS / "optimized"
PUBLIC = ROOT / "public"
TOOLS = {name: shutil.which(name) for name in ("ffmpeg", "magick", "cwebp")}
if not all(TOOLS.values()):
    raise SystemExit("Install ffmpeg, ImageMagick, and cwebp before regenerating media.")
OUTPUT.mkdir(parents=True, exist_ok=True)


def run(*args):
    subprocess.run([str(arg) for arg in args], check=True)


images = [
    ("logos/Yesil_isyeri_logo1.png", "site-logo.webp", "256x256>", 90),
    ("logos/Yesil_isyeri_logo2.png", "site-wordmark.webp", "512x512>", 90),
    ("logos/Yesil_isyeri_logo.png", "yesil-isyeri-logo.webp", "512x512>", 90),
    ("logos/Belediye_Logo2.png", "belediye-logo.webp", "600x600>", 90),
    ("images/logo_yazi3.png", "white-wordmark.webp", "600x600>", 90),
    ("images/tescil.png", "tescil.webp", "1200x1200>", 90),
    ("images/HasanAkgun.png", "president.webp", "900x900>", 85),
    ("images/about/Image3.jpg", "about-3.webp", "900x900>", 83),
]
for source, target, geometry, quality in images:
    run(TOOLS["magick"], ASSETS / source, "-resize", geometry,
        "-strip", "-quality", quality, OUTPUT / target)
for index in (1, 2):
    run(TOOLS["cwebp"], "-quiet", "-q", 75, "-m", 6,
        ASSETS / f"images/about/Image{index}.jpg", "-o", OUTPUT / f"about-{index}.webp")

for size, target in ((32, "favicon-32.png"), (180, "apple-touch-icon.png"),
                     (192, "icon-192.png"), (512, "icon-512.png")):
    run(TOOLS["magick"], ASSETS / "logos/Yesil_isyeri_logo.png", "-resize",
        f"{size}x{size}>", "-background", "none", "-gravity", "center", "-extent",
        f"{size}x{size}", "-strip", "-define", "png:compression-level=9", PUBLIC / target)

movies = [
    ("basindabiz.mp4", "show-news.mp4", 27),
    ("2026-255_Ruh-Mars_Lojstik_Uluslararasi_Tasimacilik.mp4", "mars-news.mp4", 27),
    ("yisyeriVideo.mp4", "yesil-isyeri-film.mp4", 28),
]


def encode_movie(movie):
    source, target, crf = movie
    run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "warning", "-y",
        "-i", ASSETS / "videos" / source, "-map", "0:v:0", "-map", "0:a:0?",
        "-vf", "scale='min(1280,iw)':-2", "-c:v", "libx264", "-threads", 2,
        "-preset", "medium", "-crf", crf, "-pix_fmt", "yuv420p", "-profile:v",
        "high", "-level:v", "3.1", "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart", OUTPUT / target)


with ThreadPoolExecutor(max_workers=3) as pool:
    list(pool.map(encode_movie, movies))
run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "error", "-y", "-i",
    ASSETS / "videos/yisyeriVideo.mp4", "-t", 12, "-an", "-vf",
    "fps=24,scale='min(1280,iw)':-2", "-c:v", "libx264", "-threads", 2,
    "-preset", "medium", "-crf", 28, "-pix_fmt", "yuv420p", "-profile:v",
    "high", "-level:v", "3.1", "-movflags", "+faststart", OUTPUT / "hero-loop.mp4")

with tempfile.TemporaryDirectory(prefix="yisyeri-posters-") as temporary:
    for key, source, moment in (("hero", "yisyeriVideo.mp4", 2),
                                 ("show", "basindabiz.mp4", 16),
                                 ("mars", movies[1][0], 16)):
        frame = Path(temporary) / f"{key}.png"
        run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "error", "-y", "-ss",
            moment, "-i", ASSETS / "videos" / source, "-frames:v", 1,
            "-vf", "scale='min(960,iw)':-2", frame)
        run(TOOLS["cwebp"], "-quiet", "-q", 82, "-m", 6, frame,
            "-o", OUTPUT / f"{key}-poster.webp")

for asset in sorted(OUTPUT.iterdir()):
    print(f"{asset.relative_to(ROOT)}: {asset.stat().st_size:,} bytes")
