# Manşet Başlıklar (WordPress Eklentisi)

Elementor içinde widget olarak kullanılabilen ve Elementor olmadan da shortcode/klasik widget ile çalışan manşet eklentisi.

## Kurulum (Hata almamak için)

WordPress'in **"Geçerli bir eklenti bulunamadı"** hatası genelde zip içinde klasör seviyesi yanlış olduğunda olur.

### Doğru zip yapısı
Zip dosyası açıldığında en üstte doğrudan şu klasör görünmelidir:

- `manset-headlines/`
  - `manset-headlines.php`
  - `includes/...`
  - `assets/...`

> `wordpress/manset-headlines/...` şeklinde **ekstra bir üst klasör** kalırsa WordPress eklentiyi algılamaz.

### Hazır paket
Bu repo içinde hazır kurulum paketi:

- `dist/manset-headlines.zip`

WordPress panelinden:
- **Eklentiler > Yeni Ekle > Eklenti Yükle > dist/manset-headlines.zip**

## Kullanım

### 1) Elementor ile
- Elementor editörde **Manşet Başlıklar** widget'ını sürükleyin.
- Başlıklar listesini widget içinden yönetin.

### 2) Elementor olmadan
- **Ayarlar > Manşet Başlıklar** sayfasında satır satır `Başlık|Link` formatında manşetleri ekleyin.
- İçerikte shortcode kullanın:
  - `[manset]`
  - `[manset label="Son Dakika" speed="2500"]`
- İsterseniz **Görünüm > Bileşenler** altından **Manşet Başlıklar** bileşenini de ekleyebilirsiniz.

## Not
- Elementor aktif değilse widget kaydolmaz; eklenti kalan özellikleriyle çalışmaya devam eder.
