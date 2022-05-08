# ikinci-el [livedemo](https://ikinci-el.netlify.app)

|Bağımlılıklar|Dosya Yapısı|
|------|-------|
|chakra ui| [components](#components)|
| mantine| [constants](#constants)|
|axios|[context](#context)|
| formik| [hooks](#hooks)|
| yup| [images](#images)|
| reac-router-dom| [pages](#pages)|
| react-dropzone|[scss](#scss)
| sass|[services](#services)
| |[appjs](#appjsx)
| |[indexjs](#indexjsx)|
| |[chakraCustomtheme](#chakraCustomTheme)

---
# Proje Özeti
Proje, toplamda 5 ekrandan oluşmaktadır. 2 tanesi için sadece giriş yapmış kullanıcının erişimi olması gerekmekte. Bu nedenle, sayfaların
yönlendirilmesi için **reac-router-dom** kullanıldı. Ekran tasarımları için; **scss**, **chakra ui** ve **mantine** kullanıldı. 
2 ekran için kullanıcı kontrolü RequireAuth.js componenti içerisinde yapılmakta. cookie içerisinde token olması durumunda kullanıcı giriş yapmış sayılmakta.
cookie'nin temizlenmesi için bir kısıtlama bulunmuyor. Kullanıcı, hesabım sayfasından çıkış yapmadığı sürece giriş yapmış sayılır. Giriş yapmamış kullanıcı,
herhangi bir ürüne satın alma veya teklif vermesine izin verilmez, ekranda hata mesajı ile karşılaşır. Üye Girişi ve Kayıt Ol ekranları, kullanıcı giriş yapmış ise
ana sayfaya yönlendirme yapmaktadır. 

# Proje Yapısı ve Çalışma Şekli
 * Projede 2 tane context yapısı bulunmakta. Bir tanesi AuthContext; kullanıcı yetkilendirmesini yönetmek için kullanılır, diğeri ise ProductContext;apiden tüm ürünleri çekip ilgili componentlere sağlar. Projede 2 adres(ürün ekleme ve hesabım) için yetkilendirme yapılması gerekmektedir. Bu nedenle **react-rooter-dom** ile bu iki adresin render edilmeden önce yetkilendirilmesine bakılır. 
 * Kullanıcı, üye olurken veya giriş yaparken serverden gelen token'ı cookie'ye Auth_Token olarak kaydedilir. RequiredAuth componenti içerisinde, cookie'den okunan token varsa kullanıcı ilgili ekrana yönlendirilir (ürün ekle ya da hesabım), eğer yoksa giriş yapma ekranına yönlendirilir.
 * Kullanıcı, hesabım sayfasından çıkış yapmadığı sürece AuthContext içerisinde her sayfaya gelişinde, cookie'de bulunan token ile servere kullanıcı bilgilerinin alınması için istek atılır ve auth state'ine eklenir. Yetkilendirme gereken işlemlerin kontrolü bu state üzerinden yapılır. 
 * Apiye yapılacak isteklerde 2 farklı yapı oluşturuldu. Token gerektiren istekler için, interceptors eklenerek her istek öncesi **axios**'un otomatik tokeni eklemesi sağlandı. 
 * Projenin tasarımları **scss** kullanılarak yapıldı. Bunun yanında, satın alma ve teklif verme modalları; giriş yapma/üye olma ve satın alma/teklif verme(yetkilendirme kontrolü) hata mesajları için toast;hesabım ekranındaki tab componenti için **chakra-ui**;Ürün ekleme ekranında kateogri,renk,marka ve kulllanım durumu seçimleri için **mantine** kullanıldı. Form gerektiren yerlerde **formik** kullanıldı (Giriş yapma, üye girşi ve ürün ekleme), doğrulamaları için **yup** kullanıldı.

## Dosya Yapısı

* ### index.jsx
  * index.js içerisinde; react-router-dom, authProvider, produtProvider, chakraProvider ile route sarmallanarak, tüm adresler için App.js'e yönlendirme yapılır 
    ve sayfalandırma App içerisinde gerçekleşir.
* ### App.jsx
  * app.js içerisinde projenin sayfalandırma yapısı bulunmakta. Üye girişi ve kayıt olma ekranları hariç diğer sayfalar ana path altından erişilir. Ana path öncelikle      [Layout](src/components/Layout.jsx) componentini render eder ve içerisine diğer pathları alır. Üye girişi ve kayıt olma ekranında bir header bulunmamasından           dolayı iki path bu yapının           içerisinde bulunmaz. 
  * **path='/'** ise [Home.jsx](src/pages/Home.jsx) yani ana sayfa render edilir.
  * **path='/detail/:id'** ise ilgili ürünün detay sayfasına gider, [ProductDetail](src/pages/ProductDetail.jsx) render edilir.
  * **path='/add'** ve **path='profile/:username'** ise ilgili sayfalara gitmeden önce [RequireAuth](src/components/RequireAuth.jsx) componenti içerisinde giriş yapılıp yapılmadığı kontrol edilir. Eğer giriş yapmış ise (cookie de token var ise) ilgili sayfalara yönlendirilir ([ProductAdd](src/pages/ProductAdd.jsx), [UserProfile](src/pages/UserProfile.jsx)). Giriş yapmamış ise, [Login](src/pages/Login.jsx) ekranına yönlendirilir.
  * **path='/login'** ve **path='/register'** sayfaları eğer kullanıcı giriş yapmış ise (cookie de token var ise) Home'e yönlendirilir, aksi halde [Login](src/pages/Login.jsx), [Register](src/pages/Register.jsx) render edilir.

* ### components
  * oluşturulan componentler bu klasör içerisinde bulunmakta.
* ### constants
  * projede kullanılan iconlar, [icons](src/constants/icons) dosyası içerisinde yer almakta.
  * [axios.jsx](src/constants/axios.jsx),api istekleri için kullanılacak **axios**'un özelleştirilmiş hali ve gerekli apilere token ile birlikte istek atmasını sağlayacak yapı bulunmakta.
  * [constants.jsx](src/constants/constants.jsx) içerisinde ise proje genelinde kullanılacak sabit değişkenler bulunmakta.

* ### context 
  * [AuthProviderContext](src/context/AuthProviderContext.jsx),proje içerisinde yetkilendirme için oluşturulan context. ilgili componentlere, kullanıcı token ve bilgilerini sağlar.
  * [ProductContext](src/context/ProductContext.jsx), api'den productları çekip ilgili componentlere productları iletir.
 
 * ### hooks
    * [hooks](src/hooks) proje içerisinde bir çok component içinde kullanılan yapıları içermekte. 
    * [useDisplayErrorMess](src/hooks/useDisplayErrorMess.jsx) ve [useDisplaySuccessMess](src/hooks/useDisplaySuccessMes.jsx) ekranda gösterilecek mesajın yapısı bulunmakta.her iki yapıda da **chakra-ui/toast** kullanıldı.
    * cookie'den token bilgisinin alınması için [useGetTokenFromCookie](src/hooks/useGetTokenFromCookie.jsx) yapısı kullanılır.
* ### images
  * [images](src/images) proje içerisinde kullanılan görselleri içermekte.

* ### pages
  * [pages](src/pages), proje içerisindeki path olarak ulaşılabilecek ekranları içerir. 
   ([Home](src/pages/Home.jsx),[Login](src/pages/Login.jsx),[Register](src/pages/Register.jsx),[ProductAdd](src/pages/ProductAdd.jsx),[ProductDetail](src/pages/ProductDetail.jsx),[UserProfile](src/pages/UserProfile.jsx))
* ### scss
  * [scss](src/scss), projenin css kodlarını içerir. scss formatında yazıldı. index.scss içerisine her ekran için ayrı scss dosyası oluşturulup ekran index içerisine import edildi.

* ### services
  * [services](src/services), apiye yapılacak isteklerin yönetildiği dosya. product, user, category, brand,color,offer,usingstatus gibi bilgilerin alınması için yapılacak api istekleri ilgili dosyalar içerisinde yapılır.

* ### chakraCustomTheme
  * [chakraCustomTheme](src/chakraCustomTheme.jsx), projede kullanılan chakra-ui elemanları([BuyModal](src/components/BuyModal.jsx),[OfferModal](src/components/OfferModal.jsx)) için custom tasarım bilgilerini içerir.
