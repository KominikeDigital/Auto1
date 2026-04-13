import mimetypes
import os
import subprocess
import uuid
from pathlib import Path
from urllib.parse import urlparse

import requests
from flask import (
    Flask,
    flash,
    redirect,
    render_template,
    request,
    send_from_directory,
    url_for,
)
from werkzeug.utils import secure_filename

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = BASE_DIR / "uploads"
OUTPUT_FOLDER = BASE_DIR / "outputs"
MAX_FILE_SIZE = 512 * 1024 * 1024  # 512 MB

ALLOWED_EXTENSIONS = {"mp4", "mov", "m4a", "mp3", "wav", "webm", "ogg", "aac"}
SUPPORTED_OUTPUTS = {"mp3", "mp4"}

UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

app = Flask(__name__, template_folder="app/templates")
app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)
app.config["OUTPUT_FOLDER"] = str(OUTPUT_FOLDER)
app.config["MAX_CONTENT_LENGTH"] = MAX_FILE_SIZE
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret-change-me")


def is_allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_extension_from_url(url: str) -> str:
    parsed = urlparse(url)
    suffix = Path(parsed.path).suffix.lower().lstrip(".")
    return suffix


def download_file(url: str) -> Path:
    ext = get_extension_from_url(url)
    if ext and ext not in ALLOWED_EXTENSIONS:
        raise ValueError("URL uzantısı desteklenmiyor.")

    file_stem = f"download_{uuid.uuid4().hex}"
    temp_name = f"{file_stem}.{ext}" if ext else file_stem
    temp_path = UPLOAD_FOLDER / temp_name

    with requests.get(url, stream=True, timeout=30) as response:
        response.raise_for_status()

        if not ext:
            content_type = response.headers.get("Content-Type", "").split(";")[0].strip()
            guessed_ext = mimetypes.guess_extension(content_type) if content_type else None
            ext = guessed_ext.lstrip(".") if guessed_ext else None
            if ext == "x-m4a":
                ext = "m4a"
            if ext not in ALLOWED_EXTENSIONS:
                raise ValueError("URL için dosya uzantısı doğrulanamadı veya desteklenmiyor.")
            temp_path = UPLOAD_FOLDER / f"{file_stem}.{ext}"

        total = 0
        with temp_path.open("wb") as f:
            for chunk in response.iter_content(chunk_size=1024 * 1024):
                if not chunk:
                    continue
                total += len(chunk)
                if total > MAX_FILE_SIZE:
                    raise ValueError("Dosya boyutu 512 MB sınırını aşıyor.")
                f.write(chunk)

    return temp_path


def convert_media(input_path: Path, output_format: str) -> Path:
    if output_format not in SUPPORTED_OUTPUTS:
        raise ValueError("Geçersiz çıktı formatı.")

    output_name = f"{input_path.stem}_{uuid.uuid4().hex}.{output_format}"
    output_path = OUTPUT_FOLDER / output_name

    cmd = ["ffmpeg", "-y", "-i", str(input_path)]
    if output_format == "mp3":
        cmd += ["-vn", "-acodec", "libmp3lame", "-q:a", "2"]
    else:
        cmd += ["-c:v", "libx264", "-c:a", "aac", "-movflags", "+faststart"]
    cmd.append(str(output_path))

    process = subprocess.run(cmd, capture_output=True, text=True)
    if process.returncode != 0:
        if output_path.exists():
            output_path.unlink(missing_ok=True)
        error_preview = process.stderr[-500:] if process.stderr else "Bilinmeyen ffmpeg hatası"
        raise RuntimeError(f"Dönüştürme başarısız: {error_preview}")

    return output_path


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/convert", methods=["POST"])
def convert():
    source_type = request.form.get("source_type", "upload")
    output_format = request.form.get("output_format", "mp3").lower()

    input_path: Path | None = None
    created_temp_file = False

    try:
        if output_format not in SUPPORTED_OUTPUTS:
            raise ValueError("Lütfen geçerli bir çıktı formatı seçin (MP3/MP4).")

        if source_type == "upload":
            uploaded = request.files.get("file")
            if not uploaded or not uploaded.filename:
                raise ValueError("Lütfen bir dosya seçin.")

            filename = secure_filename(uploaded.filename)
            if not is_allowed_file(filename):
                raise ValueError("Desteklenmeyen dosya türü.")

            unique_name = f"{Path(filename).stem}_{uuid.uuid4().hex}.{Path(filename).suffix.lstrip('.').lower()}"
            input_path = UPLOAD_FOLDER / unique_name
            uploaded.save(input_path)
            created_temp_file = True

        elif source_type == "url":
            media_url = (request.form.get("media_url") or "").strip()
            if not media_url:
                raise ValueError("Lütfen doğrudan medya URL'si girin.")
            if not media_url.startswith(("http://", "https://")):
                raise ValueError("URL http:// veya https:// ile başlamalı.")
            input_path = download_file(media_url)
            created_temp_file = True
        else:
            raise ValueError("Geçersiz kaynak tipi.")

        output_path = convert_media(input_path, output_format)

        return render_template(
            "result.html",
            filename=output_path.name,
            output_format=output_format.upper(),
        )

    except requests.RequestException:
        flash("URL üzerinden dosya indirilemedi. Linkin doğrudan dosya URL'si olduğundan emin olun.")
    except (ValueError, RuntimeError) as exc:
        flash(str(exc))
    except Exception:
        flash("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.")
    finally:
        if created_temp_file and input_path and input_path.exists():
            input_path.unlink(missing_ok=True)

    return redirect(url_for("index"))


@app.route("/download/<path:filename>", methods=["GET"])
def download(filename: str):
    safe_name = secure_filename(filename)
    file_path = OUTPUT_FOLDER / safe_name
    if not file_path.exists():
        flash("Dosya bulunamadı.")
        return redirect(url_for("index"))

    return send_from_directory(app.config["OUTPUT_FOLDER"], safe_name, as_attachment=True)


@app.errorhandler(413)
def file_too_large(_error):
    flash("Maksimum yükleme boyutu 512 MB.")
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
