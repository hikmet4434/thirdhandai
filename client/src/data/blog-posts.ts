// Third Hand AI — Blog içeriği (statik, Türkçe).
// Tamamen kendi kendine yeten içerik; veritabanı gerektirmez, deploy sonrası
// anında çalışır. Yeni yazı eklemek için bu diziye bir öğe ekleyin.
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO (YYYY-MM-DD)
  readMinutes: number;
  excerpt: string;
  coverImage: string;
  tags: string[];
  content: string; // HTML
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "yapay-zeka-ajanlari-2026",
    title: "Yapay Zeka Ajanları (AI Agents): 2026'nın En Büyük Trendi",
    category: "Yapay Zeka",
    date: "2026-06-28",
    readMinutes: 6,
    excerpt:
      "Sadece soru cevaplayan chatbot'lar geride kaldı. 2026'da işletmeler, görevleri baştan sona kendi tamamlayan otonom yapay zeka ajanlarına geçiyor. Peki bu ajanlar ne yapıyor ve şirketinize nasıl değer katıyor?",
    coverImage: img("1677442136019-21780ecad995"),
    tags: ["AI Agent", "Otonom Yapay Zeka", "Otomasyon", "2026 Trendleri"],
    content: `
<p>Son iki yılda yapay zeka, "soru sorduğunuzda cevap veren" bir araçtan, "bir hedef verdiğinizde o hedefe ulaşmak için adımları kendi planlayıp uygulayan" bir sisteme dönüştü. Bu sistemlere <strong>yapay zeka ajanları (AI agents)</strong> diyoruz ve 2026'nın en çok konuşulan başlığı hâline geldiler.</p>

<h2>Chatbot ile ajan arasındaki fark</h2>
<p>Klasik bir chatbot tek bir mesaja tek bir yanıt üretir. Bir ajan ise bir <em>amaç</em> alır ("bu haftaki siparişleri kontrol et, geciken kargoları tespit et ve müşterilere bilgilendirme mesajı gönder") ve bu amacı gerçekleştirmek için birden fazla adımı sırayla yürütür: veriyi çeker, karar verir, araçları kullanır ve sonucu raporlar.</p>

<figure><img class="blog-img" src="${img("1531746790731-6c087fecd65a")}" alt="Yapay zeka asistanı ekranı" loading="lazy"/><figcaption>Modern ajanlar; e-posta, CRM ve mesajlaşma araçlarını kendisi kullanabiliyor.</figcaption></figure>

<h2>İşletmeler ajanları nerede kullanıyor?</h2>
<p>En yaygın kullanım alanları operasyonel yükü azaltan tekrarlı işler:</p>
<ul>
  <li><strong>Satış öncesi:</strong> Gelen talepleri niteleyen, uygun teklifi hazırlayan ajanlar.</li>
  <li><strong>Müşteri desteği:</strong> Sık sorulan konuları çözen, çözemediğini doğru ekibe yönlendiren ajanlar.</li>
  <li><strong>Operasyon:</strong> Fatura, sipariş ve stok gibi verileri izleyip anormallikte uyaran ajanlar.</li>
</ul>

<figure><img class="blog-img" src="${img("1518770660439-4636190af475")}" alt="Otomasyon ve kod" loading="lazy"/><figcaption>Ajanlar, mevcut sistemlerinize entegre olduğunda gerçek değer üretir.</figcaption></figure>

<h2>Başlarken dikkat edilmesi gerekenler</h2>
<p>Bir ajanı canlıya almadan önce üç şeyi netleştirin: <strong>hangi görevi</strong> devralacak, <strong>hangi araçlara</strong> erişecek ve <strong>hangi durumda insana</strong> devredecek. Küçük ve ölçülebilir bir görevle başlamak, güveni inşa etmenin en sağlıklı yoludur.</p>

<p>Third Hand olarak, şirketinizin iş akışını dinleyip size özel ajanlar tasarlıyoruz. Amaç, ekibinizi tekrarlı işlerden kurtarıp değer üreten işe odaklamak.</p>
`,
  },
  {
    slug: "kobiler-icin-yapay-zeka-otomasyonu",
    title: "KOBİ'ler İçin Yapay Zeka ile İş Süreçleri Otomasyonu",
    category: "Otomasyon",
    date: "2026-06-15",
    readMinutes: 5,
    excerpt:
      "Yapay zeka artık sadece büyük şirketlerin ayrıcalığı değil. Doğru kurgulanmış otomasyonlarla KOBİ'ler de teklif, fatura ve raporlama gibi işlerde ciddi zaman ve maliyet tasarrufu sağlıyor.",
    coverImage: img("1553877522-43269d4ea984"),
    tags: ["KOBİ", "Otomasyon", "Verimlilik", "Dijital Dönüşüm"],
    content: `
<p>Küçük ve orta ölçekli işletmeler için en değerli kaynak zamandır. Yapay zeka destekli otomasyon, tam da bu noktada devreye girerek ekibin en çok vaktini alan tekrarlı işleri devralır.</p>

<h2>Nereden başlamalı?</h2>
<p>En iyi başlangıç noktası, "sık yapılan ve kurallı" işlerdir. Bunlar tahmin edilebilir oldukları için otomatikleştirilmeleri de kolaydır:</p>
<ul>
  <li>Teklif ve sözleşme hazırlama</li>
  <li>Fatura oluşturma ve takip</li>
  <li>Gelen e-postaların sınıflandırılması</li>
  <li>Haftalık raporların derlenmesi</li>
</ul>

<figure><img class="blog-img" src="${img("1554224155-6726b3ff858f")}" alt="Fatura ve finans otomasyonu" loading="lazy"/><figcaption>Faturalama gibi kurallı işler otomasyona en uygun ilk adımlardır.</figcaption></figure>

<h2>Somut kazanımlar</h2>
<p>Doğru kurgulanmış bir otomasyon, bir çalışanın günde 1-2 saatini geri kazandırabilir. Bu, yılda haftalarca mesai anlamına gelir. Ayrıca insan kaynaklı hatalar (yanlış tutar, unutulan takip) belirgin şekilde azalır.</p>

<figure><img class="blog-img" src="${img("1552664730-d307ca884978")}" alt="Ekip verimliliği" loading="lazy"/><figcaption>Otomasyon, ekibi işten çıkarmaz; onları daha değerli işlere yönlendirir.</figcaption></figure>

<h2>Küçük başla, ölçerek büyüt</h2>
<p>Tüm süreçleri bir anda otomatikleştirmeye çalışmak yerine tek bir süreçle başlayın, sonucu ölçün ve işe yaradığını gördükçe yayın. Bu yaklaşım hem riski düşürür hem de ekibin yeni düzene alışmasını kolaylaştırır.</p>
`,
  },
  {
    slug: "uretken-yapay-zeka-icerik",
    title: "Üretken Yapay Zeka ile İçerik Üretimi: Fırsatlar ve Sınırlar",
    category: "Üretken AI",
    date: "2026-05-30",
    readMinutes: 6,
    excerpt:
      "Metin, görsel ve videoyu saniyeler içinde üreten üretken yapay zeka, pazarlama ekiplerinin hızını katladı. Ama her şeyi otomatiğe bağlamadan önce bilmeniz gereken sınırlar da var.",
    coverImage: img("1620712943543-bcc4688e7485"),
    tags: ["Üretken AI", "İçerik Pazarlama", "Yaratıcılık"],
    content: `
<p>Üretken yapay zeka (generative AI); yazı, görsel, ses ve video gibi içerikleri sıfırdan üretebilen modelleri tanımlar. Bir pazarlama ekibinin günler süren işini saatlere indirebilir — ama doğru kullanıldığında.</p>

<h2>Nerede parlıyor?</h2>
<ul>
  <li><strong>İlk taslak:</strong> Blog yazısı, ürün açıklaması veya reklam metni için hızlı başlangıç.</li>
  <li><strong>Varyasyon üretme:</strong> Aynı mesajın onlarca farklı versiyonunu test etmek.</li>
  <li><strong>Görsel üretimi:</strong> Kampanyalar için özgün görseller ve konseptler.</li>
</ul>

<figure><img class="blog-img" src="${img("1655720828018-edd2daec9349")}" alt="Üretken yapay zeka görselleri" loading="lazy"/><figcaption>Üretken modeller, saniyeler içinde onlarca yaratıcı varyasyon üretebilir.</figcaption></figure>

<h2>Sınırları ve riskleri</h2>
<p>Üretken modeller bazen kendinden emin bir dille yanlış bilgi üretebilir ("halüsinasyon"). Bu yüzden özellikle sayısal veriler, hukuki metinler ve teknik iddialar mutlaka bir insan tarafından doğrulanmalıdır. Ayrıca marka sesinin tutarlılığı için modele net yönergeler vermek şarttır.</p>

<figure><img class="blog-img" src="${img("1516321318423-f06f85e504b3")}" alt="İçerik denetimi" loading="lazy"/><figcaption>En iyi sonuç, yapay zekânın hızı ile insanın denetimini birleştirdiğinizde gelir.</figcaption></figure>

<h2>Doğru yaklaşım: eş pilot, oto pilot değil</h2>
<p>Üretken yapay zekayı bir "eş pilot" gibi düşünün: hızlandırır, seçenek sunar, tıkanıklığı açar. Ama son kararı ve kalite kontrolünü insan verir. Bu denge, hem hızı hem de güvenilirliği korur.</p>
`,
  },
  {
    slug: "rag-nedir",
    title: "RAG (Retrieval-Augmented Generation) Nedir, Neden Önemli?",
    category: "Teknoloji",
    date: "2026-05-18",
    readMinutes: 7,
    excerpt:
      "Yapay zekanın kendi şirketinizin bilgisiyle konuşmasını ister misiniz? RAG, dil modellerini sizin belgelerinize bağlayarak doğru, güncel ve kaynağı belli cevaplar üretmenin yolu.",
    coverImage: img("1451187580459-43490279c0fa"),
    tags: ["RAG", "LLM", "Bilgi Yönetimi", "Chatbot"],
    content: `
<p>Büyük dil modelleri güçlüdür ama iki zayıf noktası vardır: eğitim verileri belli bir tarihte kesilir ve sizin şirketinize özel bilgileri bilmezler. <strong>RAG (Retrieval-Augmented Generation)</strong> tam da bu sorunu çözer.</p>

<h2>RAG nasıl çalışır?</h2>
<p>Basitçe: kullanıcı soru sorduğunda sistem önce sizin belge havuzunuzdan (kılavuzlar, ürün dökümanları, SSS) en ilgili parçaları <em>bulur</em>, sonra bu parçaları dil modeline vererek cevabı <em>o kaynaklara dayanarak</em> üretmesini sağlar.</p>

<figure><img class="blog-img" src="${img("1526378722484-bd91ca387e72")}" alt="Bilgi tabanı ve veri" loading="lazy"/><figcaption>RAG, modeli kendi belgelerinize bağlayarak "kaynağı belli" cevaplar üretir.</figcaption></figure>

<h2>Neden önemli?</h2>
<ul>
  <li><strong>Doğruluk:</strong> Cevaplar gerçek belgelerinize dayandığı için uydurma riski düşer.</li>
  <li><strong>Güncellik:</strong> Belgeyi güncellersiniz, model anında yeni bilgiyle konuşur — yeniden eğitim gerekmez.</li>
  <li><strong>Şeffaflık:</strong> "Bu cevabı hangi belgeden aldı?" sorusuna kaynak göstererek yanıt verebilirsiniz.</li>
</ul>

<figure><img class="blog-img" src="${img("1633356122544-f134324a6cee")}" alt="Kurumsal chatbot" loading="lazy"/><figcaption>Şirket içi destek botları için RAG neredeyse standart hâline geldi.</figcaption></figure>

<h2>Nerelerde kullanılır?</h2>
<p>Şirket içi destek botları, müşteri hizmetleri asistanları, teknik dokümantasyon arama ve yasal/uyum sorgulamaları RAG'in en güçlü olduğu alanlardır. Kendi bilginizle konuşan bir asistan, hem çalışanların hem de müşterilerin işini büyük ölçüde hızlandırır.</p>
`,
  },
  {
    slug: "whatsapp-chatbot-musteri-deneyimi",
    title: "WhatsApp Chatbot'ları ile Müşteri Deneyimini Dönüştürmek",
    category: "Müşteri Deneyimi",
    date: "2026-05-05",
    readMinutes: 5,
    excerpt:
      "Müşterileriniz zaten WhatsApp'ta. Doğru kurgulanmış bir WhatsApp chatbot'u, 7/24 anında yanıt vererek hem memnuniyeti artırıyor hem de destek ekibinin yükünü azaltıyor.",
    coverImage: img("1611606063065-ee7946f0787a"),
    tags: ["WhatsApp", "Chatbot", "Müşteri Deneyimi", "Otomasyon"],
    content: `
<p>Türkiye'de neredeyse herkesin telefonunda WhatsApp var. Bu yüzden müşteriye ulaşmanın en doğal yolu, onları yeni bir uygulamaya zorlamak yerine zaten kullandıkları kanaldan konuşmaktır.</p>

<h2>WhatsApp chatbot ne yapar?</h2>
<ul>
  <li>Sık sorulan sorulara anında yanıt verir (fiyat, kargo, çalışma saatleri).</li>
  <li>Sipariş durumu, randevu ve rezervasyon gibi işlemleri yürütür.</li>
  <li>Karmaşık talepleri doğru temsilciye yönlendirir.</li>
</ul>

<figure><img class="blog-img" src="${img("1556656793-08538906a9f8")}" alt="Mobil mesajlaşma" loading="lazy"/><figcaption>Anında yanıt, müşteri memnuniyetini doğrudan etkileyen en önemli faktörlerden biri.</figcaption></figure>

<h2>İşletmeye kazandırdıkları</h2>
<p>7/24 yanıt verebilen bir asistan, mesai dışında gelen talepleri kaçırmanızı önler. Destek ekibi ise tekrarlı sorulardan kurtulup gerçekten insan dokunuşu gereken konulara odaklanabilir. Sonuç: daha hızlı yanıt, daha yüksek memnuniyet, daha düşük maliyet.</p>

<figure><img class="blog-img" src="${img("1522071820081-009f0129c71c")}" alt="Destek ekibi" loading="lazy"/><figcaption>Chatbot ekibi değil, ekibin tekrarlı yükünü ortadan kaldırır.</figcaption></figure>

<h2>Başarının anahtarı: doğru devir</h2>
<p>İyi bir chatbot her şeyi kendi çözmeye çalışmaz; sınırını bilir. "Bunu bir uzmanımıza aktarıyorum" diyebilen bir sistem, müşteriyi asla çıkmaza sokmaz. İnsan ve yapay zekânın el ele çalıştığı bu kurgu, en yüksek memnuniyeti sağlar.</p>
`,
  },
  {
    slug: "yapay-zeka-eticaret-kisisellestirme",
    title: "Yapay Zeka Destekli E-ticaret: Kişiselleştirme ve Sanal Deneme",
    category: "E-ticaret",
    date: "2026-04-22",
    readMinutes: 6,
    excerpt:
      "Her müşteriye aynı vitrini göstermenin devri kapandı. Yapay zeka; ürün önerisinden sanal deneme deneyimine kadar e-ticarette dönüşüm oranlarını ve müşteri memnuniyetini yükseltiyor.",
    coverImage: img("1556742049-0cfed4f6a45d"),
    tags: ["E-ticaret", "Kişiselleştirme", "Sanal Deneme", "Dönüşüm"],
    content: `
<p>Modern e-ticaretin kalbinde tek bir soru var: "Doğru ürünü, doğru müşteriye, doğru anda nasıl gösteririm?" Yapay zeka, bu sorunun cevabını veriye dayalı olarak üretiyor.</p>

<h2>Kişiselleştirilmiş öneriler</h2>
<p>Yapay zeka, müşterinin gezinme ve satın alma davranışını analiz ederek ona en uygun ürünleri öne çıkarır. Bu, hem sepet ortalamasını yükseltir hem de müşterinin aradığını daha hızlı bulmasını sağlar.</p>

<figure><img class="blog-img" src="${img("1441986300917-64674bd600d8")}" alt="Online alışveriş" loading="lazy"/><figcaption>Kişiselleştirme, dönüşüm oranlarını doğrudan etkileyen en güçlü kaldıraçlardan biri.</figcaption></figure>

<h2>Sanal deneme (virtual try-on)</h2>
<p>Özellikle moda ve aksesuar sektöründe, yapay zeka ile "sanal deneme" deneyimi oyunun kurallarını değiştirdi. Müşteri, ürünün kendisinde nasıl duracağını satın almadan görebiliyor. Bu, iade oranlarını düşürürken güveni artırıyor.</p>

<figure><img class="blog-img" src="${img("1483985988355-763728e1935b")}" alt="Moda ve sanal deneme" loading="lazy"/><figcaption>Sanal deneme, "acaba yakışır mı?" tereddüdünü ortadan kaldırır.</figcaption></figure>

<h2>Sonuç</h2>
<p>Yapay zeka destekli e-ticaret; daha yüksek dönüşüm, daha düşük iade ve daha memnun müşteri demektir. Bu teknolojiler artık sadece büyük markaların değil, doğru altyapıyla her ölçekten işletmenin erişebileceği araçlar.</p>
`,
  },
  {
    slug: "sesli-yapay-zeka-asistanlari",
    title: "Sesli Yapay Zeka Asistanları: Konuşan Arayüzlerin Yükselişi",
    category: "Sesli AI",
    date: "2026-04-08",
    readMinutes: 5,
    excerpt:
      "Yazmak yerine konuşmak. Sesli yapay zeka asistanları; çağrı merkezlerinden web sitelerine kadar hızla yayılıyor ve erişilebilirliği tamamen yeni bir seviyeye taşıyor.",
    coverImage: img("1590602847861-f357a9332bbc"),
    tags: ["Sesli AI", "Konuşma Tanıma", "Erişilebilirlik"],
    content: `
<p>Klavye her zaman en pratik arayüz değildir. Araç kullanırken, elleri doluyken ya da hızlıca bilgi almak isterken sesle etkileşim çok daha doğaldır. Sesli yapay zeka asistanları tam da bu ihtiyaca cevap veriyor.</p>

<h2>Neler mümkün?</h2>
<ul>
  <li>Konuşmayı gerçek zamanlı metne çevirme ve anlama</li>
  <li>Web sitesine gömülü sesli asistanla müşteriyi karşılama</li>
  <li>Çağrı merkezlerinde ilk temas ve yönlendirme</li>
  <li>Görme engelli kullanıcılar için erişilebilirlik</li>
</ul>

<figure><img class="blog-img" src="${img("1478737270239-2f02b77fc678")}" alt="Ses dalgaları" loading="lazy"/><figcaption>Ses tanıma teknolojisi, Türkçe dahil birçok dilde artık çok yüksek doğrulukta çalışıyor.</figcaption></figure>

<h2>İşletmeler için değeri</h2>
<p>Sesli asistanlar; çağrıların önemli bir bölümünü insana ulaşmadan çözerek bekleme sürelerini kısaltır ve maliyeti düşürür. Aynı zamanda markanıza modern ve erişilebilir bir yüz kazandırır.</p>

<figure><img class="blog-img" src="${img("1573164713988-8665fc963095")}" alt="Çağrı merkezi" loading="lazy"/><figcaption>Doğru kurgulanan sesli asistan, çağrı merkezini rahatlatır.</figcaption></figure>

<p>Third Hand'in geliştirdiği SesYaz gibi çözümler, web sitelerine kolayca gömülebilen sesli asistanlarla bu deneyimi işletmenize taşıyor.</p>
`,
  },
  {
    slug: "yapay-zeka-veri-guvenligi-kvkk",
    title: "Yapay Zekada Veri Güvenliği ve KVKK Uyumu",
    category: "Güvenlik",
    date: "2026-03-25",
    readMinutes: 7,
    excerpt:
      "Yapay zeka projelerinin en çok göz ardı edilen ama en kritik boyutu: veri güvenliği. Müşteri verisiyle çalışan her sistemde KVKK uyumu bir tercih değil, zorunluluktur.",
    coverImage: img("1563986768494-4dee2763ff3f"),
    tags: ["Veri Güvenliği", "KVKK", "Gizlilik", "Uyum"],
    content: `
<p>Yapay zeka ne kadar güçlü olursa olsun, güvenli olmadıkça bir risk kaynağıdır. Özellikle müşteri verisiyle çalışan sistemlerde güvenlik ve yasal uyum, projenin ilk gününden itibaren tasarıma dahil edilmelidir.</p>

<h2>Temel güvenlik ilkeleri</h2>
<ul>
  <li><strong>Veri minimizasyonu:</strong> Yalnızca gerçekten gerekli olan veriyi toplayın.</li>
  <li><strong>Şifreleme:</strong> Veriyi hem iletimde hem depolamada şifreleyin.</li>
  <li><strong>Erişim kontrolü:</strong> Her veriye herkes erişememeli; yetkiler net tanımlanmalı.</li>
  <li><strong>İz kaydı:</strong> Kim, neye, ne zaman eriştiği kayıt altında olmalı.</li>
</ul>

<figure><img class="blog-img" src="${img("1550751827-4bd374c3f58b")}" alt="Siber güvenlik" loading="lazy"/><figcaption>Şifreleme ve erişim kontrolü, güvenli bir yapay zeka sisteminin temelidir.</figcaption></figure>

<h2>KVKK ve yapay zeka</h2>
<p>Türkiye'de kişisel verilerin işlenmesi KVKK ile düzenlenir. Yapay zeka sistemleriniz kişisel veri işliyorsa; açık rıza, aydınlatma yükümlülüğü ve verinin saklama süresi gibi konularda uyumlu olmalısınız. Verinin nerede saklandığı (yurt içi/yurt dışı) da önemli bir konudur.</p>

<figure><img class="blog-img" src="${img("1526628953301-3e589a6a8b74")}" alt="Veri gizliliği" loading="lazy"/><figcaption>Güven, en değerli varlıktır; bir kez zedelendiğinde kazanmak çok zordur.</figcaption></figure>

<h2>Güven, rekabet avantajıdır</h2>
<p>Veri güvenliğini ciddiye almak yalnızca ceza riskinden korunmak değildir; müşterinizin gözünde güvenilir bir marka olmanın da yoludur. Güvenliği baştan tasarlayan işletmeler, uzun vadede kazanır.</p>
`,
  },
  {
    slug: "meta-google-reklam-optimizasyonu-ai",
    title: "Meta ve Google Reklamlarını Yapay Zeka ile Optimize Etmek",
    category: "Dijital Pazarlama",
    date: "2026-03-10",
    readMinutes: 6,
    excerpt:
      "Reklam bütçenizi boşa harcamayın. Yapay zeka; hedef kitle seçiminden reklam metnine, teklif stratejisinden performans analizine kadar reklamlarınızın getirisini artırıyor.",
    coverImage: img("1533750516457-a7f992034fec"),
    tags: ["Meta Ads", "Google Ads", "Performans Pazarlama", "ROAS"],
    content: `
<p>Dijital reklamcılıkta başarı, "ne kadar harcadığınıza" değil "harcadığınızın karşılığında ne aldığınıza" bağlıdır. Yapay zeka, bu denklemi işletmelerin lehine çeviriyor.</p>

<h2>Yapay zeka reklamda nerede devreye giriyor?</h2>
<ul>
  <li><strong>Hedefleme:</strong> Dönüşme olasılığı yüksek kitleleri veriye dayalı belirleme.</li>
  <li><strong>Kreatif:</strong> Onlarca reklam metni ve görsel varyasyonu üretip test etme.</li>
  <li><strong>Teklif yönetimi:</strong> Bütçeyi en verimli saatlere ve kanallara otomatik kaydırma.</li>
  <li><strong>Analiz:</strong> Hangi reklamın gerçekten satış getirdiğini net görme.</li>
</ul>

<figure><img class="blog-img" src="${img("1460925895917-afdab827c52f")}" alt="Reklam performans paneli" loading="lazy"/><figcaption>Doğru ölçümleme olmadan optimizasyon yapılamaz; her şey veriyle başlar.</figcaption></figure>

<h2>A/B testinin ötesi</h2>
<p>Geleneksel A/B testi iki seçeneği karşılaştırır. Yapay zeka ise onlarca varyasyonu aynı anda deneyip bütçeyi otomatik olarak kazanan versiyona kaydırır. Bu, hem zaman kazandırır hem de reklam getirisini (ROAS) belirgin şekilde yükseltir.</p>

<figure><img class="blog-img" src="${img("1611926653458-09294b3142bf")}" alt="Dijital pazarlama stratejisi" loading="lazy"/><figcaption>Yapay zeka, insan stratejistin yerini almaz; onu güçlendirir.</figcaption></figure>

<h2>Sonuç</h2>
<p>Reklam platformlarının kendi yapay zekası güçlüdür, ancak doğru strateji ve doğru kurulumla birleştiğinde asıl farkı yaratır. Doğru kurgulanmış bir kampanya, aynı bütçeyle çok daha fazla sonuç üretir.</p>
`,
  },
  {
    slug: "yapay-zeka-yatirim-getirisi-roi",
    title: "Yapay Zeka Yatırımının Geri Dönüşü (ROI): Nasıl Ölçülür?",
    category: "Strateji",
    date: "2026-02-20",
    readMinutes: 6,
    excerpt:
      "Yapay zekaya yatırım yapmak modaya uymak değil, iş sonucu üretmek olmalı. Peki bir AI projesinin gerçekten değer üretip üretmediğini hangi metriklerle ölçersiniz?",
    coverImage: img("1454165804606-c3d57bc86b40"),
    tags: ["ROI", "Strateji", "Yatırım", "Performans"],
    content: `
<p>Yapay zeka heyecan verici bir alan, ama bir işletme için tek soru şudur: "Bu yatırım bana ne kazandırıyor?" Bu soruya net cevap veremeyen projeler, ne kadar teknik olarak etkileyici olursa olsun sürdürülemez.</p>

<h2>Doğru metriği seçin</h2>
<p>Her projenin başarısı farklı ölçülür. Önce projenin amacını netleştirin, sonra ona uygun metriği belirleyin:</p>
<ul>
  <li><strong>Zaman tasarrufu:</strong> Bir görev kaç saatten kaç dakikaya indi?</li>
  <li><strong>Maliyet:</strong> Operasyonel gider ne kadar azaldı?</li>
  <li><strong>Gelir:</strong> Dönüşüm oranı veya sepet ortalaması yükseldi mi?</li>
  <li><strong>Memnuniyet:</strong> Yanıt süresi ve müşteri memnuniyeti nasıl değişti?</li>
</ul>

<figure><img class="blog-img" src="${img("1551288049-bebda4e38f71")}" alt="Veri analizi panosu" loading="lazy"/><figcaption>Ölçmediğiniz şeyi iyileştiremezsiniz; her AI projesi bir temel ölçümle başlamalı.</figcaption></figure>

<h2>Önce mevcut durumu ölçün</h2>
<p>ROI hesaplamanın en sık atlanan adımı, projeden <em>önceki</em> durumu ölçmektir. "Eskiden bu iş ne kadar sürüyordu, ne kadara mal oluyordu?" sorusunun cevabı olmadan, sonrasındaki iyileşmeyi kanıtlayamazsınız.</p>

<figure><img class="blog-img" src="${img("1543286386-713bdd548da4")}" alt="İş stratejisi toplantısı" loading="lazy"/><figcaption>Küçük ölçekli bir pilot, büyük yatırım kararı öncesi en akıllıca adımdır.</figcaption></figure>

<h2>Küçük pilotla başlayın</h2>
<p>Büyük bir bütçeyi tek seferde bağlamak yerine, ölçülebilir küçük bir pilotla başlayın. Sonucu somut rakamlarla görün, işe yaradığını kanıtlayın ve ardından güvenle ölçekleyin. Third Hand olarak yaklaşımımız tam olarak budur: fikirden ölçülebilir sonuca.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatBlogDate(iso: string): string {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}
