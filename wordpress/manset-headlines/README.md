# Manşet Başlıklar (WordPress Eklentisi)

Elementor içinde widget olarak kullanılabilen ve Elementor olmadan da shortcode/klasik widget ile çalışan manşet eklentisi.

## Kurulum

1. `wordpress/manset-headlines` klasörünü zipleyin.
2. WordPress panelinde **Eklentiler > Yeni Ekle > Eklenti Yükle** adımıyla zip dosyasını yükleyin.
3. Eklentiyi etkinleştirin.

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
