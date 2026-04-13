# Media MVP

Yerelde çalışan basit bir Flask uygulaması. Kullanıcının yüklediği veya doğrudan dosya URL'si verdiği izinli medya dosyalarını `MP3` ya da `MP4` formatına dönüştürür.

## Kapsam

Bu proje üçüncü taraf platformlardan toplu video indirme amacıyla değil, kullanıcıya ait veya kullanım izni olan medya dosyalarının dönüştürülmesi için hazırlanmıştır.

## Özellikler

- Dosya yükleme ile dönüştürme
- Doğrudan medya dosyası URL'si ile dönüştürme (`.mp4`, `.mp3`, `.webm` vb.)
- `MP3` veya `MP4` çıktı
- Basit web arayüzü
- Yerelde çalıştırma için sade yapı

## Gereksinimler

- Python 3.10+
- `ffmpeg`

## ffmpeg kurulumu

### macOS

```bash
brew install ffmpeg
```

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install -y ffmpeg
```

### Windows

- `ffmpeg` indir
- `bin` klasörünü PATH'e ekle
- Yeni terminal aç

## Kurulum

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Çalıştırma

```bash
python app.py
```

Tarayıcıda aç:

```text
http://127.0.0.1:5000
```

## Kullanım

1. Ana sayfayı aç
2. Kaynak tipi seç:
   - `Dosya yükle`
   - `Doğrudan medya URL'si`
3. Çıktı formatını seç (`MP3` veya `MP4`)
4. `Dönüştür` düğmesine bas
5. Sonuç sayfasından dosyayı indir

## Desteklenen girişler

### Dosya yükleme

- mp4
- mov
- m4a
- mp3
- wav
- webm
- ogg
- aac

### Doğrudan URL

Yalnızca doğrudan dosya linkleri desteklenir. Örnek:

```text
https://example.com/media/video.mp4
https://cdn.example.com/audio/file.mp3
```

Sayfa URL'leri desteklenmez.

## Notlar

- Yüklenen ara dosyalar işlem sonunda silinir.
- Çıktılar `outputs/` klasörüne yazılır.
- Varsayılan maksimum yükleme boyutu `512 MB`.

## Sonraki adımlar

- Job queue ekleme
- Kullanıcı hesabı ve kota sistemi
- Email ile teslim akışı
- Object storage entegrasyonu
- Landing page ve analitik

## Proje yapısı

```text
media-mvp/
├── app.py
├── requirements.txt
├── README.md
├── uploads/
├── outputs/
└── app/
    └── templates/
        ├── index.html
        └── result.html
```
