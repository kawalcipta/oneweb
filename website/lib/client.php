<?php 

class WebsiteClient {

    function invoke($url) {
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $url); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        $headers = [
            'API_KEY: b88406e4-9ac2-4495-ba15-2fcefadb8364',
        ];
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $output = curl_exec($ch); 
        curl_close($ch);

        return $output;
    }

}

// contoh penggunaan

// alamat api
$url = "http://oneweb.web.id:8080/OneWebApi/BeritaApi";

// buat object dari class WebsiteClient
$ws = new WebsiteClient();

// ambil data dari api ke dalam variable $berita
$berita = $ws->invoke($url."/list");

// convert $berita ke json
$jsonBerita = json_decode($berita, TRUE);
