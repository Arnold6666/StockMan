<?php
$url = "http://www.twse.com.tw/exchangeReport/FMTQIK?&date=20171121";
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl,CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($curl);
curl_close($curl);
 
$response = curl_exec($curl);
$err = curl_error($curl);
 
curl_close($curl);

$response = json_decode($response, true);

var_dump($response);